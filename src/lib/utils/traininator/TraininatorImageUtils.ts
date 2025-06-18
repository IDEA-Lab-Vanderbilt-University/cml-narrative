import type { Booster } from "./TraininatorUtils";
import * as tf from '@tensorflow/tfjs';

// This file contains utility functions for image manipulation used in the Traininator module.
export const MOBILE_NET_INPUT_HEIGHT = 224;
export const MOBILE_NET_INPUT_WIDTH = 224;

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


export function rgbToHsl(r: number, g: number, b: number) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = (max + min) / 2;
    let s = h;
    let l = h;

    if (max == min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }

        h /= 6;
    }

    return [h, s, l];
}

export function hslToRgb(h: number, s: number, l: number) {
    let r, g, b;

    if (s == 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [r * 255, g * 255, b * 255];
}

export const createBoostedImage = (img: string, label: number, booster: Booster) => new Promise<tf.Tensor>((resolve) => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        console.error('Canvas context not available');
        return;
    }

    const image = new Image();
    image.src = img;
    image.onload = () => {
        // Set the canvas size to the image size
        canvas.width = image.width;
        canvas.height = image.height;

        // Draw the image on the canvas
        ctx.drawImage(image, 0, 0);

        // Get the image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Create a new image data object
        const newImageData = ctx.createImageData(imageData);

        // Apply the booster
        switch (booster) {
            case 'rotate':
                applyRotation(ctx, canvas, image);
                break;
            case 'flip':
                applyFlip(data, newImageData, canvas);
                break;
            case 'adjust':
                applyAdjust(data, newImageData);
                break;
            default:
                break;
        }

        // Update the canvas with the new image data
        ctx.putImageData(newImageData, 0, 0);

        // Convert the canvas to a tensor
        const tensor = tf.browser.fromPixels(canvas).resizeBilinear([MOBILE_NET_INPUT_HEIGHT, MOBILE_NET_INPUT_WIDTH]).toFloat().div(255);
        resolve(tensor);
    };
});
