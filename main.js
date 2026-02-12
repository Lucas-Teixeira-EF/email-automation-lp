// --- 1. SMOOTH SCROLL (LENIS) ---
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// --- 2. GSAP ANIMATIONS ---
gsap.registerPlugin(ScrollTrigger);

// Hero Parallax & Reveal
const heroTl = gsap.timeline();

heroTl.from(".mega-type .line", {
    y: 100,
    opacity: 0,
    duration: 1.5,
    stagger: 0.2,
    ease: "power4.out",
    delay: 0.2
})
    .from(".hero-image-wrapper", {
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out"
    }, "-=1")
    .from(".hero-meta", {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    }, "-=1");

// Parallax Effect on Image
gsap.to(".hero-image-wrapper", {
    yPercent: -30,
    ease: "none",
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

// Stream Horizontal Scroll/Reveal
gsap.utils.toArray('.stream-item').forEach((item, i) => {
    gsap.from(item, {
        opacity: 0.2,
        x: 50,
        duration: 1,
        scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "top 50%",
            scrub: 1
        }
    });
});

// Marquee Animation
gsap.to(".marquee", {
    xPercent: -50,
    ease: "none",
    duration: 20,
    repeat: -1
});

// --- 3. CUSTOM CURSOR ---
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows immediately
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Outline follows with delay
        gsap.to(cursorOutline, {
            x: posX,
            y: posY,
            duration: 0.15,
            ease: "power2.out"
        });
    });

    // Hover effects
    const interactiveElements = document.querySelectorAll('a, button, input');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursorOutline, {
                scale: 1.5,
                backgroundColor: "rgba(204, 255, 0, 0.1)",
                border: "1px solid transparent"
            });
        });

        el.addEventListener('mouseleave', () => {
            gsap.to(cursorOutline, {
                scale: 1,
                backgroundColor: "transparent",
                border: "1px solid #ccff00"
            });
        });
    });
}
