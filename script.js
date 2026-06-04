tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            "colors": {
                "on-tertiary-container": "#ff907f",
                "on-primary-fixed": "#410000",
                "surface-container-high": "#eaead1",
                "inverse-surface": "#303221",
                "tertiary-fixed-dim": "#ffb4a8",
                "surface-variant": "#e4e4cc",
                "on-secondary": "#ffffff",
                "primary-fixed": "#ffdad4",
                "surface-container": "#efefd7",
                "on-tertiary": "#ffffff",
                "outline-variant": "#e3beb8",
                "on-primary-container": "#ff907f",
                "on-background": "#1b1d0e",
                "inverse-on-surface": "#f2f2d9",
                "primary-fixed-dim": "#ffb4a8",
                "tertiary-container": "#8b0000",
                "on-tertiary-fixed-variant": "#920703",
                "on-secondary-fixed": "#1b1b1b",
                "surface-tint": "#b52619",
                "on-error-container": "#93000a",
                "secondary": "#5e5e5e",
                "on-secondary-container": "#646464",
                "surface-bright": "#fbfbe2",
                "tertiary": "#610000",
                "surface": "#f5f5dc",
                "on-surface": "#1b1d0e",
                "on-primary-fixed-variant": "#920703",
                "secondary-fixed": "#e2e2e2",
                "on-surface-variant": "#5a403c",
                "outline": "#8e706b",
                "surface-container-low": "#f5f5dc",
                "surface-container-highest": "#e4e4cc",
                "secondary-fixed-dim": "#c6c6c6",
                "on-secondary-fixed-variant": "#474747",
                "primary": "#610000",
                "on-tertiary-fixed": "#410000",
                "inverse-primary": "#ffb4a8",
                "error-container": "#ffdad6",
                "on-error": "#ffffff",
                "on-primary": "#ffffff",
                "error": "#ba1a1a",
                "tertiary-fixed": "#ffdad4",
                "background": "#f5f5dc",
                "surface-container-lowest": "#ffffff",
                "secondary-container": "#e2e2e2",
                "surface-dim": "#dbdcc3",
                "primary-container": "#8b0000"
            },
            "borderRadius": {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "full": "9999px"
            },
            "fontFamily": {
                "headline": ["Space Grotesk"],
                "body": ["Manrope"],
                "label": ["Space Grotesk"]
            }
        },
    },
};

document.addEventListener("DOMContentLoaded", () => {
    const openBtn = document.getElementById("openPortalBtn");
    const portalOverlay = document.getElementById("portalOverlay");
    const mainContent = document.getElementById("mainContent");
    const body = document.getElementById("mainBody");

    // Setup Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-3d, .reveal-left, .reveal-right').forEach(el => {
        observer.observe(el);
    });

    if (openBtn) {
        openBtn.addEventListener("click", () => {
            // 1. Smoothly shrink and fade the seal button
            openBtn.style.transition = "transform 0.5s ease, opacity 0.5s ease";
            openBtn.style.transform = "scale(0.5)";
            openBtn.style.opacity = "0";

            // 2. Smoothly transition the entire screen from cream to red
            portalOverlay.style.transition = "background-color 1s ease-in-out";
            portalOverlay.classList.remove("bg-surface-container-low");
            portalOverlay.classList.add("bg-primary-container");

            // 3. Hide portal completely by fading it slowly with a deep backdrop blur
            setTimeout(() => {
                portalOverlay.style.transition = "all 1.5s cubic-bezier(0.4, 0, 0.2, 1)";
                portalOverlay.style.backdropFilter = "blur(15px)";
                portalOverlay.style.opacity = "0";
                portalOverlay.style.transform = "scale(1.05)";
            }, 800);

            // 4. Remove locking & Reveal content sliding down more elegantly
            setTimeout(() => {
                portalOverlay.style.display = "none";
                body.classList.remove("locked");

                // Render Main Content
                mainContent.classList.remove("hidden");
                const mainNav = document.getElementById("mainNav");
                if (mainNav) mainNav.classList.remove("hidden");

                // Trigger reflow to apply transition
                void mainContent.offsetWidth;
                if (mainNav) void mainNav.offsetWidth;

                // Slide down and fade in the whole content wrapper
                mainContent.classList.remove("opacity-0", "translate-y-16");
                mainContent.classList.add("opacity-100", "translate-y-0");

                // Animate the nav bar in (drop down from top)
                if (mainNav) {
                    mainNav.classList.remove("opacity-0", "-translate-y-full");
                    mainNav.classList.add("opacity-100", "translate-y-0");
                }

            }, 1200);
        });
    }

    // Smooth Scroll active navigation state
    const sections = document.querySelectorAll('section, #mainBody');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 250) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            const link = item.querySelector('a');
            if (link && link.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // Smooth scrolling for pill nav
    const navLinks = document.querySelectorAll('.nav-item a');
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                navItems.forEach(item => item.classList.remove('active'));
                link.parentElement.classList.add('active');
            }
        });
    });

    // Typing effect
    const typingElement = document.getElementById('typing-title');
    const words = ["Creative Director", "Lead Architect", "UI/UX Engineer", "Frontend Developer"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        if (!typingElement) return;
        const currentWord = words[wordIndex];
        let displayedText = currentWord.substring(0, charIndex);

        typingElement.innerHTML = displayedText + '<span class="cursor opacity-70">|</span>';

        if (!isDeleting && charIndex < currentWord.length) {
            charIndex++;
            setTimeout(type, typingSpeed);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(type, typingSpeed / 2);
        } else {
            isDeleting = !isDeleting;
            if (!isDeleting) {
                wordIndex = (wordIndex + 1) % words.length;
            }
            setTimeout(type, 1000);
        }
    }
    // Add typing effect to start
    setTimeout(type, 2000); // Start after portal opens
});
