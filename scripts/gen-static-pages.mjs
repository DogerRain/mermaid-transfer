import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { headAnalytics } from './head-analytics.mjs';
import { renderAppHeader, BLOG_URL } from './app-header.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const SITE = 'https://mermaid.baimuxym.cn';
const WECHAT_QR_URL =
  'https://rainyudianxx.baimuxym.cn/HelloCoder/home/wuli_HelloCoder.png';

const LANGS = {
  'zh-CN': {
    langPath: '/zh-CN/',
    guidePath: '/zh-CN/guide/',
    aboutPath: '/zh-CN/about/',
    privacyPath: '/zh-CN/privacy/',
    htmlLang: 'zh-CN',
    brand: 'Mermaid 在线渲染',
    navEditor: '打开编辑器',
    navGuide: 'Mermaid 教程',
    navAbout: '关于本站',
    navPrivacy: '隐私政策',
    footerBlog: 'HelloCoder 博客',
    about: {
      title: '关于本站 - Mermaid 在线渲染',
      h1: '关于本站',
      lead: 'Mermaid 在线渲染是一款免费的在线图表编辑器，让你在浏览器中编写 Mermaid 代码并实时预览。',
      sections: [
        {
          h2: '我们提供什么',
          p: '本站提供左右分栏的 Mermaid 编辑体验：左侧编写代码，右侧即时渲染流程图、时序图、甘特图、类图、状态图、ER 图、饼图、思维导图、时间线等多种图表。支持主题切换、手绘风格、缩放平移，以及导出 SVG 与 PNG。',
        },
        {
          h2: '谁在做这个网站',
          p: '本站由 HelloCoder（baimuxym.cn）维护，面向开发者、产品经理与文档写作者，希望降低「用代码画图表」的门槛。我们同时提供多语言界面（中文、English、日本語）与 Mermaid 入门教程。',
        },
        {
          h2: '如何使用',
          p: '打开编辑器即可开始，无需注册或安装。可从模板下拉快速加载示例，也可阅读教程了解语法。你的图表代码在浏览器本地处理，我们不会将内容上传到服务器。',
        },
        {
          h2: '联系我们',
          p: `如有问题、建议或合作意向，请通过 HelloCoder 博客留言：<a href="${BLOG_URL}" target="_blank" rel="noopener noreferrer">${BLOG_URL}</a>。也可扫描下方微信公众号二维码与我们取得联系。`,
        },
        {
          h2: '微信公众号联系我',
          img: {
            src: WECHAT_QR_URL,
            alt: 'HelloCoder 微信公众号二维码',
          },
        },
      ],
    },
    privacy: {
      title: '隐私政策 - Mermaid 在线渲染',
      h1: '隐私政策',
      lead: '我们重视你的隐私。本政策说明 Mermaid 在线渲染（mermaid.baimuxym.cn）如何处理信息。',
      sections: [
        {
          h2: '我们收集什么',
          p: '编辑器在浏览器中运行。你输入的 Mermaid 代码仅用于本地渲染与导出，不会发送到我们的服务器保存。本站当前不要求注册或登录。',
        },
        {
          h2: '分析与广告',
          p: '本站可能在未来接入 Google Analytics 或 Google AdSense 等服务以了解访问情况或展示广告。若启用，相关第三方可能使用 Cookie 并收集匿名使用数据。届时本页将更新具体说明。',
        },
        {
          h2: '第三方链接',
          p: `本站页眉含有指向 HelloCoder 博客（<a href="${BLOG_URL}" target="_blank" rel="noopener noreferrer">${BLOG_URL}</a>）的外部链接。访问第三方网站时，适用该网站的隐私政策。`,
        },
        {
          h2: '政策更新',
          p: '我们可能不时修订本政策。重大变更时会在本页更新日期。继续使用本站即表示你接受修订后的政策。',
        },
        {
          h2: '联系我们',
          p: `对本隐私政策有疑问，请通过博客联系我们：<a href="${BLOG_URL}" target="_blank" rel="noopener noreferrer">${BLOG_URL}</a>`,
        },
      ],
      updated: '最后更新：2025 年 6 月',
    },
  },
  en: {
    langPath: '/en/',
    guidePath: '/en/guide/',
    aboutPath: '/en/about/',
    privacyPath: '/en/privacy/',
    htmlLang: 'en',
    brand: 'Mermaid Online',
    navEditor: 'Open Editor',
    navGuide: 'Mermaid Guide',
    navAbout: 'About',
    navPrivacy: 'Privacy',
    footerBlog: 'HelloCoder Blog',
    about: {
      title: 'About - Mermaid Live Editor',
      h1: 'About This Site',
      lead: 'Mermaid Live Editor is a free online diagram tool that lets you write Mermaid code in the browser and preview it instantly.',
      sections: [
        {
          h2: 'What We Offer',
          p: 'A split-pane editor: code on the left, live preview on the right. Supports flowcharts, sequence diagrams, gantt charts, class diagrams, state diagrams, ER diagrams, pie charts, mind maps, timelines, and more. Switch themes, enable hand-drawn style, zoom and pan the preview, and export SVG or PNG.',
        },
        {
          h2: 'Who Runs This Site',
          p: 'Maintained by HelloCoder (baimuxym.cn) for developers, product managers, and technical writers who want diagram-as-code without friction. The site is available in Chinese, English, and Japanese, with a Mermaid tutorial.',
        },
        {
          h2: 'How to Use',
          p: 'Open the editor and start typing—no sign-up or install required. Load examples from the template dropdown or read the guide for syntax help. Your diagram source is processed locally in the browser; we do not upload it to our servers.',
        },
        {
          h2: 'Contact',
          p: `Questions, feedback, or partnership inquiries: reach us via the HelloCoder blog at <a href="${BLOG_URL}" target="_blank" rel="noopener noreferrer">${BLOG_URL}</a>. You can also scan the WeChat Official Account QR code below.`,
        },
        {
          h2: 'Contact via WeChat Official Account',
          img: {
            src: WECHAT_QR_URL,
            alt: 'HelloCoder WeChat Official Account QR code',
          },
        },
      ],
    },
    privacy: {
      title: 'Privacy Policy - Mermaid Live Editor',
      h1: 'Privacy Policy',
      lead: 'This policy describes how Mermaid Live Editor (mermaid.baimuxym.cn) handles information.',
      sections: [
        {
          h2: 'What We Collect',
          p: 'The editor runs in your browser. Mermaid source you type is used only for local rendering and export; it is not sent to our servers for storage. We do not require registration or login.',
        },
        {
          h2: 'Analytics and Advertising',
          p: 'We may add Google Analytics or Google AdSense in the future to understand traffic or show ads. If enabled, those services may use cookies and collect anonymous usage data. This page will be updated with specifics.',
        },
        {
          h2: 'Third-Party Links',
          p: `The header links to HelloCoder Blog (<a href="${BLOG_URL}" target="_blank" rel="noopener noreferrer">${BLOG_URL}</a>). Third-party sites have their own privacy policies.`,
        },
        {
          h2: 'Policy Updates',
          p: 'We may revise this policy from time to time. Material changes will be reflected on this page. Continued use of the site means you accept the updated policy.',
        },
        {
          h2: 'Contact',
          p: `Privacy questions: contact us via the blog at <a href="${BLOG_URL}" target="_blank" rel="noopener noreferrer">${BLOG_URL}</a>`,
        },
      ],
      updated: 'Last updated: June 2025',
    },
  },
  ja: {
    langPath: '/ja/',
    guidePath: '/ja/guide/',
    aboutPath: '/ja/about/',
    privacyPath: '/ja/privacy/',
    htmlLang: 'ja',
    brand: 'Mermaid オンライン',
    navEditor: 'エディタを開く',
    navGuide: 'Mermaid チュートリアル',
    navAbout: 'このサイトについて',
    navPrivacy: 'プライバシーポリシー',
    footerBlog: 'HelloCoder ブログ',
    about: {
      title: 'このサイトについて - Mermaid オンライン',
      h1: 'このサイトについて',
      lead: 'Mermaid オンラインは、ブラウザで Mermaid コードを書き、リアルタイムでプレビューできる無料のオンラインエディタです。',
      sections: [
        {
          h2: '提供する機能',
          p: '左右分割のエディタで、左にコード、右にプレビューを表示。フローチャート、シーケンス図、ガントチャート、クラス図、状態図、ER 図、円グラフ、マインドマップ、タイムラインなどに対応。テーマ切替、手描きスタイル、ズーム・パン、SVG/PNG エクスポートが可能です。',
        },
        {
          h2: '運営について',
          p: 'HelloCoder（baimuxym.cn）が運営しています。開発者やドキュメント作成者が「コードで図を描く」体験を手軽に使えるよう提供しています。中文・English・日本語の多言語と Mermaid チュートリアルも用意しています。',
        },
        {
          h2: '使い方',
          p: 'エディタを開くだけで利用開始。登録やインストールは不要です。テンプレートから例を読み込むか、チュートリアルで構文を学べます。入力したコードはブラウザ内で処理され、サーバーには送信されません。',
        },
        {
          h2: 'お問い合わせ',
          p: `ご質問・ご意見は HelloCoder ブログからお願いします：<a href="${BLOG_URL}" target="_blank" rel="noopener noreferrer">${BLOG_URL}</a>。下の WeChat 公式アカウントの QR コードからもご連絡いただけます。`,
        },
        {
          h2: 'WeChat 公式アカウントで連絡',
          img: {
            src: WECHAT_QR_URL,
            alt: 'HelloCoder WeChat 公式アカウント QR コード',
          },
        },
      ],
    },
    privacy: {
      title: 'プライバシーポリシー - Mermaid オンライン',
      h1: 'プライバシーポリシー',
      lead: '本ポリシーは Mermaid オンライン（mermaid.baimuxym.cn）における情報の取り扱いを説明します。',
      sections: [
        {
          h2: '収集する情報',
          p: 'エディタはブラウザ上で動作します。入力した Mermaid コードはローカルでの描画・エクスポートにのみ使用され、サーバーに保存されることはありません。登録やログインは不要です。',
        },
        {
          h2: '分析と広告',
          p: '将来、Google Analytics や Google AdSense を導入する場合があります。導入時は Cookie 等により匿名の利用データが収集される可能性があり、本ページを更新してお知らせします。',
        },
        {
          h2: '外部リンク',
          p: `ヘッダーから HelloCoder ブログ（<a href="${BLOG_URL}" target="_blank" rel="noopener noreferrer">${BLOG_URL}</a>）へリンクしています。外部サイトのプライバシーポリシーが適用されます。`,
        },
        {
          h2: 'ポリシーの変更',
          p: '本ポリシーは予告なく改定される場合があります。重要な変更は本ページに反映します。継続利用により改定後のポリシーに同意したものとみなします。',
        },
        {
          h2: 'お問い合わせ',
          p: `プライバシーに関するお問い合わせ：<a href="${BLOG_URL}" target="_blank" rel="noopener noreferrer">${BLOG_URL}</a>`,
        },
      ],
      updated: '最終更新：2025 年 6 月',
    },
  },
};

