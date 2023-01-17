/**
 Text.ts
 application
 
 Created by Ian Thompson on September 9th 2022
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
*/

import type { Layer } from "$lib/types/Layer";

class Text implements Layer {

    scene: CanvasRenderingContext2D;
    height: number
    width: number
    x: number
    y: number

    text: string

    constructor(scene: CanvasRenderingContext2D, text: string, x: number, y: number, height: number, width: number) {
        this.scene = scene
        this.height = height
        this.width = width
        this.x = x
        this.y = y

        this.text = text
    }

    update() {
        
    }

    draw(context: CanvasRenderingContext2D) {
        context.font = '48px serif';
        context.fillText(this.text, this.x, this.y);

    }
}

export default Text