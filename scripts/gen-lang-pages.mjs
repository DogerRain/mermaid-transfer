import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const SITE = 'https://mermaid.baimuxym.cn';

const LANGS = {
  'zh-CN': {
    key: 'zh',
    htmlLang: 'zh-CN',
    title: 'Mermaid 在线渲染 - 流程图时序图甘特图实时预览编辑器',
    description:
      '免费 Mermaid 在线编辑器：实时预览流程图、时序图、甘特图、类图、状态图、ER 图、思维导图等，支持主题切换、手绘风格、导出 SVG 与 PNG。',
    keywords:
      'Mermaid,Mermaid在线,Mermaid编辑器,Mermaid流程图,Mermaid时序图,Mermaid甘特图,流程图在线,时序图在线,甘特图在线,UML在线,图表代码编辑器',
    ogTitle: 'Mermaid 在线渲染 - 实时预览图表编辑器',
    ogDescription:
      '在线编写 Mermaid 代码，实时预览并导出 SVG / PNG，支持流程图、时序图、甘特图等多种图表。',
    jsonName: 'Mermaid 在线渲染',
    jsonDesc: '免费在线 Mermaid 图表编辑器，支持实时预览与导出 SVG、PNG。',
    jsonKeywords: 'Mermaid, 流程图, 时序图, 甘特图, 在线编辑器',
    currency: 'CNY',
    navGuide: 'Mermaid 教程',
    guidePath: '/zh-CN/guide/',
  },
  en: {
    key: 'en',
    htmlLang: 'en',
    title: 'Mermaid Live Editor - Flowchart, Sequence & Gantt Diagram Tool',
    description:
      'Free online Mermaid editor with live preview for flowcharts, sequence diagrams, gantt charts, class diagrams, ER diagrams, mind maps, and more. Export SVG/PNG, themes, hand-drawn style.',
    keywords:
      'Mermaid,mermaid live editor,mermaid diagram,flowchart online,sequence diagram,gantt chart,uml diagram,diagram as code,mermaid export png,mermaid export svg',
    ogTitle: 'Mermaid Live Editor - Real-time Diagram Preview',
    ogDescription:
      'Write Mermaid code and preview instantly. Export SVG/PNG. Supports flowchart, sequence, gantt, class, state, ER, mindmap and more.',
    jsonName: 'Mermaid Live Editor',
    jsonDesc: 'Free online Mermaid diagram editor with live preview and SVG/PNG export.',
    jsonKeywords: 'Mermaid, flowchart, sequence diagram, gantt chart, online editor',
    currency: 'USD',
    navGuide: 'Mermaid Guide',
    guidePath: '/en/guide/',
  },
  ja: {
    key: 'ja',
    htmlLang: 'ja',
    title: 'Mermaid オンラインエディタ - フローチャート・シーケンス図・ガントチャート',
    description:
      '無料の Mermaid オンラインエディタ。フローチャート、シーケンス図、ガントチャート、クラス図、ER 図、マインドマップなどをリアルタイムプレビュー。SVG/PNG エクスポート、テーマ、手描きスタイル対応。',
    keywords:
      'Mermaid,Mermaid エディタ,フローチャート,シーケンス図,ガントチャート,UML,ダイアグラム,SVG エクスポート,PNG エクスポート,オンライン',
    ogTitle: 'Mermaid オンライン - リアルタイム図表エディタ',
    ogDescription:
      'Mermaid コードを書いて即座にプレビュー。SVG/PNG エクスポート。フローチャート、シーケンス図、ガントチャートなどに対応。',
    jsonName: 'Mermaid オンライン',
    jsonDesc: '無料の Mermaid オンラインエディタ。リアルタイムプレビューと SVG/PNG エクスポートに対応。',
    jsonKeywords: 'Mermaid, フローチャート, シーケンス図, ガントチャート, オンラインエディタ',
    currency: 'JPY',
    navGuide: 'Mermaid チュートリアル',
    guidePath: '/ja/guide/',
  },
};

function hreflangLinks() {
  const paths = [
    ['zh-CN', `${SITE}/zh-CN/`],
    ['en', `${SITE}/en/`],
    ['ja', `${SITE}/ja/`],
    ['x-default', `${SITE}/zh-CN/`],
  ];
  return paths
    .map(([lang, href]) => `    <link rel="alternate" hreflang="${lang}" href="${href}" />`)
    .join('\n');
}

