/**
 /src/lib/types/Layer.ts
 Layer.ts
 cml-narrative
 
 Created by Ian Thompson on September 9th 2022
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
*/



export interface Layer {
    scene: CanvasRenderingContext2D,
    height: number
    width: number
    x: number
    y: number

    image?: HTMLImageElement
    
    (scene: CanvasRenderingContext2D)
    
    update()

    draw(context: CanvasRenderingContext2D)
    
}