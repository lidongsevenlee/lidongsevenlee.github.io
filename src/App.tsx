import { ArrowUpRight, Github, Mail, MapPin, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import BlurReveal from "./BlurReveal";
import { SpotifyCard } from "./SpotifyCard";
import { LabelInput } from "./LabelInput";
import AnimatedGradient, { PRESETS } from "./AnimatedGradient";
import { Signature } from "./Signature";

/* ── Theme hook ── */
function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    return (document.documentElement.getAttribute("data-theme") as "light" | "dark") || "light";
  });

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    setTheme(next);
  };

  return { theme, toggle };
}

const SEED_HERO = Math.floor(Math.random() * 9999999999);
const SEED_WORK = Math.floor(Math.random() * 9999999999);
const SEED_ABOUT = Math.floor(Math.random() * 9999999999);

const skills = [
  "React",
  "TypeScript",
  "Design Systems",
  "Animation",
  "Frontend Architecture",
  "Creative UI",
];

const projects = [
  {
    name: "Algorithm Roadmap",
    label: "Featured",
    output: 96,
    desc: "把算法学习路径做成可视化地图，强化知识结构、学习节奏与持续反馈。",
    tags: ["React", "Canvas", "Vite"],
    href: "/algo-roadmap/",
  },
  {
    name: "UI Component Lab",
    label: "Project",
    output: 213,
    desc: "围绕组件 API、一致性和可复用性进行系统化实验，构建设计语言。",
    tags: ["React", "TypeScript", "Storybook"],
    href: "https://github.com/lidongsevenlee",
  },
  {
    name: "Motion Studio",
    label: "Project",
    output: 317,
    desc: "探索把动效从实现细节提升为可协作、可讨论的界面语言。",
    tags: ["GSAP", "SVG", "Interaction"],
    href: "https://github.com/lidongsevenlee",
  },
];

const features = [
  { icon: "⬡", title: "Component Systems", desc: "设计一致、可扩展的组件架构，让界面增长而不失控。" },
  { icon: "◈", title: "Motion Design", desc: "把动效纳入设计语言，而不是事后添加的装饰层。" },
  { icon: "◉", title: "Creative Engineering", desc: "在工程约束与创意表达之间找到最优解，做出有记忆点的产品。" },
  { icon: "⬙", title: "Design Systems", desc: "从 token 到文档，建立跨团队一致使用的设计系统基础。" },
  { icon: "◈", title: "Frontend Architecture", desc: "选对技术栈、拆对模块边界，让代码库能随产品一起演进。" },
  { icon: "⬡", title: "Interaction Polish", desc: "关注每一个状态切换、每一帧过渡，把好用变成好看且好用。" },
];

