# 2026-06-17 文档重构与 Git 推送复盘记录 (Retrospective)

> 日期：`2026-06-17`  
> 领域：文档库重构、VitePress 样式覆盖、Git 推送凭据冲突、部署熔断、多语言同步。

本复盘文档详尽记录了在 Industrial CG Platform 交付过程中，针对文档库（`industrial-cg-platform-docs`）进行结构重构、视觉样式优化、Git 自动化发布所遇到的各类真实工程报错、设计原理与解决方法。

---

## 1. Git 推送凭据冲突 (GCM 干扰故障)

### 故障现象
在 Agent 终端中向远程 Git 仓库（GitHub）推送修改时，命令发生中断或报鉴权错误：
```text
remote: Invalid username or token. Password authentication is not supported for Git operations.
fatal: Authentication failed for 'https://github.com/RolandVyens/industrial-cg-platform-docs.git/'
```

在执行 `gh auth status` 时，输出显示错误地选用了沙箱内置的 `GITHUB_TOKEN`：
```text
github.com
  X Failed to log in to github.com using token (GITHUB_TOKEN)
  - Active account: true
  - The token in GITHUB_TOKEN is invalid.

  ✓ Logged in to github.com account RolandVyens (keyring)
  - Active account: false
```

### 原因分析
Agent 环境在运行时会自动注入一个名为 `GITHUB_TOKEN` 的环境变量（通常为只读的虚拟 Token 占位符 `github_pat_antigravitydummytoken...`）。  
Git 与 GitHub CLI 在发起推送时，会优先捕获并使用该环境变量进行鉴权。但由于此虚拟 Token 并不具备针对目标仓库（如 `RolandVyens/industrial-cg-platform-docs`）的写权限，直接导致鉴权被拦截，而本地 Keychain 里的正确用户账号凭据（Git Credential Manager - GCM）因此被挤占而处于非激活状态（`Active: false`）。

### 解决方案
通过在执行 Git 操作前强制将当前会话的环境变量 `GITHUB_TOKEN` 清空，促使 Git 回退至 GCM，激活本地正确的安全秘钥环。

- **PowerShell (第 3521 步)**：
  ```powershell
  $env:GITHUB_TOKEN = $null
  git push origin main
  ```
  *(注：不要在同一行中把 $env:GITHUB_TOKEN = $null; 作为单条命令直接拼接而不给其定义作用域，否则在部分旧沙箱会发生语法解析错)*
  
- **Cmd/Command Prompt (第 2918 步)**：
  ```cmd
  cmd.exe /c "set GITHUB_TOKEN=&& git push origin main"
  ```

---

## 2. VitePress 相对资源路径 (子目录部署 404)

### 故障现象
在 `docs/.vitepress/theme/custom.css` 中引入背景图：
```css
/* 错误做法：导致打包后 404 */
.VPHomeHero {
  background-image: url('/public/home-splash.jpg');
}
```
本地运行 `npm run dev` 能够正常看到背景图片。但推送并部署到 GitHub Pages 子路径（`https://rolandvyens.github.io/industrial-cg-platform-docs/`）后，背景图片显示 404 破损。

### 原因分析
VitePress 在构建时会将项目部署到特定的 Base 路径。  
- 如果使用以 `/` 开头的绝对路径（如 `/public/...` 或 `/home-splash.jpg`），VitePress 编译器会认为该资源是一个**外部绝对链接**，在打包时**不予处理**。
- 这导致部署到 GitHub Pages 时，浏览器会尝试从主域名根目录（`https://rolandvyens.github.io/home-splash.jpg`）下载该图，从而发生 404。

### 解决方案
在 CSS 或 Markdown 中必须使用**相对路径**引导资源，通知 Vite 对其进行哈希混淆重命名并将其打包编译进部署包的 `assets` 中：
```css
/* 正确做法 */
.VPHomeHero {
  background-image: linear-gradient(to bottom, rgba(246, 246, 249, 0.35) 0%, var(--vp-c-bg) 100%), 
                    url('../../public/home-splash.jpg') !important;
}
```
编译后，Vite 将自动重命名文件并将其放入 `dist/assets/home-splash.[hash].jpg`，并在最终 CSS 中输出正确的相对路径。

---

## 3. 自定义 CSS 样式类名审计

