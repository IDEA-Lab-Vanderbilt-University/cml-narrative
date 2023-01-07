/**
 Background.ts
 application
 
 Created by Ian Thompson on September 9th 2022
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
*/

class Background {
    constructor(game: CanvasRenderingContext2D) {
        this.game = game
        this.height = this.game.height;
        this.width = this.game.width

        this.image = background
    }

    update() {

    }

    draw(context: CanvasRenderingContext2D) {
        context.drawImage(this.image, 0, 0, this.width, this.height)
    }
}

export default Background;