export default function App() {
  const { theme, toggle } = useTheme();

  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      {/* ── LEAVES VIDEO BG ── */}
      <video
        id="leaves-overlay"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "top",
          mixBlendMode: "multiply",
          pointerEvents: "none",
          zIndex: 5,
          opacity: theme === "dark" ? 0 : 0.9,
          transition: "opacity 700ms ease",
        }}
      >
        <source src="/leaves.mp4" type="video/mp4" />
      </video>

      {/* ── NAV ── */}
      <nav className="topnav">
        <BlurReveal delay={0} duration={0.5}>
          <span className="topnav-brand">lidongsevenlee</span>
        </BlurReveal>
        <div className="topnav-links">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href="https://github.com/lidongsevenlee" target="_blank" rel="noreferrer">GitHub</a>
        </div>
        <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
          {theme === "dark" ? <Sun size={11} /> : <Moon size={11} />}
        </button>
      </nav>

      {/* ── HERO ── */}
      <div className="hero-row">
        <div className="hero-left">
          <BlurReveal delay={0.05} duration={0.55}>
            <div className="hero-eyebrow">
              <div className="status-dot" />
              <span className="eyebrow-text">Frontend Developer · Shanghai</span>
            </div>
          </BlurReveal>
          <BlurReveal delay={0.15} duration={0.6}>
            <h1 className="hero-title">
              Frontend<br />
              <em>Developer</em>
            </h1>
          </BlurReveal>
          <BlurReveal delay={0.25} duration={0.6}>
            <p className="hero-desc">
              把产品想法做成真实可用、富有质感的界面。
              专注组件系统、交互动效与创意前端实现——
              在工程约束与视觉表达之间找到最优解。
            </p>
          </BlurReveal>
          <BlurReveal delay={0.35} duration={0.6}>
            <div className="hero-actions">
              <a href="/algo-roadmap/" className="btn btn-filled">
                查看项目 <ArrowUpRight size={11} />
              </a>
              <a href="mailto:sevenmicelid@gmail.com" className="btn">
                联系我 <Mail size={11} />
              </a>
            </div>
          </BlurReveal>
        </div>
        <div className="hero-right">
          <BlurReveal delay={0.1} duration={0.5}>
            <div className="hero-right-label">Skills &amp; Focus</div>
          </BlurReveal>
          {skills.map((skill, i) => (
            <BlurReveal key={skill} delay={0.15 + i * 0.06} duration={0.5}>
              <div className="skill-item">
                <span>{skill}</span>
                <span className="skill-num">{String(i + 1).padStart(2, "0")}</span>
              </div>
            </BlurReveal>
          ))}
          <BlurReveal delay={0.55} duration={0.5}>
            <div className="hero-location">
              <MapPin size={11} />
              <span>Shanghai, China</span>
            </div>
          </BlurReveal>
          <BlurReveal delay={0.65} duration={0.5}>
            <div style={{ marginTop: 16 }}>
              <SpotifyCard url="https://open.spotify.com/track/2OZVskV28xxJjjhQqKTLSg" />
            </div>
          </BlurReveal>
        </div>
      </div>

      {/* OUTPUT line */}
      <div className="section-row">
        <span className="section-aux">OUTPUT {SEED_HERO % 512} &nbsp; SEED: {SEED_HERO}</span>
      </div>

      {/* ── WORK ── */}
      <BlurReveal delay={0} duration={0.5}>
        <div className="section-row" id="work">
          <span className="section-label">Selected Work</span>
          <span className="section-aux">{projects.length} projects</span>
        </div>
      </BlurReveal>

      {projects.map((p, i) => (
        <BlurReveal key={p.name} delay={i * 0.1} duration={0.55}>
          <div className="project-row" style={{ alignItems: "center" }}>
            {/* index — hidden on mobile, shown inside card instead */}
            <div className="project-index project-index-desktop">{String(i + 1).padStart(2, "0")}</div>
            {/* AnimatedGradient card */}
            <a
              href={p.href}
              target={p.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="project-gradient-card"
            >
              <AnimatedGradient config={{ preset: PRESETS[i % PRESETS.length] }} radius="12px" />
              {/* dark overlay for contrast */}
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 0, borderRadius: 12 }} />
              <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", height: "100%", width: "100%" }}>
                {/* left: index (mobile) + label + name */}
                <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
                  <div className="project-index-mobile">{String(i + 1).padStart(2, "0")}</div>
                  <div className="project-label" style={{ color: "rgba(255,255,255,0.6)" }}>{p.label}</div>
                  <div className="project-name" style={{ color: "#fff" }}>{p.name}</div>
                </div>
                {/* right: tags */}
                <div className="project-tags" style={{ flexShrink: 0, display: "flex", flexDirection: "row", alignItems: "center", gap: 4, marginLeft: "auto" }}>
                  {p.tags.map((t) => <span key={t} className="tag" style={{ borderColor: "rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.75)" }}>{t}</span>)}
                </div>
              </div>
            </a>
            {/* Open button — desktop only */}
            <div className="project-open project-open-desktop" style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <a
                href={p.href}
                target={p.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="open-link"
              >
                Open <ArrowUpRight size={10} />
              </a>
            </div>
          </div>
        </BlurReveal>
      ))}

      {/* OUTPUT line */}
      <div className="section-row">
        <span className="section-aux">OUTPUT {SEED_WORK % 512} &nbsp; SEED: {SEED_WORK}</span>
      </div>

      {/* ── CAPABILITIES ── */}
      <BlurReveal delay={0} duration={0.5}>
        <div className="section-row">
          <span className="section-label">Capabilities</span>
          <span className="section-aux">6 focus areas</span>
        </div>
      </BlurReveal>
      <div className="features-grid-section">
        {features.map((f, i) => (
          <BlurReveal key={f.title} delay={i * 0.08} duration={0.5}>
            <div className="feature-cell">
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <p className="feature-desc">{f.desc}</p>
            </div>
          </BlurReveal>
        ))}
      </div>

      {/* OUTPUT line */}
      <div className="section-row">
        <span className="section-aux">OUTPUT {SEED_ABOUT % 512} &nbsp; SEED: {SEED_ABOUT}</span>
      </div>

      {/* ── ABOUT + CONTACT ── */}
      <div className="about-row" id="about">
        <div className="about-left">
          <BlurReveal delay={0} duration={0.5}>
            <div className="about-eyebrow">About</div>
          </BlurReveal>
          <BlurReveal delay={0.1} duration={0.6}>
            <h2 className="about-title">
              把想法变成<br />
              <em style={{ fontStyle: "italic" }}>有质感的界面</em>
            </h2>
          </BlurReveal>
          <BlurReveal delay={0.2} duration={0.6}>
            <p className="about-body">
              前端开发者，上海。专注于把产品概念落地为真实可交互的界面——
              从 UI 组件系统的设计，到动效语言的建立，再到整体前端架构的选型。
            </p>
          </BlurReveal>
          <BlurReveal delay={0.3} duration={0.6}>
            <p className="about-body">
              相信好的前端工程师不只是实现设计稿，而是理解设计意图、
              在代码层面找到最优表达，让产品在细节处有记忆点。
            </p>
          </BlurReveal>
          <BlurReveal delay={0.38} duration={0.55}>
            <Signature
              text="sevenlee"
              fontSize={52}
              duration={1.8}
              delay={0.2}
              inView
              once
              color="var(--accent, #3a6b78)"
            />
          </BlurReveal>
          <BlurReveal delay={0.45} duration={0.5}>
            <div className="social-row">
              <a href="https://github.com/lidongsevenlee" target="_blank" rel="noreferrer" className="social-link">
                <Github size={11} /> GitHub
              </a>
              <a href="mailto:sevenmicelid@gmail.com" className="social-link">
                <Mail size={11} /> Email
              </a>
            </div>
          </BlurReveal>
        </div>
        <div className="contact-panel" id="contact">
          <BlurReveal delay={0.1} duration={0.5}>
            <div className="contact-heading">Quick Contact</div>
          </BlurReveal>
          <BlurReveal delay={0.18} duration={0.5}>
            <div className="contact-field">
              <LabelInput id="contact-name" label="你的称呼" />
            </div>
          </BlurReveal>
          <BlurReveal delay={0.25} duration={0.5}>
            <div className="contact-field">
              <LabelInput id="contact-email" label="邮箱 / 微信" />
            </div>
          </BlurReveal>
          <BlurReveal delay={0.33} duration={0.5}>
            <div style={{ marginTop: 20 }}>
              <button className="btn btn-filled" style={{ width: "100%", justifyContent: "center" }}>
                发起合作沟通 <ArrowUpRight size={11} />
              </button>
            </div>
          </BlurReveal>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="site-footer">
        <BlurReveal delay={0} duration={0.5}>
          <span className="footer-text">© 2026 lidongsevenlee</span>
        </BlurReveal>
        <BlurReveal delay={0.1} duration={0.5}>
          <span className="footer-text">Frontend Developer · Shanghai</span>
        </BlurReveal>
      </footer>
    </div>
  );
}
