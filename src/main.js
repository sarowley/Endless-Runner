let config = {
    type: Phaser.CANVAS,
    width: 1200,
    height: 600,
    scene: [ Menu, Play, GameOver ]
}

let game = new Phaser.Game(config);
//reserve keyboard vars
let keyENTER;