function head(cfg, dir) {
  const canonical = `${SITE}/${dir}/`;
  return `<!DOCTYPE html>
<html lang="${cfg.htmlLang}" data-default-lang="${cfg.key}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${cfg.title}</title>
    <meta name="description" content="${cfg.description}" />
    <meta name="keywords" content="${cfg.keywords}" />
    <meta name="robots" content="index, follow" />
    <meta name="google-site-verification" content="i_rImxUz8IK5zedSClxerX-sEpZs_T1oRE2S15KqdxA" />
    <meta name="author" content="${cfg.jsonName}" />
    <link rel="canonical" href="${canonical}" />
${hreflangLinks()}
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="apple-touch-icon" href="/icon.svg" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="${cfg.htmlLang === 'zh-CN' ? 'zh_CN' : cfg.htmlLang === 'ja' ? 'ja_JP' : 'en_US'}" />
    <meta property="og:title" content="${cfg.ogTitle}" />
    <meta property="og:description" content="${cfg.ogDescription}" />
    <meta property="og:image" content="${SITE}/icon.svg" />
    <meta property="og:url" content="${canonical}" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${cfg.ogTitle}" />
    <meta name="twitter:description" content="${cfg.ogDescription}" />
    <link rel="stylesheet" href="/src/style.css" />
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "${cfg.jsonName}",
        "applicationCategory": "DesignApplication",
        "operatingSystem": "Web",
        "inLanguage": "${cfg.htmlLang}",
        "description": "${cfg.jsonDesc}",
        "keywords": "${cfg.jsonKeywords}",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "${cfg.currency}" }
      }
    </script>
  </head>`;
}

function body(cfg) {
  return `
  <body>
    <header class="app-header">
      <div class="brand">
        <svg class="brand-icon" viewBox="0 0 64 64" width="28" height="28" aria-hidden="true">
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
        </svg>
        <span class="brand-title" data-i18n="brand">${cfg.jsonName}</span>
      </div>
      <a class="header-guide-link" href="${cfg.guidePath}">${cfg.navGuide}</a>
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
            <a class="lang-option" data-lang="zh" href="/zh-CN/">中文</a>
            <a class="lang-option" data-lang="en" href="/en/">English</a>
            <a class="lang-option" data-lang="ja" href="/ja/">日本語</a>
          </div>
        </div>
        <a class="header-blog-link" href="https://learnjava.baimuxym.cn/" target="_blank" rel="noopener noreferrer" title="HelloCoder Blog">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="16 18 22 12 16 6"/>
            <polyline points="8 6 2 12 8 18"/>
          </svg>
        </a>
      </div>
    </header>

    <main class="workspace">
      <aside class="editor-panel">
        <div class="panel-toolbar">
          <label class="field-label" for="theme-select" data-i18n="themeLabel">Theme</label>
          <select id="theme-select" class="select">
            <option value="default" data-i18n="themeDefault">Default</option>
            <option value="neutral" data-i18n="themeNeutral">Neutral</option>
            <option value="dark" data-i18n="themeDark">Dark</option>
            <option value="forest" data-i18n="themeForest">Forest</option>
            <option value="base" data-i18n="themeBase">Base</option>
          </select>
          <label class="field-label" for="template-select" data-i18n="templateLabel">Templates</label>
          <select id="template-select" class="select">
            <option value="" data-i18n="templatePlaceholder">Select…</option>
            <option value="flowchart" data-i18n="tplFlowchart">Flowchart</option>
            <option value="flowchartLR" data-i18n="tplFlowchartLR">Flowchart LR</option>
            <option value="sequence" data-i18n="tplSequence">Sequence</option>
            <option value="gantt" data-i18n="tplGantt">Gantt</option>
            <option value="class" data-i18n="tplClass">Class</option>
            <option value="state" data-i18n="tplState">State</option>
            <option value="er" data-i18n="tplEr">ER</option>
            <option value="pie" data-i18n="tplPie">Pie</option>
            <option value="mindmap" data-i18n="tplMindmap">Mindmap</option>
            <option value="timeline" data-i18n="tplTimeline">Timeline</option>
            <option value="journey" data-i18n="tplJourney">Journey</option>
            <option value="gitGraph" data-i18n="tplGitGraph">Git Graph</option>
            <option value="quadrant" data-i18n="tplQuadrant">Quadrant</option>
            <option value="requirement" data-i18n="tplRequirement">Requirement</option>
            <option value="sankey" data-i18n="tplSankey">Sankey</option>
            <option value="block" data-i18n="tplBlock">Block</option>
          </select>
        </div>
        <div class="editor-wrap">
          <textarea id="editor" class="editor" spellcheck="false" aria-label="Mermaid source"></textarea>
        </div>
        <div class="editor-status">
          <span id="status-text" data-i18n="statusReady">Ready</span>
        </div>
      </aside>

      <div class="resizer" id="resizer" title="Resize" aria-hidden="true"></div>

      <section class="preview-panel">
        <div class="preview-toolbar">
          <div class="zoom-controls">
            <button type="button" class="btn btn-icon" id="zoom-out" data-i18n-title="zoomOut" title="Zoom out">−</button>
            <span class="zoom-label" id="zoom-label">100%</span>
            <button type="button" class="btn btn-icon" id="zoom-in" data-i18n-title="zoomIn" title="Zoom in">+</button>
            <button type="button" class="btn" id="zoom-reset" data-i18n-title="zoomFit" data-i18n="zoomFit" title="Fit">Fit</button>
            <button type="button" class="btn" id="zoom-100" title="1:1">1:1</button>
          </div>
          <div class="export-controls">
            <button type="button" class="btn btn-copy-image" id="copy-image" data-i18n="copyImage" data-i18n-title="copyImageTitle" title="Copy as Image">Copy as Image</button>
            <button type="button" class="btn btn-primary" id="export-svg" data-i18n="exportSvg">Export SVG</button>
            <button type="button" class="btn btn-primary" id="export-png" data-i18n="exportPng">Export PNG</button>
          </div>
        </div>
        <div class="preview-viewport" id="preview-viewport">
          <div class="preview-stage" id="preview-stage">
            <div id="mermaid-output" class="mermaid-output"></div>
          </div>
          <div id="error-banner" class="error-banner hidden" role="alert"></div>
          <div class="preview-switches" aria-label="Preview switches">
            <button type="button" class="switch-btn" id="toggle-handdrawn" data-i18n-title="toggleHandDrawn" title="Hand-drawn">✎</button>
            <button type="button" class="switch-btn is-active" id="toggle-grid" data-i18n-title="toggleGrid" title="Grid">#</button>
          </div>
          <p class="preview-hint" data-i18n="previewHint">Scroll to zoom</p>
        </div>
      </section>
    </main>

    <script type="module" src="/src/main.js"></script>
  </body>
</html>`;
}

