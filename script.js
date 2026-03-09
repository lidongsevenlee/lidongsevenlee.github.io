const posts = [
  {
    issue: "Issue 04",
    date: "2026.03.09",
    category: "Design",
    title: "为什么博客首页应该像一台机器，而不是一个模板",
    excerpt:
      "如果首页只是信息堆叠，记忆点会非常弱。给内容一个物理隐喻，读者会更容易记住节奏、结构和气质。",
    href: "#posts",
  },
  {
    issue: "Issue 03",
    date: "2026.02.17",
    category: "Life",
    title: "慢速输出：把随手记录整理成真正可读的纸面",
    excerpt:
      "写作不是生产更多段落，而是筛掉杂音。像打印一样，一行一行确认内容，页面自然会稳定下来。",
    href: "#posts",
  },
  {
    issue: "Issue 02",
    date: "2026.01.28",
    category: "Notes",
    title: "米色界面为什么比纯白更适合长时间阅读",
    excerpt:
      "纯白很干净，但也更容易像空白画布。暖色纸感会给页面一种已有时间沉淀的重量。",
    href: "#notes",
  },
];

const postList = document.querySelector("#post-list");
const menuButtons = document.querySelectorAll(".menu-button");

if (postList) {
  postList.innerHTML = posts
    .map(
      (post) => `
        <article class="post-card">
          <div class="post-meta">
            <span>${post.issue}</span>
            <span>${post.date}</span>
            <span>${post.category}</span>
          </div>
          <h3>${post.title}</h3>
          <p>${post.excerpt}</p>
          <a class="post-link" href="${post.href}">Continue Reading</a>
        </article>
      `
    )
    .join("");
}

menuButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.dataset.target;
    const target = document.getElementById(targetId);

    menuButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const activeId = entry.target.id;
      menuButtons.forEach((button) => {
        button.classList.toggle("is-active", button.dataset.target === activeId);
      });
    });
  },
  {
    rootMargin: "-25% 0px -55% 0px",
    threshold: 0.1,
  }
);

document.querySelectorAll(".section-target").forEach((section) => observer.observe(section));