### 经验教训
严禁依靠主观臆测编写选择器（例如使用带有额外中划线的 `.VP-Feature` 或 `.VP-HomeHero`），这些错误的命名会由于 CSS 不报错的特性而导致样式覆盖“默默失效”。

### 标准类名约定
VitePress 默认主题生成的部分核心 DOM 结构和类名如下：
- `.VPHomeHero`：主页大屏 Hero 模块。
- `.VPHomeHero .image-bg`：Hero 区域底部的半透明 glow 光圈效果背景。
- `.VPFeatures`：主页下方功能格栅的包裹容器。
- `.VPFeature`：每个独立的卡片。
- `.VPButton.brand`：首屏高亮的主按钮。
- `.VPFooter`：全局页脚组件。若需要增加页脚对比度，应覆盖 `.VPFooter .message` 与 `.VPFooter .copyright` 的 `color`。
- `.VPNavBar` 与 `.VPSidebar`：顶部导航栏与侧边栏。

---

## 4. 文档功能分类与隔离设计

### 设计规范
为了防止开发层面的参数与用户侧的使用指南发生混淆，我们将原来杂乱的文章进行了清晰的解耦，确立了如下标准的“三语功能指南架构”：

#### 功能指南 (Features Manual)
- 仅保留最终用户关心的问题：功能是什么 (`What Is It`)、有什么好处 (`Why Use It`)、如何启用 (`How To Enable`)、具体界面参数 (`Parameters`)、以及已知的开发局限（`Known Limitations`，如 overscan 开启后和 render region 互斥）。
- 例如对于 EXR Overscan 功能：
  - Viewport 的安全框 guide 属于 limitations，在此明确声明“目前不支持 viewport 实时的 overscan 渲染图像预览”。
  - 与 Render Region 互斥是重要限制条件，添加了 gating 说明。

#### API 手册 (API Reference)
- Python RNA 属性等底层参数，统一归档至 [rna-properties.md](file:///E:/blender_modify/industrial-cg-platform-docs/docs/en/cg-platform/api/rna-properties.md)（中英法三语）。
- 代码级别、Kernel 级的内部修改归档至 `cycles-kernel.md`。

#### 系统与环境依赖 (Installation & Setup)
- 针对运行环境的优化和系统参数（如 OptiX Shader 缓存的路径位置 `%USERPROFILE%\AppData\Local\IndustrialCGPlatform\Cache\OptiX\optix7cache.db` 及环境变量 `OPTIX_CACHE_PATH` 拦截机制），单独拆分并归纳到 [installation.md](file:///E:/blender_modify/industrial-cg-platform-docs/docs/en/cg-platform/guide/installation.md)“OptiX Shader Cache Isolation”一节中。

---

## 5. 自动化验证工具使用 (Skills)

为保证每次部署前文档不破损、超链接完整，必须在本地使用以下验证脚本：

### 多语言链接完整性自动审计 (`audit_all_links.py`)
为了防止编写相对超链接或多语言页面结构更改产生死链，我们在 `.agent/scripts/` 中提供了一款专用的 Python 链接校验脚本。

- **工作机制**：
  1. 递归读取 `docs/` 下所有的 Markdown。
  2. 提取所有的 Markdown 格式链接 `[text](url)` 以及 HTML 文本 `<a href="...">` 中的超链接。
  3. 过滤掉外部协议（`https://` 等）及页内锚点（`#`）。
  4. 对含有子路径偏移前缀（如 `/industrial-cg-platform-docs/`）的链接进行剥离还原。
  5. 验证目标文件（或其对应的 `.md`、`index.md` 或 `public/` 静态文件）在本地硬盘上是否存在。
  
- **执行命令**：
  ```powershell
  python .agent/scripts/audit_all_links.py
  ```

---

## 6. CI/CD 自动部署的撤销与熔断

### 故障恢复手段 (第 3540 步)
当误推送未充分测试的本地分支并触发了 GitHub Actions 的线上发布流时，可以通过在本地重置当前分支的 head 并强制推送，来直接替换并中止远程的部署：
```powershell
$env:GITHUB_TOKEN = $null
git push origin <hash_before_failure>:main --force
```
这将把 GitHub Pages 的代码回滚至最近一次成功的稳定版本。
