/**
 * xukeTool.ts – 浏览器端下载 dataURL 到 Downloads/WebGL_Spector/
 * 用法: import { downloadImage } from "./xukeTool"; downloadImage(src, "1.png");
 */

export function downloadImage(url: string, filename?: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const name = filename || `tex_${Date.now()}.png`;

        if (url.startsWith("data:")) {
            // readPixels 的像素 dataURL 带了 Y 翻转，这里翻回来再存
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d")!;
                ctx.scale(1, -1);
                ctx.drawImage(img, 0, -img.height);
                const fixed = canvas.toDataURL("image/png");
                const a = document.createElement("a");
                a.href = fixed;
                a.download = name;
                a.click();
                resolve(name);
            };
            img.onerror = () => reject(new Error("加载图片失败"));
            img.src = url;
            return;
        }

        fetch(url)
            .then((r) => r.blob())
            .then((blob) => {
                const blobUrl = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = blobUrl;
                a.download = name;
                a.click();
                URL.revokeObjectURL(blobUrl);
                resolve(name);
            })
            .catch(reject);
    });
}
