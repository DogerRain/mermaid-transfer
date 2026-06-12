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
let currentLang = 'zh';

function detectLang() {
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

export function setLang(lang) {
  if (!LANG_KEYS.includes(lang)) return;
  currentLang = lang;
  localStorage.setItem('mermaid-lang', lang);
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
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    el.title = t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = t(key);
  });
}

export function initI18n() {
  currentLang = detectLang();
  document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : currentLang;
  applyTranslations();
  updateLangUI();
}

function updateLangUI() {
  const label = document.getElementById('lang-label');
  if (label) label.textContent = langLabels[currentLang];
  document.querySelectorAll('.lang-option').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });
}
