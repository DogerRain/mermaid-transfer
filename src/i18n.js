const translations = {
  zh: {
    brand: 'Mermaid 在线渲染',
    themeLabel: '图表主题',
    templateLabel: '示例模板',
    templatePlaceholder: '选择模板…',
    tplFlowchart: '流程图 · 纵向',
    tplFlowchartLR: '流程图 · 横向',
    tplSequence: '时序图',
    tplGantt: '甘特图',
    tplClass: '类图',
    tplState: '状态图',
    tplEr: 'ER 图',
    tplPie: '饼图',
    tplMindmap: '思维导图',
    tplTimeline: '时间线',
    tplJourney: '用户旅程图',
    tplGitGraph: 'Git 分支图',
    tplQuadrant: '象限图',
    tplRequirement: '需求图',
    tplSankey: '桑基图',
    tplBlock: '块图',
    themeDefault: 'Default · 经典蓝',
    themeNeutral: 'Neutral · 中性灰',
    themeDark: 'Dark · 深色',
    themeForest: 'Forest · 森林绿',
    themeBase: 'Base · 简约底',
    zoomOut: '缩小',
    zoomIn: '放大',
    zoomFit: '适应',
    zoomOneToOne: '1:1',
    exportSvg: '导出 SVG',
    exportPng: '导出 PNG',
    copyImage: '复制为图片',
    copyImageTitle: '将当前图表复制为 PNG 图片到剪贴板',
    copyImageOk: '已复制图片到剪贴板',
    copyImageToast: '已复制',
    copyImageFail: '复制图片失败',
    statusCopyingImage: '正在复制图片…',
    copyImageFailDetail: '复制图片失败：{msg}\n请使用 HTTPS 或 localhost 访问，或尝试「导出 PNG」。',
    toggleHandDrawn: '手绘风格',
    toggleGrid: '网格背景',
    previewHint: '滚轮缩放 · 拖拽平移 · 双击重置视图',
    statusReady: '就绪',
    statusNeedInput: '请输入 Mermaid 代码',
    statusRendering: '渲染中…',
    statusRenderOk: '渲染成功',
    statusSyntaxError: '语法错误',
    statusNoExport: '无可导出的图表',
    statusExportingPng: '正在导出 PNG…',
    statusExportedSvg: '已导出 SVG',
    statusExportedPng: '已导出 PNG',
    statusExportFail: 'PNG 导出失败',
    exportFailDetail: 'PNG 导出失败：{msg}\n建议先使用"导出 SVG"，或在浏览器中打开 SVG 后另存为 PNG。',
    langLabel: '语言',
  },
  en: {
    brand: 'Mermaid Online',
    themeLabel: 'Theme',
    templateLabel: 'Templates',
    templatePlaceholder: 'Select template…',
    tplFlowchart: 'Flowchart · Vertical',
    tplFlowchartLR: 'Flowchart · Horizontal',
    tplSequence: 'Sequence Diagram',
    tplGantt: 'Gantt Chart',
    tplClass: 'Class Diagram',
    tplState: 'State Diagram',
    tplEr: 'ER Diagram',
    tplPie: 'Pie Chart',
    tplMindmap: 'Mind Map',
    tplTimeline: 'Timeline',
    tplJourney: 'User Journey',
    tplGitGraph: 'Git Graph',
    tplQuadrant: 'Quadrant Chart',
    tplRequirement: 'Requirement Diagram',
    tplSankey: 'Sankey Diagram',
    tplBlock: 'Block Diagram',
    themeDefault: 'Default · Classic Blue',
    themeNeutral: 'Neutral · Gray',
    themeDark: 'Dark',
    themeForest: 'Forest · Green',
    themeBase: 'Base · Minimal',
    zoomOut: 'Zoom Out',
    zoomIn: 'Zoom In',
    zoomFit: 'Fit',
    zoomOneToOne: '1:1',
    exportSvg: 'Export SVG',
    exportPng: 'Export PNG',
    copyImage: 'Copy as Image',
    copyImageTitle: 'Copy the current diagram as a PNG image to the clipboard',
    copyImageOk: 'Image copied to clipboard',
    copyImageToast: 'Copied',
    copyImageFail: 'Copy image failed',
    statusCopyingImage: 'Copying image…',
    copyImageFailDetail: 'Copy image failed: {msg}\nUse HTTPS or localhost, or try "Export PNG" instead.',
    toggleHandDrawn: 'Hand-drawn Style',
    toggleGrid: 'Grid Background',
    previewHint: 'Scroll to zoom · Drag to pan · Double-click to reset',
    statusReady: 'Ready',
    statusNeedInput: 'Enter Mermaid code',
    statusRendering: 'Rendering…',
    statusRenderOk: 'Rendered',
    statusSyntaxError: 'Syntax Error',
    statusNoExport: 'Nothing to export',
    statusExportingPng: 'Exporting PNG…',
    statusExportedSvg: 'SVG Exported',
    statusExportedPng: 'PNG Exported',
    statusExportFail: 'PNG Export Failed',
    exportFailDetail: 'PNG export failed: {msg}\nTry "Export SVG" instead, or open the SVG in a browser and save as PNG.',
    langLabel: 'Language',
  },
  ja: {
    brand: 'Mermaid オンライン',
    themeLabel: 'テーマ',
    templateLabel: 'テンプレート',
    templatePlaceholder: 'テンプレートを選択…',
    tplFlowchart: 'フローチャート · 縦',
    tplFlowchartLR: 'フローチャート · 横',
    tplSequence: 'シーケンス図',
    tplGantt: 'ガントチャート',
    tplClass: 'クラス図',
    tplState: 'ステート図',
    tplEr: 'ER 図',
    tplPie: '円グラフ',
    tplMindmap: 'マインドマップ',
    tplTimeline: 'タイムライン',
    tplJourney: 'ユーザージャーニー',
    tplGitGraph: 'Git グラフ',
    tplQuadrant: 'クアドラントチャート',
    tplRequirement: '要件図',
    tplSankey: 'サンキーダイアグラム',
    tplBlock: 'ブロック図',
    themeDefault: 'Default · クラシックブルー',
    themeNeutral: 'Neutral · グレー',
    themeDark: 'Dark · ダーク',
    themeForest: 'Forest · グリーン',
    themeBase: 'Base · ミニマル',
    zoomOut: '縮小',
    zoomIn: '拡大',
    zoomFit: 'フィット',
    zoomOneToOne: '1:1',
    exportSvg: 'SVG エクスポート',
    exportPng: 'PNG エクスポート',
    copyImage: '画像としてコピー',
    copyImageTitle: '現在の図を PNG 画像としてクリップボードにコピー',
    copyImageOk: '画像をクリップボードにコピーしました',
    copyImageToast: 'コピーしました',
    copyImageFail: '画像のコピーに失敗しました',
    statusCopyingImage: '画像をコピー中…',
    copyImageFailDetail: '画像のコピーに失敗しました：{msg}\nHTTPS または localhost でアクセスするか、「PNG エクスポート」をお試しください。',
    toggleHandDrawn: '手描きスタイル',
    toggleGrid: 'グリッド背景',
    previewHint: 'スクロールでズーム · ドラッグで移動 · ダブルクリックでリセット',
    statusReady: '準備完了',
    statusNeedInput: 'Mermaid コードを入力してください',
    statusRendering: 'レンダリング中…',
    statusRenderOk: 'レンダリング完了',
    statusSyntaxError: '構文エラー',
    statusNoExport: 'エクスポートするものはありません',
    statusExportingPng: 'PNG エクスポート中…',
    statusExportedSvg: 'SVG エクスポート完了',
    statusExportedPng: 'PNG エクスポート完了',
    statusExportFail: 'PNG エクスポート失敗',
    exportFailDetail: 'PNG エクスポート失敗：{msg}\n「SVG エクスポート」を使用するか、ブラウザで SVG を開いて PNG として保存してください。',
    langLabel: '言語',
  },
};

