import mermaid from 'mermaid';
import { t, getLang } from './i18n.js';
import { initHeader } from './header.js';

const DEFAULT_SOURCE = `graph TD
    A[开始] --> B{判断}
    B --> C[是]
    B --> D[否]
    C --> E[结束]
    D --> E`;

const TEMPLATES = {
  flowchart: DEFAULT_SOURCE,
  sequence: `sequenceDiagram
    participant 用户
    participant 系统
    participant 数据库
    用户->>系统: 提交请求
    系统->>数据库: 查询数据
    数据库-->>系统: 返回结果
    系统-->>用户: 展示响应`,
  gantt: `gantt
    title 项目计划
    dateFormat YYYY-MM-DD
    section 设计
    需求分析     :a1, 2025-01-01, 7d
    原型设计     :a2, after a1, 5d
    section 开发
    前端开发     :b1, after a2, 10d
    后端开发     :b2, after a2, 12d
    section 上线
    测试验收     :c1, after b1, 5d
    正式发布     :milestone, after c1, 0d`,
  class: `classDiagram
    class Animal {
        +String name
        +int age
        +makeSound()
    }
    class Dog {
        +String breed
        +bark()
    }
    Animal <|-- Dog`,
  state: `stateDiagram-v2
    [*] --> 待处理
    待处理 --> 进行中: 开始
    进行中 --> 已完成: 完成
    进行中 --> 待处理: 暂停
    已完成 --> [*]`,
  er: `erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE_ITEM : contains
    CUSTOMER {
        string id
        string name
    }
    ORDER {
        string id
        date orderDate
    }`,
  pie: `pie title 市场份额
    "产品 A" : 42
    "产品 B" : 28
    "产品 C" : 18
    "其他" : 12`,
  mindmap: `mindmap
  root((产品规划))
    功能
      用户管理
      权限控制
    技术
      前端
      后端
    运营
      推广
      数据分析`,
  timeline: `timeline
    title 项目里程碑
    2025-01 : 立项
    2025-02 : 设计评审
    2025-03 : 开发完成
    2025-04 : 上线发布`,
  journey: `journey
    title 用户购票旅程
    section 浏览
      打开网站: 5: 用户
      搜索车次: 3: 用户
    section 下单
      选择座位: 4: 用户
      支付订单: 2: 用户, 系统
    section 出行
      收到电子票: 5: 用户, 系统`,
  gitGraph: `gitGraph
    commit id: "init"
    branch develop
    checkout develop
    commit id: "feat-A"
    checkout main
    merge develop id: "release-1.0"
    commit id: "hotfix"`,
  quadrant: `quadrantChart
    title 需求优先级矩阵
    x-axis 低影响 --> 高影响
    y-axis 低紧急 --> 高紧急
    quadrant-1 立即处理
    quadrant-2 计划安排
    quadrant-3 可延后
    quadrant-4 观察评估
    缺陷修复: [0.8, 0.9]
    新功能: [0.7, 0.5]
    文档整理: [0.3, 0.2]`,
  requirement: `requirementDiagram
    requirement user_login {
        id: 1
        text: "支持账号密码登录"
        risk: medium
        verifymethod: test
    }
    element auth_module {
        type: system
    }
    auth_module - satisfies -> user_login`,
  sankey: 'sankey\n\nVisit,Signup,5\nVisit,Leave,20\nSignup,Trial,4\nSignup,Churn,1\nTrial,Pay,3\nTrial,Churn,1',
  block: `block-beta
    columns 3
    A["输入"] B["处理"] C["输出"]
    A --> B
    B --> C`,
  flowchartLR: `flowchart LR
    A[需求] --> B{评审}
    B -->|通过| C[开发]
    B -->|驳回| D[修改]
    D --> B
    C --> E[上线]`,
};

const editor = document.getElementById('editor');
const themeSelect = document.getElementById('theme-select');
const templateSelect = document.getElementById('template-select');
const output = document.getElementById('mermaid-output');
const statusText = document.getElementById('status-text');
const previewViewport = document.getElementById('preview-viewport');
const previewStage = document.getElementById('preview-stage');
const zoomLabel = document.getElementById('zoom-label');
const resizer = document.getElementById('resizer');
const handDrawnToggle = document.getElementById('toggle-handdrawn');
const gridToggle = document.getElementById('toggle-grid');

const uiState = {
  handDrawn: false,
  showGrid: false,
};

