let config = {
    type: Phaser.CANVAS,
    width: 1200,
    height: 600,
    pixelArt: true,
    physics:{
        default: "arcade",
        arcade : {
            //debug: true
        }
    },
    scene: [ Menu, Play, GameOver ]
}

let game = new Phaser.Game(config);
//reserve keyboard vars
let keyENTER, keyUP, keyDOWN, facadeCombo, gameOver, clock_check;

