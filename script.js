// 1. Initialize Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 3. Hero Entry Animations
gsap.to(".badge", { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: "power3.out" });
gsap.to("#page-title", { opacity: 1, y: 0, duration: 1, delay: 0.4, ease: "power3.out" });
gsap.to(".hero-copy", { opacity: 1, y: 0, duration: 1, delay: 0.6, ease: "power3.out" });
gsap.to(".hero-actions", { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: "power3.out" });
gsap.to(".hero-visual", { opacity: 1, y: 0, duration: 1.2, delay: 1, ease: "power3.out" });

// 4. Scroll Animation for All Section Cards & Features
gsap.utils.toArray(".feature-card, .service-card, .portfolio-item, .about-copy, .contact-card").forEach((card) => {
    gsap.to(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 80%",
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
    });
});

// 5. Interactive Sound Effects
const hoverSound = document.getElementById("hover-sound");
const clickSound = document.getElementById("click-sound");

if (hoverSound) hoverSound.volume = 0.2;
if (clickSound) clickSound.volume = 0.4;

const interactiveElements = document.querySelectorAll("a, button, .filter-btn, .project-card, .site-logo, .whatsapp-float");

// 6. Mobile Menu & Lightbox Functionality
const menuToggle = document.querySelector(".menu-toggle");
const siteNavigation = document.querySelector(".site-nav");

if (menuToggle && siteNavigation) {
    menuToggle.addEventListener("click", () => {
        const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", String(!isExpanded));
        siteNavigation.classList.toggle("is-open", !isExpanded);
    });
}

const lightbox = document.querySelector(".lightbox");
if (lightbox) {
    const lightboxImage = document.querySelector(".lightbox-image");
    const lightboxCaption = document.querySelector(".lightbox-caption");

    document.querySelectorAll(".portfolio-image-button").forEach((button) => {
        button.addEventListener("click", () => {
            const thumbnail = button.querySelector("img");
            lightboxImage.src = button.dataset.fullSrc || thumbnail.currentSrc;
            lightboxImage.alt = thumbnail.alt;
            lightboxCaption.textContent = button.dataset.caption;
            lightbox.showModal();
        });
    });

    document.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) lightbox.close();
    });
}

// 7. Cinematic Mouse-Move Parallax Tilt Effect for Hero Visual
const heroVisual = document.querySelector(".hero-visual");

if (heroVisual) {
    document.addEventListener("mousemove", (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
       
        gsap.to(heroVisual, {
            rotationY: xAxis,
            rotationX: -yAxis,
            ease: "power2.out",
            duration: 0.5
        });
    });

    // Reset rotation when mouse leaves window
    document.addEventListener("mouseleave", () => {
        gsap.to(heroVisual, {
            rotationX: 0,
            rotationY: 0,
            duration: 1,
            ease: "power3.out"
        });
    });
}

// 8. Magnetic Hover Effect for Buttons & Cards
const magneticElements = document.querySelectorAll(".btn-primary, .btn-secondary, .nav-btn, .portfolio-image-button");

magneticElements.forEach((el) => {
    el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(el, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    el.addEventListener("mouseleave", () => {
        gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.4)"
        });
    });
});
// 9. Advanced Scale & Fade ScrollTrigger for Sections
gsap.utils.toArray(".feature-card, .service-card, .portfolio-item").forEach((card) => {
    gsap.fromTo(card,
        { scale: 0.9, opacity: 0, y: 50 },
        {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power4.out"
        }
    );
});
// 10. Custom Cursor Tracker
const cursor = document.querySelector(".custom-cursor");
if (cursor) {
    window.addEventListener("mousemove", (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
    });
}

// 11. Self-Running Live Ambient Animations
gsap.to(".hero-visual", {
    y: -15,
    rotationZ: 1,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});

// Subtle floating loop for feature and service cards
gsap.utils.toArray(".feature-card, .service-card").forEach((card, index) => {
    gsap.to(card, {
        y: -8,
        duration: 2.5 + (index * 0.3), // Stagger the timing so they don't move together
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.2
    });
});

// Continuous breathing glow for badges or highlights
gsap.to(".badge", {
    boxShadow: "0 0 25px rgba(99, 102, 241, 0.6)",
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut"
});

// 12. Interactive Sound Toggle Control
const soundToggle = document.getElementById("sound-toggle");
const bgAudio = document.getElementById("bg-audio");
let isAudioEnabled = true;

if (soundToggle) {
    soundToggle.addEventListener("click", () => {
        isAudioEnabled = !isAudioEnabled;
        
        const soundIcon = soundToggle.querySelector(".sound-icon");
        const soundText = soundToggle.querySelector(".sound-text");
        
        if (isAudioEnabled) {
            soundToggle.classList.remove("is-muted");
            soundIcon.textContent = "🔊";
            soundText.textContent = "Audio: On";
            if (bgAudio) bgAudio.play().catch(() => {});
        } else {
            soundToggle.classList.add("is-muted");
            soundIcon.textContent = "🔇";
            soundText.textContent = "Audio: Off";
            if (bgAudio) bgAudio.pause();
        }
    });
}

// Update your existing hover/click sound event listeners to respect the toggle:
interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
        if (isAudioEnabled && hoverSound) {
            hoverSound.currentTime = 0;
            hoverSound.play().catch(() => {});
        }
    });

    element.addEventListener("click", () => {
        if (isAudioEnabled && clickSound) {
            clickSound.currentTime = 0;
            clickSound.play().catch(() => {});
        }
    });
});

// 13. Cinematic Preloader Animation
const preloader = document.getElementById("preloader");
const loaderProgress = document.querySelector(".loader-progress");
const loaderPercentage = document.querySelector(".loader-percentage");

let progress = { val: 0 };

gsap.to(progress, {
    val: 100,
    duration: 1.5,
    ease: "power2.out",
    onUpdate: () => {
        let currentVal = Math.round(progress.val);
        if (loaderProgress) loaderProgress.style.width = currentVal + "%";
        if (loaderPercentage) loaderPercentage.textContent = currentVal + "%";
    },
    onComplete: () => {
        // Slide or fade out the preloader curtain
        if (!preloader) return;
        gsap.to(preloader, {
            yPercent: -100,
            duration: 0.8,
            ease: "power4.inOut",
            onComplete: () => {
                preloader.style.display = "none";
            }
        });
    }
});

// Interactive Project Filtering Logic
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Remove active class from all buttons and add to clicked one
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filterValue = button.getAttribute("data-filter");

        projectCards.forEach(card => {
            if (filterValue === "all" || card.classList.contains(filterValue)) {
                card.classList.remove("hide");
                gsap.fromTo(card, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4 });
            } else {
                card.classList.add("hide");
            }
        });
    });
});

// Cinematic Custom Cursor Logic
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Direct movement for the dot
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Smooth lagging movement for the outline using GSAP
    gsap.to(cursorOutline, {
        left: posX,
        top: posY,
        duration: 0.15,
        ease: "power2.out"
    });
});

// Expand cursor on interactive elements
const cursorInteractiveElements = document.querySelectorAll("a, button, .filter-btn, .project-card, .site-logo");

cursorInteractiveElements.forEach(el => {
    el.addEventListener("mouseenter", () => {
        document.body.classList.add("cursor-hover");
    });
    el.addEventListener("mouseleave", () => {
        document.body.classList.remove("cursor-hover");
    });
});
