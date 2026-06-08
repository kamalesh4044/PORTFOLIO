import { useEffect, useRef, useCallback } from 'react';
import './CursorTrail.css';

const TRAIL_LENGTH = 18;
const LERP_FACTOR = 0.15;
const INTERACTIVE_SELECTORS = 'a, button, [role="button"], input, textarea, select, [tabindex]';

export default function CursorTrail() {
  const dotRef = useRef(null);
  const trailRefs = useRef([]);
  const mouse = useRef({ x: -100, y: -100 });
  const smoothPos = useRef({ x: -100, y: -100 });
  const trail = useRef(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: -100, y: -100 }))
  );
  const rafId = useRef(null);
  const isHovering = useRef(false);

  const handleMouseMove = useCallback((e) => {
    mouse.current.x = e.clientX;
    mouse.current.y = e.clientY;
  }, []);

  useEffect(() => {
    /* ---- create trail DOM elements ---- */
    const container = document.createElement('div');
    container.setAttribute('aria-hidden', 'true');
    document.body.appendChild(container);

    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    container.appendChild(dot);
    dotRef.current = dot;

    const trailEls = [];
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      const el = document.createElement('div');
      el.className = 'cursor-trail-dot';
      container.appendChild(el);
      trailEls.push(el);
    }
    trailRefs.current = trailEls;

    /* ---- animation loop ---- */
    const animate = () => {
      // Smooth main dot toward actual mouse position
      smoothPos.current.x += (mouse.current.x - smoothPos.current.x) * LERP_FACTOR;
      smoothPos.current.y += (mouse.current.y - smoothPos.current.y) * LERP_FACTOR;

      const sx = smoothPos.current.x;
      const sy = smoothPos.current.y;

      // Position the main dot (centered)
      dot.style.transform = `translate(${sx - 6}px, ${sy - 6}px)`;

      // Detect interactive element under cursor
      const elUnder = document.elementFromPoint(mouse.current.x, mouse.current.y);
      const hovering = elUnder ? elUnder.closest(INTERACTIVE_SELECTORS) !== null : false;

      if (hovering !== isHovering.current) {
        isHovering.current = hovering;
        if (hovering) {
          dot.classList.add('cursor-dot--hover');
          dot.style.transform = `translate(${sx - 10}px, ${sy - 10}px)`;
        } else {
          dot.classList.remove('cursor-dot--hover');
        }
      }

      // Shift trail positions — each slot follows the one ahead of it
      for (let i = TRAIL_LENGTH - 1; i > 0; i--) {
        trail.current[i].x += (trail.current[i - 1].x - trail.current[i].x) * 0.35;
        trail.current[i].y += (trail.current[i - 1].y - trail.current[i].y) * 0.35;
      }
      trail.current[0].x += (sx - trail.current[0].x) * 0.45;
      trail.current[0].y += (sy - trail.current[0].y) * 0.45;

      // Update trail DOM
      for (let i = 0; i < TRAIL_LENGTH; i++) {
        const t = 1 - i / TRAIL_LENGTH; // 1 → 0
        const size = Math.max(2, 8 * t);
        const opacity = 0.6 * t * t;
        const el = trailEls[i];
        const half = size / 2;
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.opacity = opacity;
        el.style.boxShadow = `0 0 ${4 * t}px ${2 * t}px rgba(102, 252, 241, ${0.3 * t})`;
        el.style.transform = `translate(${trail.current[i].x - half}px, ${trail.current[i].y - half}px)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafId.current = requestAnimationFrame(animate);

    /* ---- cleanup ---- */
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      container.remove();
    };
  }, [handleMouseMove]);

  // Renders nothing — all DOM is managed imperatively for performance
  return null;
}
