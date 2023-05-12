class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1);                  // (color, alpha)
            loadingBar.fillRect(0, 125, 750 * value, 5);  // (x, y, w, h)
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        this.load.atlas('dudeAtlas', 'assets/dudeAtlas.png', 'assets/dude-dude.json');
        this.load.image('box', './assets/dude.png');
        this.load.image('background', './assets/background.png');
        this.load.image('enemy', './assets/enemy.png');
        this.load.image('title', './assets/title.png');
        this.load.image('game_over', './assets/game_over.png');
        this.load.image('tutorial', './assets/tutorial.png');
        this.load.audio('death_music', './assets/death_music.mp3');
        this.load.audio('music', './assets/music.mp3');
        this.load.audio('chicken', './assets/chicken.mp3');
        this.load.audio('pop', './assets/pop.mp3');
        this.load.audio('click', './assets/click.mp3');

    }

    create() {
        // check for local storage browser support
        if(window.localStorage) {
            console.log('Local storage supported');
        } else {
            console.log('Local storage not supported');
        }

        // go to Title scene
        this.scene.start('menuScene');
    }
}