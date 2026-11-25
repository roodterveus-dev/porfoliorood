import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 55;
const LINK_DISTANCE = 130;

export default function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width, height, particles, rafId;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const readAccent = () =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--color-accent")
        .trim();
    let accent = readAccent();

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      // Keep particles on-screen when the viewport shrinks.
      particles?.forEach((p) => {
        p.x = Math.min(p.x, width);
        p.y = Math.min(p.y, height);
      });
      if (prefersReducedMotion && particles) draw(false);
    }

    function makeParticles() {
      const count = Math.min(PARTICLE_COUNT, Math.round(width / 12));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
      }));
    }

    function draw(move) {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        if (move) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x <= 0 || p.x >= width) {
            p.vx *= -1;
            p.x = Math.max(0, Math.min(p.x, width));
          }
          if (p.y <= 0 || p.y >= height) {
            p.vy *= -1;
            p.y = Math.max(0, Math.min(p.y, height));
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.globalAlpha = 0.5;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DISTANCE) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = accent;
            ctx.globalAlpha = 0.08 * (1 - dist / LINK_DISTANCE);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
    }

    function step() {
      draw(true);
      rafId = requestAnimationFrame(step);
    }

    resize();
    makeParticles();
    window.addEventListener("resize", resize);

    // Follow theme changes, including while animation is paused.
    const themeObserver = new MutationObserver(() => {
      accent = readAccent();
      if (prefersReducedMotion) draw(false);
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    if (!prefersReducedMotion) {
      rafId = requestAnimationFrame(step);
    } else {
      draw(false);
    }

    return () => {
      themeObserver.disconnect();
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
}