const SAFE_FONT_FAMILY = '"Microsoft YaHei", Arial, sans-serif';

const THEME_BACKGROUNDS = {
  default: '#ffffff',
  neutral: '#f8f8f8',
  dark: '#1f2937',
  forest: '#1e1e1e',
  base: '#ffffff',
};

let renderId = 0;
let debounceTimer = null;
let currentSvg = null;

const view = {
  scale: 1,
  x: 0,
  y: 0,
  baseWidth: 0,
  baseHeight: 0,
  minScale: 0.05,
  maxScale: 4,
};

function initMermaid(theme) {
  mermaid.initialize({
    startOnLoad: false,
    theme,
    look: uiState.handDrawn ? 'handDrawn' : 'classic',
    securityLevel: 'loose',
    fontFamily: SAFE_FONT_FAMILY,
  });
}

function setStatus(text, isError = false) {
  statusText.textContent = text;
  statusText.parentElement.classList.toggle('error', isError);
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function showRenderError(message) {
  currentSvg = null;
  view.baseWidth = 0;
  view.baseHeight = 0;
  output.innerHTML = `<div class="render-error" role="alert">
    <p class="render-error-title">${escapeHtml(t('statusSyntaxError'))}</p>
    <pre class="render-error-detail">${escapeHtml(message)}</pre>
  </div>`;
}

let toastTimer = null;

function showToast(message, duration = 2000) {
  let toast = document.getElementById('app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }

  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.remove('is-hiding');
  toast.classList.add('is-visible');

  toastTimer = setTimeout(() => {
    toast.classList.add('is-hiding');
    toast.classList.remove('is-visible');
  }, duration);
}

function cacheSvgBaseSize() {
  if (!currentSvg) return;
  const { width, height } = getSvgDimensions(currentSvg);
  view.baseWidth = width;
  view.baseHeight = height;
  currentSvg.style.maxWidth = 'none';
  currentSvg.style.display = 'block';
}

/** 用 SVG 宽高缩放（矢量清晰），平移仅用 translate，避免 transform: scale 导致发糊 */
function applyTransform() {
  previewStage.style.transform = `translate3d(${view.x}px, ${view.y}px, 0)`;

  if (currentSvg && view.baseWidth > 0 && view.baseHeight > 0) {
    currentSvg.style.width = `${view.baseWidth * view.scale}px`;
    currentSvg.style.height = `${view.baseHeight * view.scale}px`;
  }

  zoomLabel.textContent = `${Math.round(view.scale * 100)}%`;
}

function fitToView() {
  if (!currentSvg || !view.baseWidth || !view.baseHeight) return;
  const vp = previewViewport.getBoundingClientRect();
  const padding = 48;
  const scaleX = (vp.width - padding) / view.baseWidth;
  const scaleY = (vp.height - padding) / view.baseHeight;
  view.scale = Math.min(scaleX, scaleY);
  view.scale = Math.max(view.minScale, Math.min(view.scale, view.maxScale));
  view.x = 0;
  view.y = 0;
  applyTransform();
}

function resetView() {
  view.scale = 1;
  view.x = 0;
  view.y = 0;
  applyTransform();
}

function zoomAt(factor, clientX, clientY) {
  const vpRect = previewViewport.getBoundingClientRect();
  const cx = clientX - vpRect.left - vpRect.width / 2;
  const cy = clientY - vpRect.top - vpRect.height / 2;
  const prev = view.scale;
  view.scale = Math.max(view.minScale, Math.min(view.maxScale, view.scale * factor));
  const ratio = view.scale / prev;
  view.x = cx - (cx - view.x) * ratio;
  view.y = cy - (cy - view.y) * ratio;
  applyTransform();
}

async function renderDiagram() {
  const source = editor.value.trim().replace(/\r\n?/g, '\n');
  const id = ++renderId;

  if (!source) {
    output.innerHTML = '';
    currentSvg = null;
    view.baseWidth = 0;
    view.baseHeight = 0;
    setStatus(t('statusNeedInput'));
    return;
  }

  setStatus(t('statusRendering'));

  try {
    initMermaid(themeSelect.value);
    const { svg } = await mermaid.render(`diagram-${Date.now()}`, source);
    if (id !== renderId) return;

    output.innerHTML = svg;
    currentSvg = output.querySelector('svg');
    view.scale = 1;
    view.x = 0;
    view.y = 0;
    cacheSvgBaseSize();
    setStatus(t('statusRenderOk'));
    requestAnimationFrame(() => {
      applyTransform();
      fitToView();
    });
  } catch (err) {
    if (id !== renderId) return;
    const msg = err?.message || String(err);
    setStatus(t('statusSyntaxError'), true);
    showRenderError(msg);
  }
}

function scheduleRender() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(renderDiagram, 280);
}

function getSvgDimensions(svgElement) {
  const viewBox = svgElement.viewBox?.baseVal;
  if (viewBox && viewBox.width > 0 && viewBox.height > 0) {
    return {
      width: viewBox.width,
      height: viewBox.height,
      minX: viewBox.x,
      minY: viewBox.y,
    };
  }

  const widthAttr = Number.parseFloat(svgElement.getAttribute('width') || '');
  const heightAttr = Number.parseFloat(svgElement.getAttribute('height') || '');
  if (Number.isFinite(widthAttr) && Number.isFinite(heightAttr) && widthAttr > 0 && heightAttr > 0) {
    return { width: widthAttr, height: heightAttr, minX: 0, minY: 0 };
  }

  const box = svgElement.getBoundingClientRect();
  return {
    width: Math.max(box.width, 1),
    height: Math.max(box.height, 1),
    minX: 0,
    minY: 0,
  };
}

function getExportSvgPayload(forPng = false) {
  if (!currentSvg) return null;
  const { width, height, minX, minY } = getSvgDimensions(currentSvg);
  const clone = currentSvg.cloneNode(true);
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  clone.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
  clone.setAttribute('viewBox', `${minX} ${minY} ${width} ${height}`);
  clone.setAttribute('width', `${width}`);
  clone.setAttribute('height', `${height}`);

  prepareSvgForExport(clone, currentSvg, forPng);

  // 彻底移除所有可能的背景矩形
  clone.querySelectorAll('rect').forEach(rect => {
    const fill = (rect.getAttribute('fill') || '').trim().toLowerCase();
    const classes = (rect.className?.baseVal || rect.className?.toString?.() || '').toLowerCase();
    const parentClasses = (rect.parentNode?.className?.baseVal || rect.parentNode?.className?.toString?.() || '').toLowerCase();

    const isBackground =
      classes.includes('background') ||
      parentClasses.includes('background') ||
      fill === '#ffffff' ||
      fill === 'white' ||
      fill === '#fff' ||
      fill === 'rgb(255, 255, 255)' ||
      fill === 'rgba(255, 255, 255, 1)';

    if (isBackground) {
      rect.remove();
    }
  });

  // 添加统一的白色背景矩形
  const svgNs = 'http://www.w3.org/2000/svg';
  const bgRect = document.createElementNS(svgNs, 'rect');
  bgRect.setAttribute('x', String(minX));
  bgRect.setAttribute('y', String(minY));
  bgRect.setAttribute('width', String(width));
  bgRect.setAttribute('height', String(height));
  bgRect.setAttribute('fill', '#ffffff');
  clone.insertBefore(bgRect, clone.firstChild);

  return {
    svg: new XMLSerializer().serializeToString(clone),
    width,
    height,
    background: '#ffffff',
  };
}

const SVG_SHAPE_TAGS = new Set([
  'path',
  'rect',
  'circle',
  'ellipse',
  'polygon',
  'polyline',
  'line',
  'text',
  'tspan',
]);

function getSvgBackgroundColor(svgElement, theme) {
  // 优先使用主题对应的背景颜色，确保导出时背景正确
  if (theme && THEME_BACKGROUNDS[theme]) {
    return THEME_BACKGROUNDS[theme];
  }
  const bgRect =
    svgElement.querySelector('rect.background') ||
    svgElement.querySelector('.background rect') ||
    svgElement.querySelector('g.background > rect');
  if (bgRect) {
    const fill = window.getComputedStyle(bgRect).fill;
    if (fill && fill !== 'none') return fill;
  }
  const bg = window.getComputedStyle(svgElement).backgroundColor;
  if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
    return bg;
  }
  return '#ffffff';
}