const LANG_KEYS = ['zh', 'en', 'ja'];
const LANG_PATHS = { zh: '/zh-CN/', en: '/en/', ja: '/ja/' };

let currentLang = 'zh';

function getLangFromPath() {
  const path = window.location.pathname;
  if (path.startsWith('/en')) return 'en';
  if (path.startsWith('/ja')) return 'ja';
  if (path.startsWith('/zh-CN')) return 'zh';
  const fromHtml = document.documentElement.getAttribute('data-default-lang');
  if (fromHtml && LANG_KEYS.includes(fromHtml)) return fromHtml;
  return null;
}

function detectLang() {
  const fromPath = getLangFromPath();
  if (fromPath) return fromPath;

  const saved = localStorage.getItem('mermaid-lang');
  if (saved && LANG_KEYS.includes(saved)) return saved;

  const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
  if (browserLang.startsWith('ja')) return 'ja';
  if (browserLang.startsWith('en')) return 'en';
  return 'zh';
}

export function getLang() {
  return currentLang;
}

export function getLangPath(lang = currentLang) {
  return LANG_PATHS[lang] || LANG_PATHS.zh;
}

export function setLang(lang) {
  if (!LANG_KEYS.includes(lang)) return;
  localStorage.setItem('mermaid-lang', lang);
  const target = LANG_PATHS[lang];
  if (target && !window.location.pathname.startsWith(target.replace(/\/$/, ''))) {
    window.location.href = target;
    return;
  }
  currentLang = lang;
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang;
  applyTranslations();
  updateLangUI();
}

export function t(key, vars) {
  const str = translations[currentLang]?.[key] || translations.zh[key] || key;
  if (!vars) return str;
  return Object.entries(vars).reduce((s, [k, v]) => s.replace(`{${k}}`, v), str);
}

const langLabels = { zh: '中', en: 'EN', ja: '日' };

export function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n-title]').forEach((el) => {
    const key = el.getAttribute('data-i18n-title');
    el.title = t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = t(key);
  });
}

export function initI18n() {
  currentLang = detectLang();
  localStorage.setItem('mermaid-lang', currentLang);
  document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : currentLang;
  applyTranslations();
  updateLangUI();
}

function updateLangUI() {
  const label = document.getElementById('lang-label');
  if (label) label.textContent = langLabels[currentLang];
  document.querySelectorAll('.lang-option').forEach((el) => {
    el.classList.toggle('active', el.dataset.lang === currentLang);
  });
}
