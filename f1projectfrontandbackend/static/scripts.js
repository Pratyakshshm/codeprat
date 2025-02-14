// Fetch and populate years
$(document).ready(function() {
    $.get('/get_years', function(data) {
        data.forEach(year => {
            $('#year').append(`<option value="${year}">${year}</option>`);
        });
    });
});

// Fetch and populate races when year is selected
$('#year').change(function() {
    const year = $(this).val();
    $('#race').html('<option value="">Select Race</option>');
    $('#driver1').html('<option value="">Select Driver 1</option>');
    $('#driver2').html('<option value="">Select Driver 2</option>');

    if (year) {
        $.get(`/get_races/${year}`, function(data) {
            data.forEach(race => {
                $('#race').append(`<option value="${race}">${race}</option>`);
            });
        });
    }
});

// Fetch and populate drivers when race is selected
$('#race').change(function() {
    const year = $('#year').val();
    const race = $(this).val();
    $('#driver1').html('<option value="">Select Driver 1</option>');
    $('#driver2').html('<option value="">Select Driver 2</option>');

    if (year && race) {
        $.get(`/get_drivers/${year}/${race}`, function(data) {
            data.forEach(driver => {
                $('#driver1').append(`<option value="${driver}">${driver}</option>`);
                $('#driver2').append(`<option value="${driver}">${driver}</option>`);
            });
        });
    }
});