function embedComputedStyles(targetRoot, sourceRoot) {
  function walk(source, target) {
    if (!source || !target || source.nodeType !== 1 || target.nodeType !== 1) return;

    const tag = target.tagName.toLowerCase();
    const computed = window.getComputedStyle(source);

    // 跳过所有可能的背景矩形，保持透明
    if (tag === 'rect') {
      const parent = target.parentNode;
      const classes = (target.className?.baseVal || target.className?.toString?.() || '').toLowerCase();
      const parentClasses = (parent?.className?.baseVal || parent?.className?.toString?.() || '').toLowerCase();
      const width = parseFloat(target.getAttribute('width') || '0');
      const height = parseFloat(target.getAttribute('height') || '0');
      const fill = computed.fill || '';

      // 判断是否为背景矩形：
      // 1. 有 background 类名
      // 2. fill 为白色且尺寸较大（可能是背景）
      const isBackground =
        classes.includes('background') ||
        parentClasses.includes('background') ||
        (parent?.tagName?.toLowerCase() === 'g' && parentClasses.includes('background')) ||
        (width > 0 && height > 0 && (fill === '#ffffff' || fill === 'white' || fill === 'rgb(255, 255, 255)'));
      if (isBackground) {
        return;
      }
    }

    if (SVG_SHAPE_TAGS.has(tag)) {
      const fill = computed.fill;
      const stroke = computed.stroke;
      const strokeWidth = computed.strokeWidth;

      if (fill) {
        target.style.fill = fill;
        if (fill !== 'none') target.setAttribute('fill', fill);
      }
      if (stroke && stroke !== 'none') {
        target.style.stroke = stroke;
        target.setAttribute('stroke', stroke);
      } else if (stroke === 'none') {
        target.style.stroke = 'none';
        target.setAttribute('stroke', 'none');
      }
      if (strokeWidth) {
        target.style.strokeWidth = strokeWidth;
        target.setAttribute('stroke-width', strokeWidth);
      }

      const dash = computed.strokeDasharray;
      if (dash && dash !== 'none') {
        target.style.strokeDasharray = dash;
        target.setAttribute('stroke-dasharray', dash);
      }

      const opacity = computed.opacity;
      if (opacity && opacity !== '1') {
        target.style.opacity = opacity;
      }
    }

    if (tag === 'text' || tag === 'tspan') {
      target.style.fill = computed.fill || computed.color;
      target.setAttribute('fill', computed.fill || computed.color);
      target.style.fontFamily = SAFE_FONT_FAMILY;
      target.style.fontSize = computed.fontSize;
      target.style.fontWeight = computed.fontWeight;
      target.setAttribute('font-family', SAFE_FONT_FAMILY);
      if (computed.fontSize) target.setAttribute('font-size', computed.fontSize);
    }

    const sourceChildren = [...source.children];
    const targetChildren = [...target.children];
    sourceChildren.forEach((srcChild, index) => {
      if (targetChildren[index]) walk(srcChild, targetChildren[index]);
    });
  }

  walk(sourceRoot, targetRoot);
}

