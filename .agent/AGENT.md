# Industrial CG Platform - 文档仓库 Agent 操作手册 (单源真理)

> 工作区目录：`E:\blender_modify\industrial-cg-platform-docs`
> 对应远程库：`https://github.com/RolandVyens/industrial-cg-platform-docs.git`
> 默认部署分支：`main`

本手册是本仓库长期的 Agent 操作与维护规程。当您（作为 AI Agent）进入该工作区执行任何文档开发、样式修改或发布任务时，**请务必首先仔细阅读并严格执行以下“避坑黄金守则”与“技术规范”**。

---

## 🚨 Agent 避坑黄金守则 (Golden Rules)

1. **Git 推送身份验证防错（GCM 凭据守护）**
   - *指令*：在执行 `git push` 前，**必须**显式清除当前终端会话中的冲突变量，强制 Git 回退至系统本地凭据管理器（GCM）：
     - *PowerShell*：执行 `$env:GITHUB_TOKEN = $null; git push origin main`
     - *Command Prompt / Cmd*：执行 `cmd.exe /c "set GITHUB_TOKEN=&& git push origin main"`
     - *Bash*：执行 `unset GITHUB_TOKEN && git push origin main`

2. **VitePress 相对资源路径原则**
   - *指令*：在 Markdown 图像引用和 `custom.css` 背景图中引用静态资源（如图片）时，**严禁使用绝对路径**（以 `/` 开头，如 `/public/foo.png`）。必须使用相对路径（例如 `url('../../public/foo.jpg')`），迫使 Vite 编译、Hash 打包并自动匹配部署后的子路径前缀。

3. **自定义 CSS 样式类名（Class Selector）审计**
   - *指令*：严禁凭猜测编写自定义组件的 CSS 选择器（如 `.VP-Feature` 等错误拼写）。**必须**首先通过 `npm run dev` 启动本地服务器，在浏览器中检查真实的 DOM 结构，并使用准确的 VitePress 默认类名进行样式覆盖。

4. **文档功能分类与隔离规范**
   - *指令*：用户侧指南必须保持高阶与纯净。严禁将底层 API 参数或环境优化细节堆叠在普通使用指南中。
     - **指南页**（如 `exr-overscan.md`）：仅描述 What Is It、Why Use It、How To Enable、Parameters 及 Known Limitations。
     - **API 细节**：写入 `docs/<lang>/cg-platform/api/rna-properties.md` 或 `cycles-kernel.md`。
     - **环境配置**（如 OptiX Shader 缓存路径与环境变量）：写入 `docs/<lang>/cg-platform/guide/installation.md`。

5. **自动部署熔断与覆盖机制**
   - *指令*：若发生误推送触发了 GitHub Actions 的错误部署，请立即在本地修复或回滚，并通过强推命令 `git push origin <hash>:main --force` 覆盖远程分支，以此熔断并更正线上的错误部署。

---

## 📂 目录结构与多语言开发规范

- **三语平行结构**：所有的文档内容均按语种放置在 `docs/en/`、`docs/zh/` 和 `docs/fr/` 目录下。任何新功能的添加或重构，**必须**保证中、英、法三语页面同步创建或修改，且遵循完全对称的树形路由。
- **根路径防 404 重定向**：站点根目录 `docs/index.md` 包含自动重定向脚本：
  ```markdown
  ---
  layout: false
  ---
  <script>
    window.location.href = '/en/'
  </script>
  ```
  该文件防止访问裸域名根路径时因路由缺失导致 VitePress 触发 404。

---

## 🎨 界面设计与样式自定义规范 (UI/UX Styling)

为确保整个生态站点具备高端 VFX 行业质感，任何在 `custom.css` 中进行的样式定制必须遵循以下视觉设计规范：

1. **色彩与品牌代币 (Color Tokens)**
   - 使用现代感强、高对比度的暗色主题（默认背景色 `--vp-c-bg: #0b0c10`）。
   - 主色调采用亮紫色-深紫色-青蓝色渐变设计。
     ```css
     --vp-c-brand-1: #7c4dff; /* 主亮紫 */
     --vp-c-brand-2: #651fff; /* 渐变深紫 */
     --vp-c-brand-3: #00e5ff; /* 辅助青蓝 */
     ```
   - 警示框与提示框（Alert Callouts）必须使用带有适当不透明度的高对比度背景变量：
     - Info Callout: `rgba(124, 77, 255, 0.05)` (边框为 `rgba(124, 77, 255, 0.3)`)
     - Tip Callout: `rgba(0, 229, 255, 0.05)` (边框为 `rgba(0, 229, 255, 0.3)`)

