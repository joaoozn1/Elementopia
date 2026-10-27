// Enhancement only: the home remains usable without either library.
document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) window.lucide.createIcons();
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!window.gsap || reducedMotion.matches) return;

  const context = gsap.context(() => {
    gsap.from(".hero-copy > *", {
      y: 22,
      opacity: 0,
      duration: 0.7,
      stagger: 0.09,
      ease: "power2.out",
      clearProps: "all",
    });
    gsap.from(".atom-tile", {
      scale: 0.85,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: "back.out(1.3)",
      clearProps: "all",
    });
    gsap.to(".spark-one", {
      rotation: "+=90",
      duration: 16,
      repeat: -1,
      ease: "none",
    });
  });
  // Respect a motion preference changed while the page is open.
  reducedMotion.addEventListener("change", () => context.revert(), {
    once: true,
  });
});
