// TypeScript Implementation
const mercBtn = document.querySelector<HTMLButtonElement>('.mercury-ripple-btn');
if (mercBtn) {
  mercBtn.addEventListener('click', () => {
    const rings = mercBtn.querySelectorAll<HTMLSpanElement>('.mercury-wave-ring');
    rings.forEach(ring => {
      ring.style.animation = 'none';
      ring.offsetHeight; // trigger reflow
      ring.style.animation = 'mercury-ripple-wave 1.2s cubic-bezier(0.1, 0.8, 0.3, 1)';
    });
  });
}