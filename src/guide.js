import mermaid from 'mermaid';
import { initHeader } from './header.js';

mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
  fontFamily: 'system-ui, -apple-system, "Segoe UI", "Microsoft YaHei", sans-serif',
});

function getSvgDimensions(svgElement) {
  const viewBox = svgElement.viewBox?.baseVal;
  if (viewBox && viewBox.width > 0 && viewBox.height > 0) {
    return { width: viewBox.width, height: viewBox.height };
  }

  const widthAttr = Number.parseFloat(svgElement.getAttribute('width') || '');
  const heightAttr = Number.parseFloat(svgElement.getAttribute('height') || '');
  if (Number.isFinite(widthAttr) && Number.isFinite(heightAttr) && widthAttr > 0 && heightAttr > 0) {
    return { width: widthAttr, height: heightAttr };
  }

  const box = svgElement.getBoundingClientRect();
  return { width: Math.max(box.width, 1), height: Math.max(box.height, 1) };
}

function fitSvgToViewport(viewport, svgEl, { maxScale = Infinity, padding = 48 } = {}) {
  svgEl.style.display = 'block';
  svgEl.style.maxWidth = 'none';
  svgEl.style.maxHeight = 'none';

  const fitToView = () => {
    const { width, height } = getSvgDimensions(svgEl);
    const vp = viewport.getBoundingClientRect();
    if (vp.width <= 0 || vp.height <= 0 || width <= 0 || height <= 0) return;
    const scaleX = (vp.width - padding) / width;
    const scaleY = (vp.height - padding) / height;
    const scale = Math.min(scaleX, scaleY, maxScale);
    svgEl.style.width = `${width * scale}px`;
    svgEl.style.height = `${height * scale}px`;
  };

  requestAnimationFrame(fitToView);
  return fitToView;
}

function setupPreviewFit(viewport, svgEl) {
  return fitSvgToViewport(viewport, svgEl, { maxScale: 1, padding: 8 });
}

let lightboxEl = null;
let lightboxResizeHandler = null;

function getCloseLabel() {
  return document.body.dataset.guideClose || 'Close';
}

function ensureLightbox() {
  if (lightboxEl) return lightboxEl;

  lightboxEl = document.createElement('div');
  lightboxEl.className = 'guide-lightbox';
  lightboxEl.hidden = true;
  lightboxEl.innerHTML = `
    <div class="guide-lightbox-backdrop" data-close></div>
    <div class="guide-lightbox-dialog" role="dialog" aria-modal="true" aria-label="">
      <button type="button" class="guide-lightbox-close" data-close aria-label="">&times;</button>
      <div class="guide-lightbox-viewport">
        <div class="guide-lightbox-content"></div>
      </div>
    </div>
  `;
  document.body.appendChild(lightboxEl);

  const close = () => closePreviewLightbox();

  lightboxEl.querySelectorAll('[data-close]').forEach((el) => {
    el.addEventListener('click', close);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxEl && !lightboxEl.hidden) close();
  });

  return lightboxEl;
}

function openPreviewLightbox(svgEl) {
  const lb = ensureLightbox();
  const dialog = lb.querySelector('.guide-lightbox-dialog');
  const viewport = lb.querySelector('.guide-lightbox-viewport');
  const content = lb.querySelector('.guide-lightbox-content');
  const closeBtn = lb.querySelector('.guide-lightbox-close');
  const closeLabel = getCloseLabel();

  dialog.setAttribute('aria-label', closeLabel);
  closeBtn.setAttribute('aria-label', closeLabel);

  content.innerHTML = '';
  const clone = svgEl.cloneNode(true);
  clone.removeAttribute('style');
  content.appendChild(clone);

  if (lightboxResizeHandler) {
    window.removeEventListener('resize', lightboxResizeHandler);
  }
  const fitToView = fitSvgToViewport(viewport, clone, { padding: 48 });
  lightboxResizeHandler = fitToView;
  window.addEventListener('resize', lightboxResizeHandler);

  lb.hidden = false;
  document.body.classList.add('guide-lightbox-open');
  requestAnimationFrame(fitToView);
}

function closePreviewLightbox() {
  if (!lightboxEl || lightboxEl.hidden) return;
  if (lightboxResizeHandler) {
    window.removeEventListener('resize', lightboxResizeHandler);
    lightboxResizeHandler = null;
  }
  lightboxEl.hidden = true;
  lightboxEl.querySelector('.guide-lightbox-content').innerHTML = '';
  document.body.classList.remove('guide-lightbox-open');
}

async function renderPreviews() {
  const demos = document.querySelectorAll('.guide-demo');
  let index = 0;

  for (const demo of demos) {
    const codeEl = demo.querySelector('.guide-code code');
    const preview = demo.querySelector('.guide-preview');
    const enlargeBtn = demo.querySelector('.guide-preview-enlarge');
    if (!codeEl || !preview) continue;

    const source = codeEl.textContent.trim().replace(/\r\n?/g, '\n');
    if (!source) continue;

    try {
      const { svg } = await mermaid.render(`guide-preview-${index++}`, source);
      preview.innerHTML = svg;
      preview.classList.remove('is-error');
      const svgEl = preview.querySelector('svg');
      if (svgEl) {
        setupPreviewFit(preview, svgEl);
        if (enlargeBtn) {
          enlargeBtn.addEventListener('click', () => openPreviewLightbox(svgEl));
        }
      }
    } catch (err) {
      preview.classList.add('is-error');
      preview.textContent = err?.message || String(err);
      if (enlargeBtn) enlargeBtn.hidden = true;
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
initHeader();
initTocToggle();
initTocScrollSpy();
