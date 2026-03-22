// ============================================================
//  PERSONAL DATA — Edit this file to customize your portfolio
// ============================================================
const PROFILE = {
  name: "Li Dong",
  alias: "lidongsevenlee",
  title: "Frontend Developer",
  subtitle: "UI Systems Builder · Interaction Designer · Creative Frontend Engineer",
  bio: "我专注于把产品想法变成有辨识度、可落地、且让人愿意停留的界面体验。比起“把页面写出来”，我更在意信息层次、交互质感和长期可维护性。",
  summary: "擅长把复杂需求整理成清晰的交互结构，再用细腻的视觉和动效把体验打磨完整。",
  focus: "目前持续投入在 React / TypeScript / 动效系统 / 设计工程化，希望参与更强调产品体验与前端品质的团队。",
  status: "Open to frontend opportunities, freelance collaborations, and product-minded side projects.",
  location: "Shanghai, China",
  avatar: "https://github.com/lidongsevenlee.png",
  metrics: [
    { value: "6", label: "visual themes prototyped for this site" },
    { value: "60+", label: "UI components explored across side projects" },
    { value: "3", label: "core strengths: craft, motion, maintainability" },
  ],

  social: [
    {
      name: "GitHub",
      icon: "github",
      url: "https://github.com/lidongsevenlee",
      display: "@lidongsevenlee",
      note: "代码、实验项目与持续迭代记录"
    },
    {
      name: "Email",
      icon: "email",
      url: "mailto:sevenmicelid@gmail.com",
      display: "sevenmicelid@gmail.com",
      note: "适合工作合作、项目沟通与快速联系"
    },
  ],

  skills: [
    { name: "HTML / CSS", level: 95, category: "核心" },
    { name: "JavaScript", level: 90, category: "核心" },
    { name: "Vue / React", level: 86, category: "框架" },
    { name: "TypeScript", level: 82, category: "框架" },
    { name: "Node.js", level: 68, category: "后端" },
    { name: "Figma / Design", level: 74, category: "工具" },
    { name: "Motion / GSAP", level: 84, category: "工具" },
    { name: "WebGL / Canvas", level: 60, category: "进阶" },
  ],

  projects: [
    {
      name: "Algorithm Roadmap",
      desc: "一个把算法学习路径做成可视化地图的工具，帮助用户理解知识结构、安排节奏，并减少“知道很多概念但不知道先学什么”的迷茫感。",
      tags: ["React", "Canvas", "Vite"],
      link: "https://lidongsevenlee.github.io/algo-roadmap/",
      year: 2026,
      highlight: "从信息架构和视觉层级出发，把抽象学习路线变成更容易坚持的交互体验。",
      featured: true,
    },
    {
      name: "UI Component Lab",
      desc: "从零构建的组件实验场，覆盖表单、导航、反馈与布局模块，重点验证组件 API、一致性设计和 TypeScript 体验。",
      tags: ["React", "TypeScript", "Storybook"],
      link: "#",
      year: 2023,
      highlight: "更关注组件质量和可复用性，而不是只把样式堆出来。",
    },
    {
      name: "Motion Studio",
      desc: "交互式动画编辑器原型，尝试用可视化方式组织 CSS 与 GSAP 动画，让非技术同学也能更直观地参与效果调整。",
      tags: ["GSAP", "JavaScript", "SVG"],
      link: "#",
      year: 2023,
      highlight: "把动效从“开发细节”提升为可以协作讨论的设计语言。",
    },
    {
      name: "Dev Tools Extension",
      desc: "用于提升前端调试效率的 Chrome 扩展，围绕信息读取、样式定位和开发流畅度做过多轮迭代。",
      tags: ["Chrome Extension", "JavaScript"],
      link: "#",
      year: 2022,
      highlight: "关注真实开发场景里的效率提升，而不是只做概念功能。",
    },
  ],

  timeline: [
    { year: "2019", event: "开始系统学习前端，从 HTML / CSS / JavaScript 打基础" },
    { year: "2020", event: "进入团队项目，负责 B 端系统页面与交互实现" },
    { year: "2021", event: "深入 Vue 生态，也开始关注组件抽象与工程化问题" },
    { year: "2022", event: "把重心转向体验和表现力，持续练习动画与叙事式界面" },
    { year: "2023", event: "独立开发多个 side project，打磨从想法到上线的完整链路" },
    { year: "2024", event: "继续向创意前端与更复杂的视觉交互拓展，探索 Canvas / WebGL" },
  ],

  // RPG 属性
  rpg: {
    class: "Frontend Mage",
    level: 7,
    hp: 88,
    mp: 95,
    stats: {
      "创造力 CRE": 92,
      "代码力 COD": 85,
      "审美力 AES": 78,
      "调试力 DBG": 88,
      "沟通力 COM": 72,
      "学习力 LRN": 95,
    },
    achievements: [
      { name: "像素完美", desc: "像素级还原设计稿 100 次" },
      { name: "零 BUG 上线", desc: "连续三次发布无线上事故" },
      { name: "开源贡献者", desc: "PR 被主流开源项目合并" },
      { name: "动画大师", desc: "制作超过 50 个自定义动画" },
    ],
  },
};
