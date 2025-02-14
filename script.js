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
  
  // Footer Animation
  gsap.from('footer', {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
      trigger: 'footer',
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none none'
    }
  });