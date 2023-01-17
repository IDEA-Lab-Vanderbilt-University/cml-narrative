/**
 Scene.ts
 application
 
 Created by Ian Thompson on September 9th 2022
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
*/

import Player from "./Player";
import Background from "./Background";
import Text from "./Text";


class Scene {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.player = new Player(this);
        this.background = new Background(this);
        this.text = new Text(this, "Hello World!", 100, 100, 150, 200)
    }

    update() {
        this.player.update();
    }

    draw(context: CanvasRenderingContext2D) {
        this.background.draw(context);
        this.player.draw(context);


    }
}

export default Scene;