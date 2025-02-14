// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  // GSAP Animations
  gsap.registerPlugin(ScrollTrigger);
  
  // Hero Section Animation
  gsap.from('.hero-content h1', {
    opacity: 0,
    y: -50,
    duration: 1,
    delay: 0.5,
    ease: 'power2.out'
  });
  
  gsap.from('.hero-content p', {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 1,
    ease: 'power2.out'
  });
  
  gsap.from('.hero-content .btn', {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 1.5,
    ease: 'power2.out'
  });
  
  // Features Section Animation
  gsap.from('.feature-item', {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.3,
    scrollTrigger: {
      trigger: '.features',
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none none'
    }
  });
  //Footer
  gsap.from("footer", {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "footer",
      start: "top bottom", // Start animation when footer enters the viewport
      end: "top 80%", 
      toggleActions: "play none none none",
      once: true 
    }
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    const searchToggle = document.getElementById("search-toggle");
    const searchDropdown = document.getElementById("search-dropdown");
  
    searchToggle.addEventListener("click", function (event) {
      event.preventDefault(); 
      searchDropdown.style.display = (searchDropdown.style.display === "block") ? "none" : "block";
    });
  

    document.addEventListener("click", function (event) {
      if (!searchDropdown.contains(event.target) && event.target !== searchToggle) {
        searchDropdown.style.display = "none";
      }
    });
  
    // Handle search button click (Optional)
    document.getElementById("search-button").addEventListener("click", function () {
      let query = document.getElementById("search-input").value;
      if (query.trim() !== "") {
        alert("Searching for: " + query); // You can replace this with actual search logic
      }
    });
  });
  document.addEventListener("DOMContentLoaded", function () {
    const appleLogo = document.getElementById("apple-logo");
  
    appleLogo.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default link behavior
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll smoothly to the top
    });
  });
  document.addEventListener("DOMContentLoaded", function () {
    const dropdowns = document.querySelectorAll(".dropdown");
  
    dropdowns.forEach((dropdown) => {
      const link = dropdown.querySelector("a");
      const menu = dropdown.querySelector(".dropdown-menu");
  
      link.addEventListener("click", function (event) {
        event.preventDefault();
  
        // Close any other open dropdowns
        dropdowns.forEach((d) => {
          if (d !== dropdown) {
            d.classList.remove("active");
          }
        });
  
        // Toggle dropdown visibility smoothly
        dropdown.classList.toggle("active");
      });
  
      // Close dropdown when clicking outside
      document.addEventListener("click", function (e) {
        if (!dropdown.contains(e.target)) {
          dropdown.classList.remove("active");
        }
      });
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".feature-item").forEach(feature => {
        const productImage = feature.querySelector(".product-image"); // Select only the image inside this product
        const colorOptions = feature.querySelectorAll(".color-circle");

        if (productImage && colorOptions.length) {
            colorOptions.forEach(option => {
                option.addEventListener("click", function () {
                    const newImage = this.getAttribute("data-image");

                    // Smooth transition
                    productImage.style.opacity = 0;
                    setTimeout(() => {
                        productImage.src = newImage;
                        productImage.style.opacity = 1;
                    }, 300);

                    // Remove active class from all circles inside this product
                    colorOptions.forEach(opt => opt.classList.remove("active"));
                    this.classList.add("active");
                });
            });
        }
    });
});

// Select all color buttons
// const colorCircles = document.querySelectorAll('.color-circle');
// const iphoneImage = document.getElementById('iphone-image');

// colorCircles.forEach(circle => {
//     circle.addEventListener('click', function () {
//         // Change iPhone image
//         const newImage = this.getAttribute('data-image');
//         iphoneImage.style.opacity = "0"; // Fade out effect
//         setTimeout(() => {
//             iphoneImage.src = newImage;
//             iphoneImage.style.opacity = "1"; // Fade in effect
//         }, 300);

//         // Remove active class from all circles
//         colorCircles.forEach(c => c.classList.remove('active'));
//         this.classList.add('active');
//     });
// });
document.addEventListener("DOMContentLoaded", function () {
    // Loop through each product card
    document.querySelectorAll(".feature-item").forEach(product => {
        const productImage = product.querySelector("img"); // Selects the image inside this product
        const colorCircles = product.querySelectorAll(".color-circle"); // Selects all color options

        if (productImage && colorCircles.length) {
            colorCircles.forEach(circle => {
                circle.addEventListener("click", function () {
                    // Get the new image URL
                    const newImage = this.getAttribute("data-image");

                    // Check if the new image is different from the current one
                    if (productImage.src !== newImage) {
                        productImage.style.transition = "opacity 0.5s ease-in-out"; // Smooth fade transition
                        productImage.style.opacity = "0"; // Fade out

                        setTimeout(() => {
                            productImage.src = newImage;
                            productImage.style.opacity = "1"; // Fade in effect
                        }, 300);
                    }

                    // Remove 'active' class from other circles in THIS product only
                    colorCircles.forEach(c => c.classList.remove("active"));
                    this.classList.add("active");
                });
            });
        }
    });
});
