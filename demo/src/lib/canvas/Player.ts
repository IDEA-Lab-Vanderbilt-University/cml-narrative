/**
 Text.ts
 application
 
 Created by Ian Thompson on September 9th 2022
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
*/

class Player {
    scene: CanvasRenderingContext2D;
    height: number
    width: number
    x: number
    y: number
    image: HTMLImageElement

    animationDirection: string
    animationXDirection: string

    constructor(scene: CanvasRenderingContext2D) {
        this.scene = scene
        this.height = 250;
        this.width = 250
        this.x = this.scene.width / 2
        this.y = 0

        this.image = player

        this.animationDirection = "down"
        this.animationXDirection = "left"
    }

    update() {


        // if (this.animationDirection == "up") {
        //     this.y -= 5;
        // } else {
        //     this.y += 5;
        // }

        // if (this.y > this.scene.height - this.height) {
        //     this.animationDirection = "up"
        // } else if (this.y < 0) {
        //     this.animationDirection = "down"
        // }

        // if (this.animationXDirection == "left") {
        //     this.x -= 5;
        // } else {
        //     this.x += 5;
        // }

        // if (this.x > this.scene.width - this.width) {
        //     this.animationXDirection = "left"
        // } else if (this.x < 0) {
        //     this.animationXDirection = "right"
        // }

    }

    draw(context: CanvasRenderingContext2D) {
        
        context.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
}

export default Player