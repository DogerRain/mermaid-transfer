import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
  fontFamily: 'system-ui, -apple-system, "Segoe UI", "Microsoft YaHei", sans-serif',
});

async function renderPreviews() {
  const demos = document.querySelectorAll('.guide-demo');
  let index = 0;

  for (const demo of demos) {
    const codeEl = demo.querySelector('.guide-code code');
    const preview = demo.querySelector('.guide-preview');
    if (!codeEl || !preview) continue;

    const source = codeEl.textContent.trim().replace(/\r\n?/g, '\n');
    if (!source) continue;

    try {
      const { svg } = await mermaid.render(`guide-preview-${index++}`, source);
      preview.innerHTML = svg;
      preview.classList.remove('is-error');
      const svgEl = preview.querySelector('svg');
      if (svgEl) {
        svgEl.style.maxWidth = '100%';
        svgEl.style.height = 'auto';
      }
    } catch (err) {
      preview.classList.add('is-error');
      preview.textContent = err?.message || String(err);
    }
  }
}

function initTocToggle() {
  const sidebar = document.getElementById('guide-sidebar');
  const toggle = document.getElementById('guide-toc-toggle');
  if (!sidebar || !toggle) return;

  toggle.addEventListener('click', () => {
    const collapsed = sidebar.classList.toggle('is-collapsed');
    toggle.setAttribute('aria-expanded', String(!collapsed));
    toggle.textContent = collapsed ? toggle.dataset.expand : toggle.dataset.collapse;
  });
}

function initTocScrollSpy() {
  const links = Array.from(document.querySelectorAll('.guide-toc-link'));
  const sections = links
    .map((link) => document.getElementById(link.dataset.section))
    .filter(Boolean);

  if (!links.length || !sections.length) return;

  let activeId = '';

  const setActive = (id) => {
    if (!id || id === activeId) return;
    activeId = id;
    links.forEach((link) => {
      link.classList.toggle('is-active', link.dataset.section === id);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visible.length) {
        setActive(visible[0].target.id);
        return;
      }

      const scrollY = window.scrollY + 80;
      let current = sections[0].id;
      for (const section of sections) {
        if (section.offsetTop <= scrollY) current = section.id;
      }
      setActive(current);
    },
    { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.1, 0.5, 1] },
  );

  sections.forEach((section) => observer.observe(section));

  if (window.location.hash) {
    const id = window.location.hash.slice(1);
    if (sections.some((section) => section.id === id)) setActive(id);
  } else {
    setActive(sections[0].id);
  }
}

renderPreviews();
initTocToggle();
initTocScrollSpy();
