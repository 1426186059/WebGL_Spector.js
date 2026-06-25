/**
 * xukeTool.ts – 浏览器端下载 dataURL 到 Downloads/WebGL_Spector/
 * 用法: import { downloadImage } from "./xukeTool"; downloadImage(src, "1.png");
 */

export function downloadImage(url: string, filename?: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const name = filename || `tex_${Date.now()}.png`;

        if (url.startsWith("data:")) {
            const a = document.createElement("a");
            a.href = url;
            a.download = name;
            a.click();
            resolve(name);
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
