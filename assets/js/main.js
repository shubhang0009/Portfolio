/*==================== MENU SHOW & HIDDEN ====================*/
const navMenu = document.querySelector('.nav-menu');
const navToggle = document.querySelector('.nav-toggle');
const navClose = document.querySelector('.nav-close');

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLinks = document.querySelectorAll('.nav-link');

function linkAction() {
    navMenu.classList.remove('show-menu');
}
navLinks.forEach(n => n.addEventListener('click', linkAction));


/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
    const header = document.querySelector('.header');
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 80) header.classList.add('scroll-header');
    else header.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/*==================== SCROLL SECTIONS ACTIVE LINK (Error Fixes Included) ====================*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        // Find the corresponding navigation link for the current section
        const navLink = document.querySelector('.nav-menu a[href*=' + sectionId + ']');

        // Only proceed if a navigation link exists for this sectionId
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active-link');
            } else {
                navLink.classList.remove('active-link');
            }
        }
    });
}
window.addEventListener('scroll', scrollActive);


/*==================== GSAP ANIMATIONS (New & Refined) ====================*/
gsap.registerPlugin(ScrollTrigger);

// Gradient text animation for about section
gsap.utils.toArray(".text-gradient").forEach((span) => {
    gsap.to(span, {
        backgroundSize: '100% 100%',
        ease: "power2.out", // Faster ease
        scrollTrigger: {
            trigger: span,
            start: 'top 85%', // Start earlier
            end: 'top center',
            scrub: 0.5, // Smoother scrubbing
        },
    });
});

// Home section animation
gsap.from(".home-data", {
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: "power3.out",
    delay: 0.2
});
gsap.from(".home-img-wrapper", {
    opacity: 0,
    scale: 0.9,
    duration: 0.8,
    ease: "power3.out",
    delay: 0.4
});
gsap.from(".home-social-link", {
    opacity: 0,
    x: -20,
    duration: 0.6,
    ease: "power2.out",
    stagger: 0.1,
    delay: 0.6
});


// About section animations
gsap.from(".about-current-year", {
    opacity: 0,
    y: 50,
    duration: 0.7,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".about-current-year",
        start: "top 80%",
        toggleActions: "play none none reverse"
    }
});
gsap.from(".about-description", {
    opacity: 0,
    y: 50,
    duration: 0.7,
    ease: "power2.out",
    delay: 0.1,
    scrollTrigger: {
        trigger: ".about-description",
        start: "top 80%",
        toggleActions: "play none none reverse"
    }
});
gsap.from(".about-data .about-item", {
    opacity: 0,
    y: 30,
    duration: 0.6,
    ease: "power2.out",
    stagger: 0.1,
    delay: 0.2,
    scrollTrigger: {
        trigger: ".about-data",
        start: "top 80%",
        toggleActions: "play none none reverse"
    }
});

// Services section animations
gsap.utils.toArray(".services-card").forEach((card, i) => {
    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.7,
        ease: "power2.out",
        delay: i * 0.1,
        scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
});

// Skills section animations
gsap.utils.toArray(".skills-group").forEach((group, i) => {
    gsap.from(group, {
        opacity: 0,
        y: 50,
        duration: 0.7,
        ease: "power2.out",
        delay: i * 0.1,
        scrollTrigger: {
            trigger: group,
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
});
gsap.utils.toArray(".skills-data").forEach((item, i) => {
    gsap.from(item, {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        ease: "back.out(1.7)",
        delay: i * 0.05,
        scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
        }
    });
});

// My Learning Path animations (refined)
gsap.utils.toArray(".learning-item").forEach((item, i) => {
    gsap.from(item, {
        opacity: 0,
        x: -50, // Changed from y to x for a horizontal slide-in
        duration: 0.6, // Slightly faster duration
        ease: "power2.out",
        delay: i * 0.08, // Slightly faster sequential delay
        scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
        }
    });
});

// Contact section animations
gsap.from(".contact-data", {
    opacity: 0,
    x: -50,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".contact-data",
        start: "top 80%",
        toggleActions: "play none none reverse"
    }
});
gsap.from(".contact-form", {
    opacity: 0,
    x: 50,
    duration: 0.8,
    ease: "power2.out",
    delay: 0.2,
    scrollTrigger: {
        trigger: ".contact-form",
        start: "top 80%",
        toggleActions: "play none none reverse"
    }
});


