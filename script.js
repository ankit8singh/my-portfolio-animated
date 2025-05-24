document.addEventListener('DOMContentLoaded', () => {
    // Constants
    const DOM = {
      body: document.body,
      themeToggle: document.querySelector('.theme-toggle'),
      hamburger: document.querySelector('.hamburger'),
      navLinks: document.querySelector('.nav-links'),
      backToTop: document.querySelector('.back-to-top'),
      contactForm: document.querySelector('.contact-form')
    };
  
    // State
    const state = {
      currentTheme: localStorage.getItem('theme') || 'light',
      animations: []
    };
  
    // Initialize
    initTheme();
    initNavigation();
    initSmoothScrolling();
    initStickyNav();
    initGSAPAnimations();
    initBackToTop();
    initTooltip();
    initForm();
  
    // Theme Functions
    function initTheme() {
      DOM.body.setAttribute('data-theme', state.currentTheme);
      
      DOM.themeToggle.addEventListener('click', toggleTheme);
    }
  
    function toggleTheme() {
      state.currentTheme = state.currentTheme === 'light' ? 'dark' : 'light';
      DOM.body.setAttribute('data-theme', state.currentTheme);
      localStorage.setItem('theme', state.currentTheme);
    }
  
    // Navigation Functions
    function initNavigation() {
      DOM.hamburger.addEventListener('click', toggleMobileMenu);
      
      document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
      });
    }
  
    function toggleMobileMenu() {
      DOM.hamburger.classList.toggle('active');
      DOM.navLinks.classList.toggle('active');
    }
  
    function closeMobileMenu() {
      DOM.hamburger.classList.remove('active');
      DOM.navLinks.classList.remove('active');
    }
  
    // Scroll Functions
    function initSmoothScrolling() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', smoothScroll);
      });
    }
  
    function smoothScroll(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    }
  
    function initStickyNav() {
      window.addEventListener('scroll', handleScroll);
    }
  
    function handleScroll() {
      const navbar = document.querySelector('.navbar');
      navbar.classList.toggle('sticky', window.scrollY > 0);
      highlightActiveSection();
    }
  
    function highlightActiveSection() {
      const scrollPosition = window.scrollY + 100;
      
      document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          updateActiveNavLink(sectionId);
        }
      });
    }
  
    function updateActiveNavLink(sectionId) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  
    // Animation Functions
    function initGSAPAnimations() {
      try {
        gsap.registerPlugin(ScrollTrigger);
        
        animateHeroSection();
        animateSectionTitles();
        animateAboutSection();
        animateSkillBars();
        animateProjectCards();
        animateResumeItems();
        animateContactSection();
        animateFormInputs();
      } catch (error) {
        console.error('GSAP initialization error:', error);
      }
    }
  
    function animateHeroSection() {
      // Hero title words
      const heroTitleWords = document.querySelectorAll('.title-word');
      
      heroTitleWords.forEach((word, index) => {
        state.animations.push(
          gsap.from(word, {
            opacity: 0,
            y: 50,
            duration: 1,
            delay: index * 0.2,
            ease: 'power3.out'
          })
        );
      });
  
      // Other hero elements
      const heroElements = [
        { selector: '.hero-subtitle', delay: 0.8 },
        { selector: '.hero-text', delay: 1 },
        { selector: '.hero-buttons', delay: 1.2 }
      ];
  
      heroElements.forEach(el => {
        state.animations.push(
          gsap.from(el.selector, {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: el.delay,
            ease: 'power3.out'
          })
        );
      });
  
      // Hero image
      state.animations.push(
        gsap.from('.image-wrapper', {
          opacity: 0,
          scale: 0.8,
          duration: 1.5,
          delay: 0.5,
          ease: 'elastic.out(1, 0.5)'
        })
      );
    }
  
    function animateSectionTitles() {
      gsap.utils.toArray('.section-title').forEach(title => {
        state.animations.push(
          gsap.from(title, {
            scrollTrigger: {
              trigger: title,
              start: 'top 80%',
              toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
          })
        );
      });
    }
  
    function animateAboutSection() {
      state.animations.push(
        gsap.from('.about-text', {
          scrollTrigger: {
            trigger: '.about',
            start: 'top 70%',
            toggleActions: 'play none none none'
          },
          opacity: 0,
          x: -50,
          duration: 1,
          ease: 'power3.out'
        }),
        
        gsap.from('.tools', {
          scrollTrigger: {
            trigger: '.about',
            start: 'top 70%',
            toggleActions: 'play none none none'
          },
          opacity: 0,
          x: 50,
          duration: 1,
          ease: 'power3.out',
          delay: 0.3
        })
      );
    }
  
    function animateSkillBars() {
      gsap.utils.toArray('.progress').forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        ScrollTrigger.create({
          trigger: bar,
          start: 'top 80%',
          onEnter: () => {
            state.animations.push(
              gsap.to(bar, {
                width: width,
                duration: 1.5,
                ease: 'power3.out'
              })
            );
          }
        });
      });
    }
  
    function animateProjectCards() {
      gsap.utils.toArray('.project-card').forEach((card, i) => {
        state.animations.push(
          gsap.from(card, {
            scrollTrigger: {
              trigger: '.projects',
              start: 'top 80%',
              toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out'
          })
        );
      });
    }
  
    function animateResumeItems() {
      gsap.utils.toArray('.resume-item').forEach((item, i) => {
        state.animations.push(
          gsap.from(item, {
            scrollTrigger: {
              trigger: '.resume',
              start: 'top 80%',
              toggleActions: 'play none none none'
            },
            opacity: 0,
            x: i % 2 === 0 ? -50 : 50,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out'
          })
        );
      });
    }
  
    function animateContactSection() {
      state.animations.push(
        gsap.from('.contact-info', {
          scrollTrigger: {
            trigger: '.contact',
            start: 'top 70%',
            toggleActions: 'play none none none'
          },
          opacity: 0,
          x: -50,
          duration: 1,
          ease: 'power3.out'
        }),
        
        gsap.from('.contact-form', {
          scrollTrigger: {
            trigger: '.contact',
            start: 'top 70%',
            toggleActions: 'play none none none'
          },
          opacity: 0,
          x: 50,
          duration: 1,
          ease: 'power3.out',
          delay: 0.3
        })
      );
    }
  
    function animateFormInputs() {
      gsap.utils.toArray('.form-group input, .form-group textarea').forEach((input, i) => {
        state.animations.push(
          gsap.from(input, {
            scrollTrigger: {
              trigger: input,
              start: 'top 90%',
              toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 20,
            duration: 0.5,
            delay: i * 0.1,
            ease: 'power3.out'
          })
        );
      });
    }
  
    // Back to Top
    function initBackToTop() {
      ScrollTrigger.create({
        trigger: 'footer',
        start: 'top 50%',
        onEnter: () => showBackToTop(),
        onLeaveBack: () => hideBackToTop()
      });
    }
  
    function showBackToTop() {
      gsap.to(DOM.backToTop, {
        opacity: 1,
        duration: 0.5
      });
    }
  
    function hideBackToTop() {
      gsap.to(DOM.backToTop, {
        opacity: 0,
        duration: 0.5
      });
    }
  
    // Tooltip
    function initTooltip() {
      const tooltip = createTooltip();
      DOM.themeToggle.appendChild(tooltip);
      addTooltipEvents(tooltip);
      injectTooltipStyles();
    }
  
    function createTooltip() {
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = 'Toggle Theme';
      tooltip.setAttribute('aria-hidden', 'true');
      return tooltip;
    }
  
    function addTooltipEvents(tooltip) {
      DOM.themeToggle.addEventListener('mouseenter', () => {
        gsap.to(tooltip, {
          opacity: 1,
          y: 0,
          duration: 0.3
        });
      });
      
      DOM.themeToggle.addEventListener('mouseleave', () => {
        gsap.to(tooltip, {
          opacity: 0,
          y: 10,
          duration: 0.3
        });
      });
    }
  
    function injectTooltipStyles() {
      const style = document.createElement('style');
      style.textContent = `
        .tooltip {
          position: absolute;
          bottom: -30px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--card-bg);
          color: var(--text-color);
          padding: 5px 10px;
          border-radius: 5px;
          font-size: 0.8rem;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transform: translate(-50%, 10px);
          box-shadow: var(--shadow);
          z-index: 100;
        }
      `;
      document.head.appendChild(style);
    }
  
    // Form Handling
    function initForm() {
      if (DOM.contactForm) {
        DOM.contactForm.addEventListener('submit', handleFormSubmit);
      }
    }
  
    function handleFormSubmit(e) {
      e.preventDefault();
      
      const formData = getFormData();
      console.log('Form submitted:', formData);
      
      showSuccessMessage();
      resetForm();
    }
  
    function getFormData() {
      return {
        name: DOM.contactForm.querySelector('input[type="text"]').value,
        email: DOM.contactForm.querySelector('input[type="email"]').value,
        subject: DOM.contactForm.querySelector('input[type="text"]:nth-of-type(2)').value,
        message: DOM.contactForm.querySelector('textarea').value
      };
    }
  
    function showSuccessMessage() {
      const successMessage = createSuccessMessage();
      DOM.contactForm.appendChild(successMessage);
      
      animateSuccessMessage(successMessage);
      scheduleMessageRemoval(successMessage);
    }
  
    function createSuccessMessage() {
      const message = document.createElement('div');
      message.className = 'success-message';
      message.textContent = 'Message sent successfully!';
      return message;
    }
  
    function animateSuccessMessage(message) {
      gsap.from(message, {
        opacity: 0,
        y: 20,
        duration: 0.5
      });
    }
  
    function scheduleMessageRemoval(message) {
      setTimeout(() => {
        gsap.to(message, {
          opacity: 0,
          y: -20,
          duration: 0.5,
          onComplete: () => message.remove()
        });
      }, 3000);
    }
  
    function resetForm() {
      DOM.contactForm.reset();
    }
  });

  document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initThemeToggle();
    initSmoothScrolling();
    initContactForm();
    initDownloadTracking();
});