function renderPage(cfg, dir, pageKey) {
  const page = cfg[pageKey];
  const pageType = pageKey;
  const sections = page.sections
    .map((s) => {
      const p = s.p ? `\n        <p>${s.p}</p>` : '';
      const img = s.img
        ? `\n        <figure class="guide-qrcode"><img src="${s.img.src}" alt="${s.img.alt}" loading="lazy" decoding="async" /></figure>`
        : '';
      return `<section class="guide-section">
        <h2>${s.h2}</h2>${p}${img}
      </section>`;
    })
    .join('\n            ');
  const updated = page.updated ? `<p class="site-updated">${page.updated}</p>` : '';

  return `<!DOCTYPE html>
<html lang="${cfg.htmlLang}" data-default-lang="${dir === 'zh-CN' ? 'zh' : dir}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${page.title}</title>
    <meta name="robots" content="index, follow" />
${headAnalytics}
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="stylesheet" href="/src/guide.css" />
  </head>
  <body>
${renderAppHeader(dir, pageType)}
    <main class="guide-main guide-static">
      <article class="guide-article">
        <header class="guide-article-header">
          <h1>${page.h1}</h1>
          <p class="guide-lead">${page.lead}</p>
        </header>
        <div class="guide-content">
            ${sections}
            ${updated}
        </div>
      </article>
      ${renderFooter(cfg)}
    </main>
    <script type="module">
      import { initHeader } from '/src/header.js';
      initHeader();
    </script>
  </body>
</html>`;
}

function renderFooter(cfg) {
  return `<footer class="site-footer">
        <div class="site-footer-links">
          <a href="${cfg.aboutPath}">${cfg.navAbout}</a>
          <a href="${cfg.privacyPath}">${cfg.navPrivacy}</a>
          <a href="${cfg.guidePath}">${cfg.navGuide}</a>
          <a href="${BLOG_URL}" target="_blank" rel="noopener noreferrer">${cfg.footerBlog}</a>
        </div>
      </footer>`;
}

for (const [dir, cfg] of Object.entries(LANGS)) {
  for (const pageKey of ['about', 'privacy']) {
    const outDir = path.join(root, dir, pageKey);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), renderPage(cfg, dir, pageKey), 'utf8');
  }
}

console.log('Generated static pages: about, privacy (zh-CN, en, ja)');