function generateSitemap() {
  const editorUrls = Object.keys(LANGS)
    .map((dir) => {
      const loc = `${SITE}/${dir}/`;
      const alts = Object.keys(LANGS)
        .map(
          (d) =>
            `    <xhtml:link rel="alternate" hreflang="${d === 'zh-CN' ? 'zh-CN' : d}" href="${SITE}/${d}/" />`
        )
        .join('\n');
      const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}/zh-CN/" />`;
      return `  <url>
    <loc>${loc}</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
${alts}
${xDefault}
  </url>`;
    })
    .join('\n');

  const guideUrls = Object.keys(LANGS)
    .map((dir) => {
      const loc = `${SITE}/${dir}/guide/`;
      return `  <url>
    <loc>${loc}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${editorUrls}
${guideUrls}
</urlset>
`;
}

for (const [dir, cfg] of Object.entries(LANGS)) {
  const outDir = path.join(root, dir);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), head(cfg, dir) + body(cfg), 'utf8');
}

fs.writeFileSync(path.join(root, 'public', 'sitemap.xml'), generateSitemap(), 'utf8');

const seoTxt = `# Mermaid Editor - SEO / Sitemap URLs
# Replace ${SITE} with your production domain before submitting to search engines.

${Object.keys(LANGS)
  .map((d) => `${SITE}/${d}/`)
  .join('\n')}

${Object.keys(LANGS)
  .map((d) => `${SITE}/${d}/guide/`)
  .join('\n')}

${SITE}/robots.txt
${SITE}/sitemap.xml
`;

fs.writeFileSync(path.join(root, 'public', 'seo.txt'), seoTxt, 'utf8');
console.log('Generated language pages: zh-CN, en, ja');
