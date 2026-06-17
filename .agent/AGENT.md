# Industrial CG Platform - 文档仓库 Agent 操作手册

> 工作区目录：`E:\blender_modify\industrial-cg-platform-docs`
> 对应远程库：`https://github.com/RolandVyens/industrial-cg-platform-docs.git`
> 默认部署分支：`main`

本手册是本仓库长期的 Agent 操作与维护规程。当您（作为 AI Agent）进入该工作区执行任何文档开发、样式修改或发布任务时，**请务必首先仔细阅读并严格执行以下“避坑黄金守则”**。

---

## 🚨 Agent 避坑黄金守则 (Golden Rules)

### 1. Git 推送身份验证防错（GCM 凭据守护）
- **现象**：在沙箱终端中直接执行 `git push` 时，可能会遇到 `Authentication failed / Permission Denied` 错误。这是因为沙箱环境变量中预设了无效或只读的 `GITHUB_TOKEN`，覆盖了您的本地凭据管理器（GCM）。
- **指令**：在执行 `git push` 之前，**必须**显式清除当前终端会话中的冲突变量：
  - *PowerShell*：执行 `$env:GITHUB_TOKEN = $null; git push origin main`
  - *Command Prompt / Cmd*：执行 `cmd.exe /c "set GITHUB_TOKEN=&& git push origin main"`
  - *Bash*：执行 `unset GITHUB_TOKEN && git push origin main`

### 2. VitePress 相对资源路径原则
- **现象**：当站点部署到具有子路径的 GitHub Pages（如 `/industrial-cg-platform-docs/`）时，绝对路径（以 `/` 开头，如 `/public/logo.png` 或 `/home-splash.jpg`）会直接被解析为域名的根路径而发生 404 错误。
- **指令**：在 Markdown 图像引用和 `.vitepress/theme/custom.css` 的背景图中引用资源时，**严禁使用绝对路径**，必须使用相对路径（例如 `url('../../public/home-splash.jpg')`）。这将迫使 Vite 在编译期将其哈希打包至 `dist/assets/` 下并自动补全子路径前缀。

### 3. 自定义 CSS 样式类名（Class Selector）审计
- **现象**：VitePress 默认主题的组件和卡片样式覆盖极易因为拼写猜测（例如写成 `.VP-Feature` 或 `.VP-HomeHero` 等带中划线的名字）而发生无报错的失效。
- **指令**：必须首先通过 `npm run dev` 启动本地服务器，在浏览器中检查真实的 DOM 结构和类名。VitePress 标准类名包括：`.VPHomeHero`（主页Hero）、`.VPFeature`（功能卡片）、`.VPButton.brand`（主按钮）、`.VPFooter`（页脚）。

### 4. 文档功能分类与隔离规范
- **现象**：将开发专用的 API 参考或特定的环境配置信息（如 OptiX 缓存配置）堆积在普通用户的特征指南页，会导致文档逻辑混乱、易读性差。
- **指令**：
  - **用户功能指南（三语）**：必须遵循统一框架，只保留功能简介（`What Is It`）、应用场景（`Why Use It`）和启用说明（`How To Enable` / `Parameters`）及已知局限（`Known Limitations`）。
  - **底层 API 参考**：Python/RNA API 变量规范必须严格写入 `docs/<lang>/cg-platform/api/rna-properties.md`。
  - **环境配置参考**：例如 OptiX Cache 的隔离路径（默认位置 `%USERPROFILE%\AppData\Local\IndustrialCGPlatform\Cache\OptiX\` 以及 `OPTIX_CACHE_PATH` 环境变量）必须写入安装部署指南 `docs/<lang>/cg-platform/guide/installation.md`。

### 5. 自动部署熔断与覆盖机制
- **现象**：一旦向 `main` 分支进行了误推送，GitHub Actions 会立即触发自动构建和静态站点发布。
- **指令**：如发现推送内容有缺陷，请立即在本地修复或回滚，并使用强推命令 `git push origin <hash>:main --force` 覆盖远程分支，中止或更正线上的错误部署。

---

## 📂 本地文档库结构说明

- `docs/`：三语文档内容目录。
  - `docs/en/`：英文版本。
  - `docs/zh/`：中文版本。
  - `docs/fr/`：法文版本。
- `docs/.vitepress/`：VitePress 配置及自定义主题目录。
  - `config.mts`：三语导航栏、侧边栏及全局头部注入配置文件。
  - `theme/custom.css`：全局样式覆盖，定义了毛玻璃效果和渐变背景颜色代币。
- `.agent/`：Agent 操作辅助目录。
  - `AGENT.md`：本操作手册（本文件）。
  - `retrospectives/`：历史经验教训详细复盘文档。
  - `scripts/`：文档验证、自动化审计脚本。

---

## 🎨 视觉设计与色彩代币 (Design Tokens)

为了保持文档站点的高端 VFX 行业设计质感，在修改 `custom.css` 样式时需复用以下定义的变量：
- **主要渐变品牌色**：
  - 亮紫色（`--vp-c-brand-1: #7c4dff`）
  - 深紫色（`--vp-c-brand-2: #651fff`）
  - 青蓝色（`--vp-c-brand-3: #00e5ff`）
- **主页卡片样式**：应用了 `.VPFeature { backdrop-filter: blur(8px); }` 毛玻璃效果，并配有卡片悬浮过渡。
- **页面字体**：无衬线标题使用 Google 字体 `Outfit`，正文使用 `Inter`，代码块使用 `Fira Code`。

---

## 🛠️ 自动化审计验证 Skill (Tools)

提交修改或推送远程前，Agent 必须调用以下命令和自动化脚本进行本地验证：

1. **多语言链接审计脚本**
   - 运行：`python .agent/scripts/audit_all_links.py`
   - 功能：自动扫描所有 Markdown 和 HTML 链接，并针对子路径（`/industrial-cg-platform-docs/`）转换进行映射验证，确保没有 404 死链接。
2. **构建一致性校验**
   - 运行：`npm run docs:build`
   - 功能：验证所有模板、文件和路径能被 Vite 顺利解析且不发生编译中断。
3. **安全注入校验**
   - 确保 `config.mts` 的全局 `<head>` 注入中包含 CSP 防御性头部，以及 Clickjacking 点击劫持防御脚本：
     `if (self !== top) { top.location = self.location; }`
4. **本地预览**
   - 运行：`npm run docs:dev`，然后利用测试浏览器进行视觉校验。

---

## 🔗 历史复盘参考

- [2026-06-17 文档重构与 Git 推送复盘记录](file:///E:/blender_modify/industrial-cg-platform-docs/.agent/retrospectives/20260617_docs_workflow_retrospective.md)
