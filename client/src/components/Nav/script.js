const nav = document.getElementById('site-nav');
const links = Array.from(document.querySelectorAll('.nav-link'));
if (nav) {
  const setActive = () => {
    const fromTop = window.scrollY + 140;
    let current = 'work';
    document.querySelectorAll('section[id], main section[id]').forEach((section) => {
      if (section.offsetTop <= fromTop) {
        current = section.id;
      }
    });
    links.forEach((link) => {
      const href = link.getAttribute('href') || '';
      const isActive = href === `#${current}` || (current === 'hero' && href === '#hero');
      link.classList.toggle('active', isActive);
    });
    nav.classList.toggle('scrolled', window.scrollY > 20);
  };
  setActive();
  window.addEventListener('scroll', setActive, { passive: true });
  window.addEventListener('resize', setActive);
}