/*==================== PORTFOLIO FILTER (Refined) ====================*/
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Set active button
        document.querySelector('.filter-btn.active')?.classList.remove('active');
        btn.classList.add('active');

        const selected = btn.dataset.filter;

        // Animate out current items
        gsap.to(portfolioItems, {
            autoAlpha: 0,
            y: -20,
            scale: 0.9,
            duration: 0.3,
            ease: "power2.in",
            stagger: 0.05,
            onComplete: () => {
                // Hide all items initially
                portfolioItems.forEach(item => item.style.display = 'none');

                // Filter and animate in new items
                const visibleItems = [];
                portfolioItems.forEach(item => {
                    const isMatch = selected === 'all' || item.classList.contains(selected);
                    if (isMatch) {
                        item.style.display = 'flex'; // Show the item before animating
                        visibleItems.push(item);
                    }
                });

                gsap.fromTo(visibleItems, {
                    autoAlpha: 0,
                    y: 20,
                    scale: 0.9,
                }, {
                    autoAlpha: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.5,
                    ease: "power2.out",
                    stagger: 0.07, // Stagger effect for items appearing
                    onComplete: () => {
                        // Refresh ScrollTrigger instances after filter to ensure new items are detected for animation
                        ScrollTrigger.refresh();
                    }
                });
            }
        });
    });
});

/*==================== 'MY WORKS' BUTTON SCROLL TO PORTFOLIO ====================*/
const myWorksButton = document.querySelector('.scroll-to-portfolio');

if (myWorksButton) {
    myWorksButton.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: targetSection,
                    offsetY: 80 // Adjust offset if your fixed header is present
                },
                ease: "power2.inOut"
            });
        }
    });
}


/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button');
const lightTheme = 'light-theme'; // Class name for light theme

// Previously selected theme (from localStorage)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// We obtain the current theme that the interface has by validating the light-theme class
const getCurrentTheme = () => document.body.classList.contains(lightTheme) ? 'light' : 'dark';
const getCurrentIcon = () => themeButton.classList.contains('ri-moon-fill') ? 'ri-moon-fill' : 'ri-sun-fill';

// Validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we apply the stored theme
    document.body.classList[selectedTheme === 'light' ? 'add' : 'remove'](lightTheme);
    themeButton.classList[selectedIcon === 'ri-sun-fill' ? 'add' : 'remove']('ri-sun-fill');
    themeButton.classList[selectedIcon === 'ri-moon-fill' ? 'add' : 'remove']('ri-moon-fill');
} else {
    // If no preference is found, default to dark theme
    document.body.classList.remove(lightTheme);
    themeButton.classList.add('ri-moon-fill'); // Default icon for dark mode
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the light theme class
    document.body.classList.toggle(lightTheme);
    // Change the icon
    themeButton.classList.toggle('ri-moon-fill');
    themeButton.classList.toggle('ri-sun-fill');

    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});


/*==================== EMAIL JS ====================*/
const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message');

const sendEmail = (e) => {
    e.preventDefault();

    // Replace with your actual EmailJS service ID, template ID, and Public Key
    const serviceID = 'service_77bak25'; 
    const templateID = 'template_inlwqpi'; 
    const publicKey = 'Iv0CGjcMVlBRBAlmc'; 

    // This check is now robust and will only show an error if you revert the IDs
    if (serviceID === 'YOUR_SERVICE_ID' || templateID === 'YOUR_TEMPLATE_ID' || publicKey === 'YOUR_PUBLIC_KEY') { 
        contactMessage.textContent = 'Please configure your EmailJS credentials in main.js!';
        contactMessage.style.color = 'red';
        return;
    }

    emailjs.sendForm(serviceID, templateID, '#contact-form', publicKey)
        .then(() => {
            contactMessage.textContent = 'Message sent successfully ✅';
            contactMessage.style.color = 'hsl(var(--first-hue), 91%, 64%)'; 
            
            // Clear form fields
            contactForm.reset();

            // Hide message after 5 seconds
            setTimeout(() => {
                contactMessage.textContent = '';
            }, 5000);
        })
        .catch((error) => {
            contactMessage.textContent = 'Message not sent (service error) ❌';
            contactMessage.style.color = 'red';
            console.error('EmailJS error:', error);
            
            // Hide message after 5 seconds
            setTimeout(() => {
                contactMessage.textContent = '';
            }, 5000);
        });
};

contactForm.addEventListener('submit', sendEmail);

/*==================== SCROLL REVEAL ANIMATION (Replaced by GSAP for most sections, kept for initial load on some) ====================*/
// The ScrollReveal library is still included in index.html but its usage is minimized
// in favor of more specific GSAP animations for better control and performance.
// If you wish to use ScrollReveal for additional elements, adjust the selectors below.
const sr = ScrollReveal({
    origin: 'top',
    distance: '20px', // Reduced distance for snappier effect
    duration: 800, // Significantly reduced duration for faster animation
    delay: 100, // Reduced delay
    reset: false // Set to false, as GSAP handles most animations with more specific triggers
});

// Initial reveal for elements not covered by specific GSAP scroll triggers
sr.reveal('.header, .nav, .section-title');
