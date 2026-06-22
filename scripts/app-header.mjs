export const BLOG_URL = 'https://learnjava.baimuxym.cn/';

export const HEADER_BY_LANG = {
  'zh-CN': {
    key: 'zh',
    langPath: '/zh-CN/',
    brand: 'Mermaid 在线渲染',
    navGuide: 'Mermaid 教程',
    navAbout: '关于',
    navPrivacy: '隐私',
    guidePath: '/zh-CN/guide/',
    aboutPath: '/zh-CN/about/',
    privacyPath: '/zh-CN/privacy/',
  },
  en: {
    key: 'en',
    langPath: '/en/',
    brand: 'Mermaid Live Editor',
    navGuide: 'Mermaid Guide',
    navAbout: 'About',
    navPrivacy: 'Privacy',
    guidePath: '/en/guide/',
    aboutPath: '/en/about/',
    privacyPath: '/en/privacy/',
  },
  ja: {
    key: 'ja',
    langPath: '/ja/',
    brand: 'Mermaid オンライン',
    navGuide: 'Mermaid チュートリアル',
    navAbout: 'について',
    navPrivacy: 'プライバシー',
    guidePath: '/ja/guide/',
    aboutPath: '/ja/about/',
    privacyPath: '/ja/privacy/',
  },
};

const BRAND_ICON = `<svg class="brand-icon" viewBox="0 0 64 64" width="28" height="28" aria-hidden="true">
          <defs>
            <linearGradient id="brand-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#fbbf24"/>
              <stop offset="100%" stop-color="#d97706"/>
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="14" fill="url(#brand-bg)"/>
          <g fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="10" y="12" width="18" height="12" rx="3" fill="#fff"/>
            <path d="M19 24v4h13v4"/>
            <rect x="24" y="32" width="18" height="12" rx="3" fill="#fff"/>
            <path d="M33 44v4h13"/>
            <polygon points="46,48 52,45 46,42" fill="#fff" stroke="none"/>
            <rect x="36" y="12" width="18" height="12" rx="6" fill="#fffbeb" stroke="#fef3c7"/>
          </g>
        </svg>`;

function pageSuffix(pageType) {
  if (pageType === 'guide') return 'guide/';
  if (pageType === 'about') return 'about/';
  if (pageType === 'privacy') return 'privacy/';
  return '';
}

function navClass(base, active) {
  return active ? `${base} is-active` : base;
}

function langMenuLinks(pageType) {
  const suffix = pageSuffix(pageType);
  const items = [
    ['zh-CN', 'zh', '中文'],
    ['en', 'en', 'English'],
    ['ja', 'ja', '日本語'],
  ];
  return items
    .map(
      ([dir, key, label]) =>
        `            <a class="lang-option" data-lang="${key}" href="/${dir}/${suffix}">${label}</a>`,
    )
    .join('\n');
}

/** @param {'zh-CN'|'en'|'ja'} langDir @param {'editor'|'guide'|'about'|'privacy'} pageType */
export function renderAppHeader(langDir, pageType = 'editor') {
  const cfg = HEADER_BY_LANG[langDir];
  if (!cfg) throw new Error(`Unknown lang dir: ${langDir}`);

  return `    <header class="app-header">
      <a class="brand" href="${cfg.langPath}">
        ${BRAND_ICON}
        <span class="brand-title" data-i18n="brand">${cfg.brand}</span>
      </a>
      <a class="${navClass('header-guide-link', pageType === 'guide')}" href="${cfg.guidePath}">${cfg.navGuide}</a>
      <a class="${navClass('header-meta-link', pageType === 'about')}" href="${cfg.aboutPath}">${cfg.navAbout}</a>
      <a class="${navClass('header-meta-link', pageType === 'privacy')}" href="${cfg.privacyPath}">${cfg.navPrivacy}</a>
      <div class="header-actions">
        <div class="lang-dropdown" id="lang-dropdown">
          <button type="button" class="lang-toggle" id="lang-toggle" title="Language">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M2 12h20"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <span id="lang-label"></span>
          </button>
          <div class="lang-menu" id="lang-menu">
${langMenuLinks(pageType)}
          </div>
        </div>
        <a class="header-blog-link" href="${BLOG_URL}" target="_blank" rel="noopener noreferrer" title="HelloCoder Blog">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="16 18 22 12 16 6"/>
            <polyline points="8 6 2 12 8 18"/>
          </svg>
        </a>
      </div>
    </header>`;
}