// 1. Theme Toggle
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;

    themeToggle.addEventListener('click', function() {
        const currentTheme = document.body.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// 2. Smooth Scrolling (Fixed)
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just '#'
            if (href === '#') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form elements properly
            const formElements = this.elements;
            const formData = {
                name: formElements[0].value,    // First input (name)
                email: formElements[1].value,   // Second input (email)
                subject: formElements[2].value, // Third input (subject)
                message: formElements[3].value  // Textarea (message)
            };

            // Validate required fields
            if (!formData.email || !formData.message) {
                showFormMessage(this, 'Please fill in all required fields', 'error');
                return;
            }

            // Log form data (replace with actual submission)
            console.log('Form submitted:', formData);
            
            // Show success message
            showFormMessage(this, 'Message sent successfully!', 'success');
            
            // Reset form
            this.reset();
        });
    }
});

// Improved message display function
function showFormMessage(form, message, type) {
    // Remove any existing messages
    const oldMessage = form.querySelector('.form-message');
    if (oldMessage) oldMessage.remove();

    // Create new message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    
    // Insert after the last form-group or before submit button
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
        form.insertBefore(messageDiv, submitButton);
    } else {
        form.appendChild(messageDiv);
    }

    // Auto-remove after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}


// DOWNLOAD RESUME

document.addEventListener('DOMContentLoaded', function() {
  const downloadBtn = document.getElementById('resumeDownloadBtn');
  const downloadMessage = document.querySelector('.resume-download .download-message');

  if (downloadBtn) {
      downloadBtn.addEventListener('click', function(e) {
          // Only prevent default if we need to do something before download
          // e.preventDefault();
          
          // Show loading state
          showDownloadMessage('Preparing your download...');
          
          // For demonstration, we'll add a small delay
          setTimeout(() => {
              // Check if the file exists
              if (this.href && this.href !== '#') {
                  showDownloadMessage('Download started!', 'success');
                  
                  // Optional: Track download in analytics
                  console.log('Resume downloaded:', this.href);
              } else {
                  showDownloadMessage('Resume file not found', 'error');
                  console.error('Resume file missing at:', this.href);
              }
          }, 500);
      });
  }

  function showDownloadMessage(text, type = '') {
      if (!downloadMessage) return;
      
      downloadMessage.textContent = text;
      downloadMessage.className = 'download-message show';
      if (type) {
          downloadMessage.classList.add(type);
      }
      
      // Hide message after 5 seconds
      setTimeout(() => {
          downloadMessage.className = 'download-message';
      }, 5000);
  }
});