# Paper Feed Journal

一个静态博客网站，视觉方向是米色背景和简约打印机风格：菜单在“机器”面板上，正文像打印纸一样从出纸口滑出。

## 本地预览

直接打开 `index.html`，或者在项目目录运行：

```bash
python3 -m http.server 8000
```

然后访问 `http://localhost:8000`。

## 部署到 GitHub Pages

1. 把仓库推送到 GitHub。
2. 在仓库 `Settings -> Pages` 里将 `Source` 设置为 `GitHub Actions`。
3. 推送到 `main` 分支后，工作流会自动发布站点。

如果这是你的个人主页仓库，仓库名应为 `<your-github-username>.github.io`。
