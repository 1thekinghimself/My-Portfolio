document.addEventListener('DOMContentLoaded', function() {
  // ========== General Setup ==========
  // Set current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // ========== Mobile Navigation ==========
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // ========== Smooth Scrolling ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });

  // ========== Navbar Scroll Effect ==========
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ========== Animate Skill Bars ==========
  const skillBars = document.querySelectorAll('.skill-level');
  const skillsSection = document.getElementById('skills');

  function animateSkillBars() {
    skillBars.forEach(bar => {
      const width = bar.style.width;
      bar.style.width = '0';
      setTimeout(() => {
        bar.style.width = width;
      }, 100);
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillBars();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  if (skillsSection) {
    observer.observe(skillsSection);
  }

  // ========== Contact Form with Formspree ==========
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const formStatus = document.getElementById('formStatus');
    
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      
      // Show loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      formStatus.textContent = '';
      formStatus.className = 'form-status';

      try {
        const formData = new FormData(contactForm);
        
        // Send to Formspree
        const response = await fetch('https://formspree.io/f/xanbyegb', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          // Success message
          formStatus.textContent = 'Message sent successfully! I will get back to you soon.';
          formStatus.className = 'form-status success';
          contactForm.reset();
          
          // Redirect after 3 seconds (if _next is specified)
          const nextPage = contactForm.querySelector('input[name="_next"]')?.value;
          if (nextPage) {
            setTimeout(() => {
              window.location.href = nextPage;
            }, 3000);
          }
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        // Error message
        formStatus.textContent = 'Failed to send message. Please try again later or email me directly at 1stmking@gmail.com';
        formStatus.className = 'form-status error';
        console.error('Form submission error:', error);
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message';
      }
    });
  }

  // ========== Back to Top Button ==========
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ========== Project Image Modal ==========
  document.querySelectorAll('.project-links a[href$=".png"], .project-links a[href$=".jpg"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const imgSrc = this.getAttribute('href');
      const modal = document.createElement('div');
      modal.className = 'modal';
      modal.innerHTML = `
        <div class="modal-content">
          <span class="close-modal">&times;</span>
          <img src="${imgSrc}" alt="Project Design">
        </div>
      `;
      document.body.appendChild(modal);
      
      modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
      });
      
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.remove();
        }
      });
    });
  });

  // Initialize animations (if using AOS)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
  }
});