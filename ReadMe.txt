============================================================
  Spector.js - WebGL 调试 & 图片资源提取工具 (二次开发版)
============================================================

新增功能：一键/自动下载所有 WebGL 捕获的原始图片到本地下载目录。
所有图片统一保存在 下载文件夹 > WebGL_Spector 子文件夹中。

============================================================
  一、编译项目
============================================================

1. 安装依赖：

    npm install

2. 生产构建（输出到 dist/ 和 extensions/）：

    npm run build

   构建流程：
   - webpack 打包 spector.bundle.js       → dist/
   - webpack 打包 spector.worker.bundle.js → dist/
   - 生成类型声明 spector.d.ts             → dist/
   - 复制 bundle 到 extensions/ 目录
   - 拼接 extensions/spector.bundle.func.js（用于扩展注入）

3. 仅重新编译 bundle（不复制到 extensions）：

    npm run build:bundle

4. 开发模式（监听文件变化自动重编译）：

    npm run watch

============================================================
  二、在 Edge 浏览器下加载扩展
============================================================

1. 打开 Edge 浏览器，地址栏输入：

    edge://extensions/

2. 打开页面左下角的【开发人员模式】开关（Developer mode）。

3. 点击【加载解压缩的扩展】（Load unpacked）。

4. 在弹出的文件夹选择对话框中，选择本项目的 extensions 文件夹：

    d:\OpenSource\WebGL_Spector.js\extensions\

5. 加载成功后，扩展列表里会出现 "Spector.js" 扩展。

6. 打开任意包含 WebGL 内容的网页，点击浏览器工具栏中的 Spector.js
   图标即可开始捕获。每次捕获完成后所有图片会自动下载到：

   下载目录\WebGL_Spector\capture_HH-MM-SS_image_001.png
   下载目录\WebGL_Spector\capture_HH-MM-SS_image_002.png
   ...

============================================================
  三、使用自动下载
============================================================

默认启用自动下载。如需关闭，在 spector.ts 中修改初始化参数：

    const spector = new SPECTOR.Spector({ autoDownloadTextures: true });

改为 false 后，可手动点击 Capture List 中的下载按钮逐一下载。

============================================================