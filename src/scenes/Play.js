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


        this.gameOver = false;

        this.dude = new Dude(this,200,200,'box').setOrigin(0.5);
        this.rock = new Dude(this, 500, 400,'box').setOrigin(0.5);

        this.physics.add.overlap(this.dude, this.rock, this.donezo, null, this);
        //this.physics.add.collider(this.dude, this.rock);
        //this.rock = this.physics.add.staticGroup();

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

        // let facadeCombo = this.input.keyboard.createCombo('skull', {
        //     resetOnWrongKey: true,  // if they press the wrong key is the combo reset?
        //     maxKeyDelay: 0,         // max delay (ms) between each key press (0 = disabled)
        //     resetOnMatch: true,     // if matched before, does pressing first key of combo reset?
        //     deleteOnMatch: false    // if combo matches, will it delete itself?
        // });

        // this.input.keyboard.on('keycombomatch', (combo, event) => {
        //     if (combo === facadeCombo) { 
        //         this.add.sprite(0,0, 'skull').setRandomPosition();
        //     }  
        // });
    }

    update() {

        if (this.gameOver){
            //console.log("starting clock??")
            this.clock = this.time.delayedCall(3000, () => {
                this.gameOver = false;
                this.scene.start("gameOverScene");
            }, null, this);
        }

        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.scene.start("gameOverScene");
            //this.dude.moveUp();
        }
        if (this.gameOver != true && Phaser.Input.Keyboard.JustDown(keyUP)){
            this.dude.moveUp();
        }
        if (this.gameOver != true && Phaser.Input.Keyboard.JustDown(keyDOWN)){
            this.dude.moveDown();
        }

        if (this.gameOver != true) {
            this.rock.moveLeft();
        }

        // this.input.keyboard.on('keycombomatch', (combo, event) => {
        //     if (combo === facadeCombo) { 
        //         this.add.sprite(0,0, 'skull').setRandomPosition();
        //     }  
        // });

        if (this.gameOver != true && this.score < 100) {
            this.score += .05;
            this.scoreLeft.text = Math.floor(this.score);
        } 
    }

    donezo (){
        console.log("game over");
        //console.log(gameOver);
        this.gameOver = true;
        //console.log(gameOver);
    }

}