# 李东简历站点

一个静态中文简历网站，采用米色拟物打印机风格展示个人简介、工作经历、技能概览和联系方式，并提供 PDF 简历下载。

## 当前内容

- 单页简历界面，分页切换动画模拟纸张出列
- 白天 / 夜间模式切换
- 在线 PDF 下载文件：`output/pdf/lidong-resume.pdf`
- GitHub Pages 自动部署

## 本地预览

在项目目录运行：

```bash
python3 -m http.server 8000
```

然后访问 [http://localhost:8000](http://localhost:8000)。

## 项目结构

- `index.html`: 页面结构
- `styles.css`: 视觉样式与打印样式
- `script.js`: 页面切换与主题切换逻辑
- `output/pdf/lidong-resume.pdf`: 当前导出的 PDF 简历
- `.github/workflows/deploy.yml`: GitHub Pages 部署工作流

## 部署

当前仓库已使用 GitHub Pages 发布，仓库地址为：

`git@github.com:lidongsevenlee/lidongsevenlee.github.io.git`

推送到 `main` 分支后会自动触发部署。
