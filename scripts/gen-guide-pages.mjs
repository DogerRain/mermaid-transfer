import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const GUIDES = {
  'zh-CN': {
    langPath: '/zh-CN/',
    guidePath: '/zh-CN/guide/',
    htmlLang: 'zh-CN',
    title: 'Mermaid 入门教程 - 流程图、时序图、甘特图语法指南',
    brand: 'Mermaid 在线渲染',
    navEditor: '打开编辑器',
    navGuide: 'Mermaid 教程',
    h1: 'Mermaid 入门教程',
    intro:
      'Mermaid 是一种用纯文本描述图表的语言（Diagram as Code）。你只需编写简单的语法，即可生成流程图、时序图、甘特图等，并导出 SVG / PNG。本教程覆盖最常用的语法与示例，可直接复制到左侧编辑器中试用。',
    tocLabel: '目录',
    tocCollapse: '收起',
    tocExpand: '展开',
    sections: [
      {
        id: 'flowchart',
        h2: '1. 流程图（Flowchart）',
        p: '用 graph 或 flowchart 声明方向：TD（上下）、LR（左右）。节点用方括号 []，判断用花括号 {}。',
        code: `graph TD
    A[开始] --> B{是否通过?}
    B -->|是| C[执行]
    B -->|否| D[结束]
    C --> D`,
      },
      {
        id: 'sequence',
        h2: '2. 时序图（Sequence Diagram）',
        p: '描述对象之间的交互顺序，participant 定义参与者，箭头表示消息。',
        code: `sequenceDiagram
    participant 用户
    participant 系统
    用户->>系统: 登录请求
    系统-->>用户: 返回 Token`,
      },
      {
        id: 'gantt',
        h2: '3. 甘特图（Gantt）',
        p: '用于项目排期，dateFormat 指定日期格式，section 分组任务。',
        code: `gantt
    title 项目计划
    dateFormat YYYY-MM-DD
    section 开发
    需求分析 :a1, 2025-01-01, 7d
    编码实现 :a2, after a1, 10d`,
      },
      {
        id: 'class',
        h2: '4. 类图（Class Diagram）',
        p: '用 classDiagram 描述类、属性、方法及继承关系。',
        code: `classDiagram
    class Animal {
        +String name
        +makeSound()
    }
    class Dog {
        +bark()
    }
    Animal <|-- Dog`,
      },
      {
        id: 'state',
        h2: '5. 状态图（State Diagram）',
        p: '用 stateDiagram-v2 描述状态迁移，[*] 表示起始与终止。',
        code: `stateDiagram-v2
    [*] --> 待处理
    待处理 --> 进行中: 开始
    进行中 --> 已完成: 完成
    已完成 --> [*]`,
      },
      {
        id: 'er',
        h2: '6. ER 图（Entity Relationship）',
        p: '用 erDiagram 描述实体及关系，||--o{ 等符号表示基数。',
        code: `erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE_ITEM : contains
    CUSTOMER {
        string id
        string name
    }`,
      },
      {
        id: 'pie',
        h2: '7. 饼图（Pie Chart）',
        p: '饼图适合展示占比，每项格式为 "标签" : 数值。',
        code: `pie title 市场份额
    "产品 A" : 42
    "产品 B" : 28
    "其他" : 30`,
      },
      {
        id: 'mindmap',
        h2: '8. 思维导图（Mindmap）',
        p: '用 mindmap 表达层级结构，缩进表示子节点。',
        code: `mindmap
  root((产品规划))
    功能
      用户管理
    技术
      前端
      后端`,
      },
      {
        id: 'timeline',
        h2: '9. 时间线（Timeline）',
        p: 'timeline 按时间顺序列出事件，适合里程碑展示。',
        code: `timeline
    title 项目里程碑
    2025-01 : 立项
    2025-02 : 设计评审
    2025-03 : 开发完成
    2025-04 : 上线发布`,
      },
      {
        id: 'journey',
        h2: '10. 用户旅程图（User Journey）',
        p: 'journey 描述用户体验步骤，数字表示满意度（1–5）。',
        code: `journey
    title 用户购票旅程
    section 浏览
      打开网站: 5: 用户
      搜索车次: 3: 用户
    section 下单
      选择座位: 4: 用户
      支付订单: 2: 用户, 系统`,
      },
      {
        id: 'gitgraph',
        h2: '11. Git 分支图（Git Graph）',
        p: 'gitGraph 可视化分支、提交与合并历史。',
        code: `gitGraph
    commit id: "init"
    branch develop
    checkout develop
    commit id: "feat-A"
    checkout main
    merge develop id: "release-1.0"`,
      },
      {
        id: 'quadrant',
        h2: '12. 象限图（Quadrant Chart）',
        p: 'quadrantChart 将事项映射到四象限，坐标 [x, y] 范围 0–1。',
        code: `quadrantChart
    title 需求优先级矩阵
    x-axis 低影响 --> 高影响
    y-axis 低紧急 --> 高紧急
    quadrant-1 立即处理
    quadrant-2 计划安排
    quadrant-3 可延后
    quadrant-4 观察评估
    缺陷修复: [0.8, 0.9]
    新功能: [0.7, 0.5]`,
      },
      {
        id: 'block',
        h2: '13. 块图（Block Diagram）',
        p: 'block-beta 用块与箭头描述系统模块或数据流。',
        code: `block-beta
    columns 3
    A["输入"] B["处理"] C["输出"]
    A --> B
    B --> C`,
      },
      {
        id: 'sankey',
        h2: '14. 桑基图（Sankey）',
        p: '桑基图展示流量分配。以 sankey 开头，下一行起每行写：来源,目标,数值（CSV，行首勿缩进）。节点名建议使用英文或拼音；当前 Mermaid 版本对中文节点名支持不完善。',
        code: `sankey

Visit,Signup,5
Visit,Leave,20
Signup,Trial,4
Trial,Pay,3`,
      },
      {
        id: 'requirement',
        h2: '15. 需求图（Requirement Diagram）',
        p: 'requirementDiagram 描述需求、系统元素及满足关系。',
        code: `requirementDiagram
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
      },
      {
        id: 'tips',
        h2: '16. 实用技巧',
        p: '在本站编辑器中可切换主题、开启手绘风格、滚轮缩放预览，并导出 SVG / PNG。建议先用模板下拉快速加载示例，再逐步修改。',
      },
    ],
    cta: '立即打开编辑器体验',
    previewLabel: '预览',
  },
  en: {
    langPath: '/en/',
    guidePath: '/en/guide/',
    htmlLang: 'en',
    title: 'Mermaid Tutorial - Flowchart, Sequence & Gantt Syntax',
    brand: 'Mermaid Online',
    navEditor: 'Open Editor',
    navGuide: 'Mermaid Guide',
    h1: 'Mermaid Tutorial',
    intro:
      'Mermaid lets you create diagrams from text. This guide covers the most common diagram types with copy-paste examples you can try in the editor.',
    tocLabel: 'Contents',
    tocCollapse: 'Collapse',
    tocExpand: 'Expand',
    sections: [
      {
        id: 'flowchart',
        h2: '1. Flowchart',
        p: 'Use graph or flowchart with TD (top-down) or LR (left-right).',
        code: `graph TD
    A[Start] --> B{OK?}
    B -->|Yes| C[Run]
    B -->|No| D[End]
    C --> D`,
      },
      {
        id: 'sequence',
        h2: '2. Sequence Diagram',
        p: 'Show message order between participants.',
        code: `sequenceDiagram
    participant User
    participant API
    User->>API: Request
    API-->>User: Response`,
      },
      {
        id: 'gantt',
        h2: '3. Gantt Chart',
        p: 'Plan tasks over time with sections and durations.',
        code: `gantt
    title Plan
    dateFormat YYYY-MM-DD
    section Dev
    Analysis :a1, 2025-01-01, 7d
    Coding   :a2, after a1, 10d`,
      },
      {
        id: 'class',
        h2: '4. Class Diagram',
        p: 'Use classDiagram for classes, attributes, methods, and inheritance.',
        code: `classDiagram
    class Animal {
        +String name
        +makeSound()
    }
    class Dog {
        +bark()
    }
    Animal <|-- Dog`,
      },
      {
        id: 'state',
        h2: '5. State Diagram',
        p: 'Use stateDiagram-v2 for states and transitions; [*] is start/end.',
        code: `stateDiagram-v2
    [*] --> Idle
    Idle --> Running: start
    Running --> Done: finish
    Done --> [*]`,
      },
      {
        id: 'er',
        h2: '6. ER Diagram',
        p: 'Use erDiagram for entities and relationships; symbols like ||--o{ show cardinality.',
        code: `erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE_ITEM : contains
    CUSTOMER {
        string id
        string name
    }`,
      },
      {
        id: 'pie',
        h2: '7. Pie Chart',
        p: 'Pie charts show proportions; each item is "label" : value.',
        code: `pie title Market Share
    "Product A" : 42
    "Product B" : 28
    "Other" : 30`,
      },
      {
        id: 'mindmap',
        h2: '8. Mindmap',
        p: 'Use mindmap for hierarchies; indentation defines child nodes.',
        code: `mindmap
  root((Product))
    Features
      Auth
    Tech
      Frontend
      Backend`,
      },
      {
        id: 'timeline',
        h2: '9. Timeline',
        p: 'timeline lists events chronologically—great for milestones.',
        code: `timeline
    title Project Milestones
    2025-01 : Kickoff
    2025-02 : Design Review
    2025-03 : Dev Complete
    2025-04 : Launch`,
      },
      {
        id: 'journey',
        h2: '10. User Journey',
        p: 'journey maps user steps; the number is satisfaction (1–5).',
        code: `journey
    title Booking Flow
    section Browse
      Open site: 5: User
      Search trips: 3: User
    section Checkout
      Select seat: 4: User
      Pay order: 2: User, System`,
      },
      {
        id: 'gitgraph',
        h2: '11. Git Graph',
        p: 'gitGraph visualizes branches, commits, and merges.',
        code: `gitGraph
    commit id: "init"
    branch develop
    checkout develop
    commit id: "feat-A"
    checkout main
    merge develop id: "release-1.0"`,
      },
      {
        id: 'quadrant',
        h2: '12. Quadrant Chart',
        p: 'quadrantChart maps items to four quadrants; coordinates [x, y] range 0–1.',
        code: `quadrantChart
    title Priority Matrix
    x-axis Low Impact --> High Impact
    y-axis Low Urgency --> High Urgency
    quadrant-1 Do Now
    quadrant-2 Schedule
    quadrant-3 Defer
    quadrant-4 Monitor
    Bug fix: [0.8, 0.9]
    New feature: [0.7, 0.5]`,
      },
      {
        id: 'block',
        h2: '13. Block Diagram',
        p: 'block-beta describes modules or data flow with blocks and arrows.',
        code: `block-beta
    columns 3
    A["Input"] B["Process"] C["Output"]
    A --> B
    B --> C`,
      },
      {
        id: 'sankey',
        h2: '14. Sankey Diagram',
        p: 'Start with sankey, then CSV rows: source,target,value (no leading spaces). Use English node names.',
        code: `sankey

Visit,Signup,5
Visit,Leave,20
Signup,Trial,4
Trial,Pay,3`,
      },
      {
        id: 'requirement',
        h2: '15. Requirement Diagram',
        p: 'requirementDiagram links requirements to system elements.',
        code: `requirementDiagram
    requirement user_login {
        id: 1
        text: Support password login
        risk: medium
        verifymethod: test
    }
    element auth_module {
        type: system
    }
    auth_module - satisfies -> user_login`,
      },
      {
        id: 'tips',
        h2: '16. Tips',
        p: 'Switch themes, hand-drawn style, zoom the preview, and export SVG/PNG in the editor.',
      },
    ],
    cta: 'Try the Editor',
    previewLabel: 'Preview',
  },
  ja: {
    langPath: '/ja/',
    guidePath: '/ja/guide/',
    htmlLang: 'ja',
    title: 'Mermaid チュートリアル - フローチャート・シーケンス図・ガントチャート',
    brand: 'Mermaid オンライン',
    navEditor: 'エディタを開く',
    navGuide: 'Mermaid チュートリアル',
    h1: 'Mermaid チュートリアル',
    intro:
      'Mermaid はテキストで図を記述する言語です。フローチャート、シーケンス図、ガントチャートなどの基本構文と例を紹介します。',
    tocLabel: '目次',
    tocCollapse: '閉じる',
    tocExpand: '開く',
    sections: [
      {
        id: 'flowchart',
        h2: '1. フローチャート',
        p: 'graph / flowchart と TD（縦）または LR（横）を使います。',
        code: `graph TD
    A[開始] --> B{判定}
    B -->|はい| C[実行]
    B -->|いいえ| D[終了]`,
      },
      {
        id: 'sequence',
        h2: '2. シーケンス図',
        p: 'participant で参加者を定義し、矢印でメッセージを表します。',
        code: `sequenceDiagram
    participant ユーザー
    participant API
    ユーザー->>API: リクエスト
    API-->>ユーザー: レスポンス`,
      },
      {
        id: 'gantt',
        h2: '3. ガントチャート',
        p: 'dateFormat と section でスケジュールを記述します。',
        code: `gantt
    title 計画
    dateFormat YYYY-MM-DD
    section 開発
    分析 :a1, 2025-01-01, 7d
    実装 :a2, after a1, 10d`,
      },
      {
        id: 'class',
        h2: '4. クラス図',
        p: 'classDiagram でクラス・属性・継承を表現します。',
        code: `classDiagram
    class Animal {
        +String name
        +makeSound()
    }
    class Dog {
        +bark()
    }
    Animal <|-- Dog`,
      },
      {
        id: 'state',
        h2: '5. 状態図',
        p: 'stateDiagram-v2 で状態遷移を記述します。[*] は開始・終了です。',
        code: `stateDiagram-v2
    [*] --> 待機
    待機 --> 実行中: 開始
    実行中 --> 完了: 終了
    完了 --> [*]`,
      },
      {
        id: 'er',
        h2: '6. ER 図',
        p: 'erDiagram でエンティティとリレーションを定義します。',
        code: `erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE_ITEM : contains
    CUSTOMER {
        string id
        string name
    }`,
      },
      {
        id: 'pie',
        h2: '7. 円グラフ',
        p: 'pie で構成比を表現します。"ラベル" : 数値 の形式です。',
        code: `pie title シェア
    "A" : 40
    "B" : 35
    "C" : 25`,
      },
      {
        id: 'mindmap',
        h2: '8. マインドマップ',
        p: 'mindmap で階層構造を表現します。インデントで子ノードを示します。',
        code: `mindmap
  root((製品))
    機能
      認証
    技術
      フロント
      バック`,
      },
      {
        id: 'timeline',
        h2: '9. タイムライン',
        p: 'timeline で時系列のイベントやマイルストーンを列挙します。',
        code: `timeline
    title マイルストーン
    2025-01 : キックオフ
    2025-02 : 設計レビュー
    2025-03 : 開発完了
    2025-04 : リリース`,
      },
      {
        id: 'journey',
        h2: '10. ユーザージャーニー',
        p: 'journey でユーザー体験を記述します。数値は満足度（1–5）です。',
        code: `journey
    title 予約フロー
    section 閲覧
      サイトを開く: 5: ユーザー
      検索する: 3: ユーザー
    section 購入
      座席選択: 4: ユーザー
      支払い: 2: ユーザー, システム`,
      },
      {
        id: 'gitgraph',
        h2: '11. Git グラフ',
        p: 'gitGraph でブランチ・コミット・マージを可視化します。',
        code: `gitGraph
    commit id: "init"
    branch develop
    checkout develop
    commit id: "feat-A"
    checkout main
    merge develop id: "release-1.0"`,
      },
      {
        id: 'quadrant',
        h2: '12. クアドラントチャート',
        p: 'quadrantChart で四象限に項目を配置します。座標 [x, y] は 0–1 です。',
        code: `quadrantChart
    title 優先度マトリクス
    x-axis 低影響 --> 高影響
    y-axis 低緊急 --> 高緊急
    quadrant-1 即対応
    quadrant-2 計画
    quadrant-3 延期
    quadrant-4 監視
    バグ修正: [0.8, 0.9]
    新機能: [0.7, 0.5]`,
      },
      {
        id: 'block',
        h2: '13. ブロック図',
        p: 'block-beta でモジュールやデータフローを表現します。',
        code: `block-beta
    columns 3
    A["入力"] B["処理"] C["出力"]
    A --> B
    B --> C`,
      },
      {
        id: 'sankey',
        h2: '14. サンキーダイアグラム',
        p: 'sankey の後に CSV（source,target,value）で記述。ノード名は英字推奨（日本語・中国語は一部バージョンで未対応）。',
        code: `sankey

Visit,Signup,5
Visit,Leave,20
Signup,Trial,4
Trial,Pay,3`,
      },
      {
        id: 'requirement',
        h2: '15. 要件図',
        p: 'requirementDiagram で要件とシステム要素の関係を記述します。',
        code: `requirementDiagram
    requirement user_login {
        id: 1
        text: "パスワード認証をサポート"
        risk: medium
        verifymethod: test
    }
    element auth_module {
        type: system
    }
    auth_module - satisfies -> user_login`,
      },
      {
        id: 'tips',
        h2: '16. ヒント',
        p: 'エディタでテーマ切替、手描きスタイル、ズーム、SVG/PNG エクスポートが利用できます。',
      },
    ],
    cta: 'エディタで試す',
    previewLabel: 'プレビュー',
  },
};

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function tocTitle(h2) {
  return h2.replace(/^\d+\.\s*/, '');
}

function tocNumber(index, htmlLang) {
  const n = index + 1;
  if (htmlLang === 'zh-CN') return `${n}、`;
  return `${n}.`;
}

const TOC_LIST_ICON = `<svg class="guide-toc-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2 4h12M2 8h12M2 12h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <circle cx="13" cy="12" r="1" fill="currentColor"/>
          </svg>`;

function renderSidebar(cfg) {
  const items = cfg.sections
    .map(
      (s, i) => `              <li class="guide-toc-item">
                <a class="guide-toc-link" href="#${s.id}" data-section="${s.id}">
                  <span class="guide-toc-marker" aria-hidden="true"><span class="guide-toc-dot"></span></span>
                  <span class="guide-toc-label"><span class="guide-toc-num">${tocNumber(i, cfg.htmlLang)}</span>${tocTitle(s.h2)}</span>
                </a>
              </li>`,
    )
    .join('\n');

  return `      <aside class="guide-sidebar" id="guide-sidebar">
        <div class="guide-sidebar-panel">
          <div class="guide-toc-header">
            <div class="guide-toc-title">
              ${TOC_LIST_ICON}
              <span class="guide-toc-heading">${cfg.tocLabel}</span>
            </div>
            <button type="button" class="guide-toc-toggle" id="guide-toc-toggle" aria-expanded="true" aria-controls="guide-toc-list" data-collapse="${cfg.tocCollapse}" data-expand="${cfg.tocExpand}">${cfg.tocCollapse}</button>
          </div>
          <nav class="guide-toc" aria-label="${cfg.tocLabel}">
            <ol class="guide-toc-list" id="guide-toc-list">
${items}
            </ol>
          </nav>
        </div>
      </aside>`;
}

function renderGuide(cfg) {
  const sections = cfg.sections
    .map((s) => {
      const codeBlock = s.code
        ? `<div class="guide-demo">
        <pre class="guide-code"><code>${escapeHtml(s.code)}</code></pre>
        <p class="guide-preview-label">${cfg.previewLabel}</p>
        <div class="guide-preview" role="img" aria-label="${cfg.previewLabel}"></div>
      </div>`
        : '';
      return `<section class="guide-section" id="${s.id}">
        <h2>${s.h2}</h2>
        <p>${s.p}</p>
        ${codeBlock}
      </section>`;
    })
    .join('\n');

  return `<!DOCTYPE html>
<html lang="${cfg.htmlLang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${cfg.title}</title>
    <meta name="robots" content="index, follow" />
    <meta name="google-site-verification" content="i_rImxUz8IK5zedSClxerX-sEpZs_T1oRE2S15KqdxA" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="stylesheet" href="/src/guide.css" />
  </head>
  <body>
    <header class="guide-header">
      <a class="guide-brand" href="${cfg.langPath}">${cfg.brand}</a>
      <nav class="guide-nav">
        <a class="guide-nav-link is-active" href="${cfg.guidePath}">${cfg.navGuide}</a>
        <a class="guide-nav-link guide-nav-cta" href="${cfg.langPath}">${cfg.navEditor}</a>
      </nav>
    </header>
    <div class="guide-shell">
${renderSidebar(cfg)}
      <main class="guide-main">
        <article class="guide-article">
          <header class="guide-article-header">
            <h1>${cfg.h1}</h1>
            <p class="guide-lead">${cfg.intro}</p>
          </header>
          <div class="guide-content">
            ${sections}
            <p class="guide-cta-wrap">
              <a class="guide-cta" href="${cfg.langPath}">${cfg.cta}</a>
            </p>
          </div>
        </article>
      </main>
    </div>
    <script type="module" src="/src/guide.js"></script>
  </body>
</html>`;
}

for (const [dir, cfg] of Object.entries(GUIDES)) {
  const outDir = path.join(root, dir, 'guide');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), renderGuide(cfg), 'utf8');
}

console.log('Generated guide pages: zh-CN, en, ja');
