from flask import Flask, jsonify, render_template, request
import fastf1 as ff1
import pandas as pd
import numpy as np
import plotly
import plotly.express as px
import json

app = Flask(__name__)

# Enable caching for FastF1 (optional but recommended)
ff1.Cache.enable_cache('cache')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/get_years')
def get_years():
    # Fetch available years (example: 2018 to current year)
    current_year = pd.Timestamp.now().year
    years = list(range(2018, current_year + 1))
    return jsonify(years)

@app.route('/get_races/<year>')
def get_races(year):
    # Fetch all races for the given year
    schedule = ff1.get_event_schedule(int(year))
    races = schedule.EventName.tolist()
    return jsonify(races)

@app.route('/get_drivers/<year>/<race>')
def get_drivers(year, race):
    # Fetch all drivers for the given year and race
    session = ff1.get_session(int(year), race, 'R')
    session.load()
    drivers = session.drivers
    driver_names = [session.get_driver(driver)['Abbreviation'] for driver in drivers]
    return jsonify(driver_names)

@app.route('/plot_telemetry', methods=['POST'])
def plot_telemetry():
    # Get form data
    year = request.form['year']
    race = request.form['race']
    driver1 = request.form['driver1']
    driver2 = request.form['driver2']

    # Load session data
    session = ff1.get_session(int(year), race, 'R')
    session.load()

    # Get the fastest lap for each driver
    lap1 = session.laps.pick_driver(driver1).pick_fastest()
    lap2 = session.laps.pick_driver(driver2).pick_fastest()

    # Get sector times for the fastest laps
    sector_times1 = [lap1[f'Sector{i}Time'].total_seconds() for i in range(1, 4)]
    sector_times2 = [lap2[f'Sector{i}Time'].total_seconds() for i in range(1, 4)]

    # Prepare data for the table
    lap_times = [
        {
            'Driver': driver1,
            'Sector 1 (s)': sector_times1[0],
            'Sector 2 (s)': sector_times1[1],
            'Sector 3 (s)': sector_times1[2],
            'Total Lap Time (s)': lap1['LapTime'].total_seconds(),
            'Color': session.get_driver(driver1)['TeamColor']
        },
        {
            'Driver': driver2,
            'Sector 1 (s)': sector_times2[0],
            'Sector 2 (s)': sector_times2[1],
            'Sector 3 (s)': sector_times2[2],
            'Total Lap Time (s)': lap2['LapTime'].total_seconds(),
            'Color': session.get_driver(driver2)['TeamColor']
        }
    ]

    # Fetch driver standings for the race
    results = session.results
    podium = []
    other_drivers = []
    for _, row in results.iterrows():
        driver_data = {
            'Position': row['Position'],
            'Driver': row['Abbreviation'],
            'Team': row['TeamName'],
            'Points': row['Points'],
            'Color': session.get_driver(row['Abbreviation'])['TeamColor']
        }
        if row['Position'] in [1, 2, 3]:
            podium.append(driver_data)
        else:
            other_drivers.append(driver_data)

    return render_template('plot.html', lap_times=lap_times, podium=podium, other_drivers=other_drivers)
if __name__ == '__main__':
    app.run(debug=True)
    