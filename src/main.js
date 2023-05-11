let config = {
    type: Phaser.CANVAS,
    width: 700,
    height: 350,
    pixelArt: true,
    zoom: 2,
    physics:{
        default: "arcade",
        arcade : {
            //debug: true
        }
    },
    scene: [ Load, Menu, Play, GameOver ]
}

let game = new Phaser.Game(config);
//reserve keyboard vars
let keyENTER, keyUP, keyDOWN, facadeCombo, gameOver, clock_check, up_key, down_key;

