// This file contains utility functions for image manipulation used in the Traininator module.

export function applyRotation(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, image: HTMLImageElement) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((Math.PI / 180) * 90); // Rotate 90 degrees
    ctx.drawImage(image, -canvas.width / 2, -canvas.height / 2);
    ctx.restore();
}

export function applyFlip(data: Uint8ClampedArray, newImageData: ImageData, canvas: HTMLCanvasElement) {
    const width = canvas.width;
    const height = canvas.height;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const srcIndex = (y * width + x) * 4;
            const destIndex = (y * width + (width - x - 1)) * 4;

            newImageData.data[destIndex] = data[srcIndex];
            newImageData.data[destIndex + 1] = data[srcIndex + 1];
            newImageData.data[destIndex + 2] = data[srcIndex + 2];
            newImageData.data[destIndex + 3] = data[srcIndex + 3];
        }
    }
}

export function applyAdjust(data: Uint8ClampedArray, newImageData: ImageData) {
    for (let i = 0; i < data.length; i += 4) {
        newImageData.data[i] = Math.min(255, data[i] + 20); // Increase red channel
        newImageData.data[i + 1] = Math.min(255, data[i + 1] + 20); // Increase green channel
        newImageData.data[i + 2] = Math.min(255, data[i + 2] + 20); // Increase blue channel
        newImageData.data[i + 3] = data[i + 3]; // Preserve alpha channel
    }
}