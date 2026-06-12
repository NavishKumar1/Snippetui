// Trigger ripples on click
const mercBtn = document.querySelector('.mercury-ripple-btn');
if (mercBtn) {
  mercBtn.addEventListener('click', () => {
    const rings = mercBtn.querySelectorAll('.mercury-wave-ring');
    rings.forEach(ring => {
      ring.style.animation = 'none';
      ring.offsetHeight; // trigger reflow
      ring.style.animation = 'mercury-ripple-wave 1.2s cubic-bezier(0.1, 0.8, 0.3, 1)';
    });
  });
}