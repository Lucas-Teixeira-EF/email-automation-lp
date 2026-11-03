const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
});

/**
 * Keeps the Lenis scroll instance synced with the browser render loop.
 *
 * @param {number} time - Timestamp supplied by requestAnimationFrame.
 * @returns {void}
 */
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

/**
 * Creates the landing page hero reveal and parallax sequence.
 *
 * @returns {gsap.core.Timeline} The timeline for the hero entrance animation.
 */
function setupHeroAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    const heroTl = gsap.timeline();

    heroTl.from(".mega-type .line", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.2,
    })
        .from(".hero-image-wrapper", {
            scale: 0.8,
            opacity: 0,
            duration: 1.5,
            ease: "expo.out",
        }, "-=1")
        .from(".hero-meta", {
            y: 20,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
        }, "-=1");

    // The image is intentionally lifted while the hero section scrolls,
    // creating the subtle depth that makes the landing page feel premium.
    gsap.to(".hero-image-wrapper", {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
        },
    });

    return heroTl;
}

/**
 * Animates each stream card as it enters the viewport.
 *
 * @returns {void}
 */
function setupStreamAnimations() {
    gsap.utils.toArray(".stream-item").forEach((item) => {
        gsap.from(item, {
            opacity: 0.2,
            x: 50,
            duration: 1,
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
                end: "top 50%",
                scrub: 1,
            },
        });
    });
}

/**
 * Animates the marquee strip in a continuous loop.
 *
 * @returns {void}
 */
function setupMarqueeAnimation() {
    gsap.to(".marquee", {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1,
    });
}

/**
 * Tracks the pointer with a fast-moving dot and a slightly delayed outline.
 *
 * @returns {void}
 */
function setupCustomCursor() {
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");

    if (!cursorDot || !cursorOutline) {
        return;
    }

    window.addEventListener("mousemove", (event) => {
        const posX = event.clientX;
        const posY = event.clientY;

        // The dot should stay visually tight to the pointer while the outline lags
        // slightly behind for a softer, more polished motion cue.
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        gsap.to(cursorOutline, {
            x: posX,
            y: posY,
            duration: 0.15,
            ease: "power2.out",
        });
    });

    const interactiveElements = document.querySelectorAll("a, button, input");
    interactiveElements.forEach((element) => {
        element.addEventListener("mouseenter", () => {
            gsap.to(cursorOutline, {
                scale: 1.5,
                backgroundColor: "rgba(204, 255, 0, 0.1)",
                border: "1px solid transparent",
            });
        });

        element.addEventListener("mouseleave", () => {
            gsap.to(cursorOutline, {
                scale: 1,
                backgroundColor: "transparent",
                border: "1px solid #ccff00",
            });
        });
    });
}

/**
 * Initializes the landing page animation stack.
 *
 * @returns {void}
 */
function initializeLandingPage() {
    setupHeroAnimations();
    setupStreamAnimations();
    setupMarqueeAnimation();
    setupCustomCursor();
    requestAnimationFrame(raf);
}

window.EmailAutomationLP = {
    raf,
    setupHeroAnimations,
    setupStreamAnimations,
    setupMarqueeAnimation,
    setupCustomCursor,
    initializeLandingPage,
};

initializeLandingPage();