2. **微动画与特效 (Micro-animations)**
   - 主页功能卡片 `.VPFeature` 必须应用高质感毛玻璃效果（`backdrop-filter: blur(8px)`）以及悬浮升起与阴影发光动画：
     ```css
     .VPFeature {
       transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), 
                   box-shadow 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), 
                   border-color 0.4s ease !important;
     }
     .VPFeature:hover {
       transform: translateY(-5px);
       box-shadow: 0 12px 40px rgba(124, 77, 255, 0.15);
     }
     ```
   - 导航栏 Logo 图标在悬浮时应附带平滑旋转与微放大动画：
     `transform: rotate(12deg) scale(1.1)`

3. **字体系统**
   - 标题字体：Google Font `Outfit`
   - 正文字体：`Inter`
   - 等宽字体：`Fira Code`

---

## 🔐 部署与安全规范

1. **CSP 安全元标记**
   - 全局配置文件 `config.mts` 的 `head` 配置中必须定义 `Content-Security-Policy` 元标签，以严格限制外部资源，防止 XSS：
     `default-src 'self'; img-src 'self' data: https://github.com https://*.githubusercontent.com;`
2. **防点击劫持防护**
   - `config.mts` 必须在全局头部注入 Frame-busting 脚本，确保站点不会被嵌套在第三方 iframe 中进行钓鱼：
     `['script', {}, "if (self !== top) { top.location = self.location; }"]`
3. **强制默认暗色模式 (Force Dark Mode)**
   - 全局配置必须定义 `appearance: 'force-dark'`，以确保无论用户的系统主题或缓存如何，全平台（包括移动端）在首次及后续访问时均直接以暗色模式加载。

---

## 🛠️ 自动化校验 Skill (Tools)

每次在向远程推送文档更改前，Agent **必须**执行以下自动化校验流程：

1. **静态链接与资源路径自动审计**
   - **指令**：在根目录下执行 `python .agent/scripts/audit_all_links.py`。
   - **功能**：该脚本会递归读取所有 Markdown，并匹配检查其中的 Markdown `[text](url)` 和 HTML `href="..."`。它会自动还原剥离发布时的子路径前缀 `/industrial-cg-platform-docs/` 并确认本地相对或绝对路径文件是否切实存在。审计输出必须为 `Found 0 issues` 才允许推送。

2. **生产环境静态构建测试**
   - **指令**：在根目录下执行 `npm run docs:build`。
   - **功能**：打包验证页面是否符合 Rollup 编译规则。这会检测到包括未注册的 Vue 组件引用、模板渲染闭环、静态资源定位失败等所有编译期死锁。

3. **本地渲染监视**
   - **指令**：在根目录下执行 `npm run docs:dev`。
   - **功能**：启动本地服务器（通常在 `http://localhost:5173/industrial-cg-platform-docs/`）以验证移动端响应式布局和自定义 CSS 的渲染真实表现。

---

## 🔧 常见技术故障排查指南 (Troubleshooting)

### 1. Git Push 报 'Authentication failed' 或 'Permission Denied'
- **起因**：Agent 沙箱中预设了只读 GITHUB_TOKEN，干扰了真正的本地凭据管理器，执行 `gh auth status` 时显示：
  `Failed to log in to github.com using token (GITHUB_TOKEN)`
- **排查与解决方法**：
  在推送前强制清空该环境变量。
  - Cmd 下执行 `cmd.exe /c "set GITHUB_TOKEN=&& git push origin main"`。
  - PowerShell 下执行 `$env:GITHUB_TOKEN = $null; git push origin main`。

### 2. GitHub Pages 上线后背景图或图片发生 404 错误
- **起因**：在 Markdown 或 CSS 中使用了类似 `/public/home-splash.jpg` 这样不带相对前缀的路径，导致打包程序在带子目录的 URL（如 `/industrial-cg-platform-docs/`）下无法将其匹配至正确的域相对地址。
- **排查与解决方法**：
  定位该样式或 Markdown，将其路径改写为明确的相对路径，例如 `../../public/home-splash.jpg`。重新编译 `npm run docs:build` 验证。

### 3. 自定义 CSS 样式在编译后没有任何体现，也无任何报错
- **起因**：由于拼写错误（如 `.VP-Feature` 拼写代替 `.VPFeature`），导致样式表包含未被匹配的类选择器。
- **排查与解决方法**：
  运行本地开发服务器，在 Chrome/Edge 中打开调试工具（F12），确认目标 HTML DOM 元素上的真实 Class 属性，修改 CSS 文件的选择器拼写至完全吻合。
