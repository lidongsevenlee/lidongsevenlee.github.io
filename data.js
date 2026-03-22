// ============================================================
//  PERSONAL DATA — Edit this file to customize your portfolio
// ============================================================
const PROFILE = {
  name: "Li Dong",
  alias: "lidongsevenlee",
  title: "Frontend Developer",
  subtitle: "UI Explorer · Creative Coder · Web Craftsman",
  bio: "我热爱构建极致的用户界面，相信好的前端不只是让东西能用，而是让人想用。",
  location: "China",
  avatar: "https://github.com/lidongsevenlee.png",

  social: [
    { name: "GitHub",   icon: "github",   url: "https://github.com/lidongsevenlee" },
    { name: "Email",    icon: "email",    url: "sevenmicelid@gmail.com" },
  ],

  skills: [
    { name: "HTML / CSS",   level: 95, category: "核心" },
    { name: "JavaScript",   level: 90, category: "核心" },
    { name: "Vue / React",  level: 85, category: "框架" },
    { name: "TypeScript",   level: 78, category: "框架" },
    { name: "Node.js",      level: 65, category: "后端" },
    { name: "Figma / 设计", level: 70, category: "工具" },
    { name: "动画 / GSAP",  level: 80, category: "工具" },
    { name: "WebGL / Canvas",level:55, category: "进阶" },
  ],

  projects: [
    {
      name: "Algorithm Roadmap",
      desc: "一个可视化展示算法学习路径的工具，帮助用户更高效地学习算法。",
      tags: ["React", "Canvas", "Vite"],
      link: "https://lidongsevenlee.github.io/algo-roadmap/",
      year: 2026,
    },
    {
      name: "UI Component Lab",
      desc: "从零打造的组件库，包含 60+ 组件，完整 TypeScript 支持。",
      tags: ["React", "TypeScript", "Storybook"],
      link: "#",
      year: 2023,
    },
    {
      name: "Motion Studio",
      desc: "交互式动画编辑器，所见即所得地设计 CSS & GSAP 动画。",
      tags: ["GSAP", "JavaScript", "SVG"],
      link: "#",
      year: 2023,
    },
    {
      name: "Dev Tools Extension",
      desc: "Chrome 插件，为前端开发提升调试效率，已有 2k+ 用户。",
      tags: ["Chrome Extension", "JavaScript"],
      link: "#",
      year: 2022,
    },
  ],

  timeline: [
    { year: "2019", event: "开始学习前端，第一行 HTML" },
    { year: "2020", event: "加入第一家公司，负责 B 端管理系统" },
    { year: "2021", event: "深入 Vue 生态，参与开源组件库建设" },
    { year: "2022", event: "转型创意前端，专注动画与交互体验" },
    { year: "2023", event: "独立开发多个 side project，积累用户" },
    { year: "2024", event: "探索 WebGL / Three.js，持续进化中..." },
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
