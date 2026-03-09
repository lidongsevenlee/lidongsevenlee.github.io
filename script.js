const posts = [
  {
    issue: "2023 - 至今",
    date: "上海 / 远程协作",
    category: "产品与体验",
    title: "高级产品设计 / 前端体验设计",
    excerpt:
      "负责品牌官网、活动页与内容型站点的体验设计和前端落地，覆盖需求梳理、视觉方案、交互细节与上线交付。",
    href: "#contact",
  },
  {
    issue: "2020 - 2023",
    date: "广州",
    category: "数字产品",
    title: "产品设计师",
    excerpt:
      "参与企业官网、营销中台与活动运营页面设计，输出设计规范、组件策略与关键页面原型，提升交付效率与界面一致性。",
    href: "#notes",
  },
  {
    issue: "2017 - 2020",
    date: "深圳",
    category: "品牌与视觉",
    title: "视觉设计师",
    excerpt:
      "负责线上品牌传播与专题页面设计，积累从视觉表达、信息层次到商业落地的完整经验。",
    href: "#about",
  },
];

const postList = document.querySelector("#post-list");
const menuButtons = document.querySelectorAll(".menu-button");
const pages = document.querySelectorAll(".page-screen");
const themeToggle = document.querySelector("#theme-toggle");
const themeToggleLabel = document.querySelector(".theme-toggle-label");
const statusLabel = document.querySelector(".panel-screen p");
let currentPage = "about";

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
          <a class="post-link" href="${post.href}">查看相关页面</a>
        </article>
      `
    )
    .join("");
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;

  if (themeToggleLabel) {
    themeToggleLabel.textContent = theme === "night" ? "夜间" : "白天";
  }

  if (statusLabel) {
    statusLabel.textContent = theme === "night" ? "夜间" : "就绪";
  }
}

function updateMenu(pageId) {
  menuButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.page === pageId);
  });
}

function showPage(pageId, shouldUpdateHash = true) {
  const nextPage = document.getElementById(pageId);
  const activePage = document.querySelector(".page-screen.is-current");

  if (!nextPage || nextPage === activePage) {
    updateMenu(pageId);
    return;
  }

  nextPage.hidden = false;
  nextPage.classList.remove("is-exiting");
  nextPage.classList.add("is-entering");

  if (activePage) {
    activePage.classList.remove("is-current");
    activePage.classList.add("is-exiting");
  }

  requestAnimationFrame(() => {
    nextPage.classList.add("is-current");
    updateMenu(pageId);
  });

  nextPage.addEventListener(
    "animationend",
    () => {
      nextPage.classList.remove("is-entering");
    },
    { once: true }
  );

  if (activePage) {
    activePage.addEventListener(
      "animationend",
      () => {
        activePage.hidden = true;
        activePage.classList.remove("is-exiting");
      },
      { once: true }
    );
  }

  currentPage = pageId;

  if (shouldUpdateHash) {
    window.history.pushState(null, "", `#${pageId}`);
  }
}

menuButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const pageId = button.dataset.page;

    if (pageId) {
      showPage(pageId);
    }
  });
});

window.addEventListener("popstate", () => {
  const pageId = window.location.hash.replace("#", "") || "about";
  if (pageId !== currentPage) {
    showPage(pageId, false);
  }
});

pages.forEach((page) => {
  if (!page.classList.contains("is-current")) {
    page.hidden = true;
  }
});

const initialPage = window.location.hash.replace("#", "") || "about";
updateMenu(initialPage);

if (initialPage !== "about") {
  showPage(initialPage, false);
}

applyTheme("day");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme =
      document.documentElement.dataset.theme === "night" ? "day" : "night";
    applyTheme(nextTheme);
  });
}
