class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        //load images/tile sprites
        this.load.image('box', './assets/dude.png');
    }

    create() {

        //define keys
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);




        this.dude = new Dude(this,200,200,'box').setOrigin(0.5);

        //initialize score
        this.score = 0;

        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(100, 100, this.score, scoreConfig).setOrigin(0.5);
        //game over flag
        this.gameOver = false;
    
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.scene.start("gameOverScene");
            //this.dude.moveUp();
        }
        if (Phaser.Input.Keyboard.JustDown(keyUP)){
            this.dude.moveUp();
        }
        if (Phaser.Input.Keyboard.JustDown(keyDOWN)){
            this.dude.moveDown();
        }
    }

}