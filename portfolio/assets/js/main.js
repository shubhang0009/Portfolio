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


/*==================== SCROLL ABOUT ANIMATION ====================*/
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".text-gradient").forEach((span) => {
    gsap.to(span, {
        backgroundSize: '100% 100%',
        ease: "none",
        scrollTrigger: {
            trigger: span,
            start: 'top bottom',
            end: 'top center',
            scrub: true,
        },
    });
});

/*==================== MY LEARNING PATH ====================*/
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".learning-item").forEach((item, i) => {
    gsap.from(item, {
        opacity: 0,
        y: 30, // Reduced bounce effect by decreasing Y translation
        duration: 0.5, // Faster duration
        delay: i * 0.05, // Faster sequential delay
        scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reset"
        }
    });
});

/*==================== PORTFOLIO FILTER ====================*/
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Set active button
        document.querySelector('.filter-btn.active')?.classList.remove('active');
        btn.classList.add('active');

        const selected = btn.dataset.filter;

        portfolioItems.forEach(item => {
            const isMatch = selected === 'all' || item.classList.contains(selected);

            if (isMatch) {
                item.style.display = 'block';
                gsap.fromTo(item, {
                    autoAlpha: 0,
                    y: 20, // Reduced bounce effect
                    scale: 0.98 // Slightly less scale for faster look
                }, {
                    autoAlpha: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.3, // Faster duration
                    ease: "power2.out"
                });
            } else {
                gsap.to(item, {
                    autoAlpha: 0,
                    y: -10, // Reduced movement
                    scale: 0.95, // Reduced scale for faster look
                    duration: 0.2, // Faster duration
                    ease: "power2.in",
                    onComplete: () => {
                        item.style.display = 'none';
                    }
                });
            }
        });
    });
});

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

/*==================== SCROLL REVEAL ANIMATION ====================*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '30px', // Reduced distance for less bounce
    duration: 1500, // Reduced duration for faster animation
    delay: 200, // Reduced delay
    reset: true // Animations repeat every time we scroll up
});

// Removed '.home-img' from the reveal list to disable its animation
sr.reveal('.home-data, .home-social, .about-current-year, .about-description, .about-data');
sr.reveal('.services-card, .skills-group, .learning-item, .portfolio-item, .contact-data, .contact-form', { interval: 50 }); // Reduced interval for faster staggered animations