function convertForeignObjectsToText(svgRoot, sourceSvg) {
  const svgNs = 'http://www.w3.org/2000/svg';
  const sourceFos = [...sourceSvg.querySelectorAll('foreignObject')];
  const cloneFos = [...svgRoot.querySelectorAll('foreignObject')];

  cloneFos.forEach((fo, index) => {
    const sourceFo = sourceFos[index];
    const x = Number.parseFloat(fo.getAttribute('x') || '0');
    const y = Number.parseFloat(fo.getAttribute('y') || '0');
    const width = Number.parseFloat(fo.getAttribute('width') || '0');
    const height = Number.parseFloat(fo.getAttribute('height') || '0');
    const contentRoot = sourceFo?.querySelector('div, span, p') || sourceFo;
    const computed = contentRoot ? window.getComputedStyle(contentRoot) : null;
    const lines = (fo.textContent || '')
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    if (!lines.length) {
      fo.remove();
      return;
    }

    const fontSize = Number.parseFloat(computed?.fontSize || '14') || 14;
    // 如果 computed color 是浅色（接近白色），说明取到了背景色，回退到深色
    let fill = computed?.color || '#333333';
    const rgbMatch = fill?.match?.(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (rgbMatch) {
      const [, r, g, b] = rgbMatch.map(Number);
      if (r > 200 && g > 200 && b > 200) fill = '#333333';
    }
    const text = document.createElementNS(svgNs, 'text');
    const centerX = x + width / 2;

    text.setAttribute('font-family', SAFE_FONT_FAMILY);
    text.setAttribute('font-size', String(fontSize));
    text.setAttribute('fill', fill);
    text.setAttribute('text-anchor', 'middle');

    // 使用 dy 属性进行精确的垂直居中，兼容性更好
    const baselineOffset = fontSize * 0.35; // 近似的基线偏移量

    if (lines.length === 1) {
      text.setAttribute('x', String(centerX));
      // 居中计算：y + height/2 是中心点，加上 baselineOffset 补偿基线到中心的距离
      text.setAttribute('y', String(y + height / 2));
      text.setAttribute('dy', String(baselineOffset));
      text.textContent = lines[0];
    } else {
      const lineHeight = fontSize * 1.2;
      const totalTextHeight = (lines.length - 1) * lineHeight;
      const startY = y + (height - totalTextHeight) / 2;
      lines.forEach((line, lineIndex) => {
        const tspan = document.createElementNS(svgNs, 'tspan');
        tspan.setAttribute('x', String(centerX));
        tspan.setAttribute('y', String(startY + lineIndex * lineHeight));
        tspan.setAttribute('dy', String(baselineOffset));
        tspan.setAttribute('fill', fill);
        tspan.textContent = line;
        text.appendChild(tspan);
      });
    }

    fo.parentNode?.insertBefore(text, fo);
    fo.remove();
  });
}

/** 将当前主题的计算样式写入克隆 SVG，避免导出时丢失主题色 */
function prepareSvgForExport(svgRoot, sourceSvg, forPng) {
  embedComputedStyles(svgRoot, sourceSvg);
  // SVG 和 PNG 导出都需要转换 foreignObject，以确保兼容性和正确的字体显示
  convertForeignObjectsToText(svgRoot, sourceSvg);

  // 特殊处理 Mermaid 的箭头和流程线
  // Mermaid 使用 marker-end 和 CSS 类设置箭头颜色，需要将 marker 中的路径颜色也一并处理
  svgRoot.querySelectorAll('marker path, marker polygon').forEach(path => {
    const computed = window.getComputedStyle(path);
    const fill = computed.fill;
    if (fill) {
      path.setAttribute('fill', fill);
      path.style.fill = fill;
    }
  });

  svgRoot.querySelectorAll('style').forEach((node) => node.remove());
  svgRoot.querySelectorAll('script').forEach((node) => node.remove());

  // 移除 SVG 元素上的所有背景相关样式
  svgRoot.style.removeProperty('background');
  svgRoot.style.removeProperty('background-color');
  svgRoot.style.removeProperty('background-image');
  svgRoot.removeAttribute('style');
}

function downloadDataUrl(dataUrl, filename) {
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function getRasterExportScale() {
  return Math.max(2, window.devicePixelRatio || 1);
}

function drawSvgToCanvas(payload, scale) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const svgBlob = new Blob([payload.svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = Math.ceil(payload.width * scale);
        canvas.height = Math.ceil(payload.height * scale);
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('无法创建画布'));
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.fillStyle = payload.background || '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas);
      } catch (err) {
        reject(err);
      } finally {
        URL.revokeObjectURL(url);
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('SVG 解析失败'));
    };

    img.src = url;
  });
}

function drawSvgToPngDataUrl(payload, scale) {
  return drawSvgToCanvas(payload, scale).then((canvas) => canvas.toDataURL('image/png'));
}

function drawSvgToPngBlob(payload, scale) {
  return drawSvgToCanvas(payload, scale).then(
    (canvas) =>
      new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
          else reject(new Error('无法生成 PNG'));
        }, 'image/png');
      })
  );
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  // 延迟释放，避免少数浏览器在下载任务创建前提前回收 URL。
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

function exportSvg() {
  const payload = getExportSvgPayload(false);
  if (!payload) {
    setStatus(t('statusNoExport'), true);
    return;
  }
  const blob = new Blob([payload.svg], { type: 'image/svg+xml;charset=utf-8' });
  downloadBlob(blob, `mermaid-diagram-${Date.now()}.svg`);
  setStatus(t('statusExportedSvg'));
}

function exportPng(scale = getRasterExportScale()) {
  const payload = getExportSvgPayload(true);
  if (!payload) {
    setStatus(t('statusNoExport'), true);
    return;
  }

  setStatus(t('statusExportingPng'));
  drawSvgToPngDataUrl(payload, scale)
    .then((dataUrl) => {
      downloadDataUrl(dataUrl, `mermaid-diagram-${Date.now()}.png`);
      setStatus(t('statusExportedPng'));
    })
    .catch((err) => {
      const message = err?.message || String(err);
      setStatus(t('exportFailDetail', { msg: message }), true);
    });
}

async function copyImageToClipboard() {
  const payload = getExportSvgPayload(true);
  if (!payload) {
    setStatus(t('statusNoExport'), true);
    return;
  }

  if (!window.isSecureContext || !navigator.clipboard?.write) {
    setStatus(t('copyImageFailDetail', { msg: 'Clipboard API unavailable' }), true);
    return;
  }

  setStatus(t('statusCopyingImage'));
  try {
    const blob = await drawSvgToPngBlob(payload, getRasterExportScale());
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    setStatus(t('copyImageOk'));
    showToast(t('copyImageToast'));
  } catch (err) {
    const message = err?.message || String(err);
    setStatus(t('copyImageFailDetail', { msg: message }), true);
  }
}

function setupPanZoom() {
  let panning = false;
  let startX = 0;
  let startY = 0;
  let startViewX = 0;
  let startViewY = 0;

  previewViewport.addEventListener(
    'wheel',
    (e) => {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.1 : 1 / 1.1;
      zoomAt(factor, e.clientX, e.clientY);
    },
    { passive: false }
  );

  previewViewport.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    panning = true;
    startX = e.clientX;
    startY = e.clientY;
    startViewX = view.x;
    startViewY = view.y;
    previewViewport.classList.add('is-panning');
  });

  window.addEventListener('mousemove', (e) => {
    if (!panning) return;
    view.x = startViewX + (e.clientX - startX);
    view.y = startViewY + (e.clientY - startY);
    applyTransform();
  });

  window.addEventListener('mouseup', () => {
    panning = false;
    previewViewport.classList.remove('is-panning');
  });

  previewViewport.addEventListener('dblclick', () => fitToView());
}

function setupResizer() {
  let dragging = false;

  resizer.addEventListener('mousedown', (e) => {
    dragging = true;
    resizer.classList.add('active');
    e.preventDefault();
  });

  window.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    const workspace = document.querySelector('.workspace');
    const rect = workspace.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    const clamped = Math.min(60, Math.max(20, pct));
    document.documentElement.style.setProperty('--editor-width', `${clamped}%`);
  });

  window.addEventListener('mouseup', () => {
    dragging = false;
    resizer.classList.remove('active');
  });
}

function updateSwitchButtons() {
  handDrawnToggle.classList.toggle('is-active', uiState.handDrawn);
  gridToggle.classList.toggle('is-active', uiState.showGrid);
  previewViewport.classList.toggle('no-grid', !uiState.showGrid);
}

document.getElementById('zoom-in').addEventListener('click', () => {
  const rect = previewViewport.getBoundingClientRect();
  zoomAt(1.2, rect.left + rect.width / 2, rect.top + rect.height / 2);
});

document.getElementById('zoom-out').addEventListener('click', () => {
  const rect = previewViewport.getBoundingClientRect();
  zoomAt(1 / 1.2, rect.left + rect.width / 2, rect.top + rect.height / 2);
});

document.getElementById('zoom-reset').addEventListener('click', fitToView);
document.getElementById('zoom-100').addEventListener('click', resetView);
document.getElementById('copy-image').addEventListener('click', copyImageToClipboard);
document.getElementById('export-svg').addEventListener('click', exportSvg);
document.getElementById('export-png').addEventListener('click', () => exportPng(2));

editor.addEventListener('input', scheduleRender);
editor.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault();
    renderDiagram();
  }
  if (e.key === 'Tab') {
    e.preventDefault();
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    editor.value = `${editor.value.substring(0, start)}  ${editor.value.substring(end)}`;
    editor.selectionStart = editor.selectionEnd = start + 2;
    scheduleRender();
  }
});

themeSelect.addEventListener('change', renderDiagram);

templateSelect.addEventListener('change', () => {
  const key = templateSelect.value;
  if (!key || !TEMPLATES[key]) return;
  editor.value = TEMPLATES[key];
  templateSelect.value = '';
  scheduleRender();
});

handDrawnToggle.addEventListener('click', () => {
  uiState.handDrawn = !uiState.handDrawn;
  updateSwitchButtons();
  renderDiagram();
});

gridToggle.addEventListener('click', () => {
  uiState.showGrid = !uiState.showGrid;
  updateSwitchButtons();
});

window.addEventListener('resize', () => {
  if (currentSvg) fitToView();
});

editor.value = DEFAULT_SOURCE;
initHeader();
initMermaid(themeSelect.value);
setupPanZoom();
setupResizer();
updateSwitchButtons();
applyTransform();
renderDiagram();
