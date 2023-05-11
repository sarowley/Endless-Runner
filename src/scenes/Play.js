class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        //load images/tile sprites
        this.load.atlas('dudeAtlas', 'assets/dudeAtlas.png', 'assets/dude-dude.json');
        this.load.image('box', './assets/dude.png');
        this.load.image('background', './assets/background.png');
        this.load.image('spiral', './assets/spiral.png');
        this.load.image('shapes', './assets/shapes.png');
    }


    create() {

        //define keys
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);


        this.gameOver = false;
        this.move_up = false;
        this.move_down = false;

        this.background1 = this.add.tileSprite(0,0, 700, 350, 'background').setOrigin(0,0);
        this.shapes = this.add.tileSprite(0,0,700,350, 'shapes').setOrigin(0,0);        
        this.spiral = this.add.tileSprite(0,0,700,350, 'spiral').setOrigin(0,0);

        this.dude = new Dude(this,115,175,'dudeAtlas').setOrigin(0.5);

        this.anims.create({
            key: 'dudeAnim',
            frameRate: 5,
            frames: this.anims.generateFrameNames('dudeAtlas', {
                prefix: "dude",
                suffix: ".png",
                start: 1,
                end: 4,
            }),
            repeat: -1
        });

        this.dude.anims.play('dudeAnim');

        this.rockGroup = this.add.group({
            runChildUpdate: true
        });

        this.time.delayedCall(2500, () => {
            this.addRock();
        });

        this.score = 0;

        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(75, 25, this.score, scoreConfig).setOrigin(0.5);

        this.up_word_array = ['yo', 'up', 'cat', 'dog', 'woop', 'help', 'howdy']
        this.down_word_array = ['woah', 'down', 'apple', 'dude', 'super', 'bummer', 'surf']
        this.num = this.getRandomInt(7);
        this.up_word = new KeyComboObject(this.up_word_array[this.num]);
        this.down_word = new KeyComboObject(this.down_word_array[this.num]);

        let wordConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
        }

        this.up_text = this.add.text(250, 25, this.up_word.string, wordConfig).setOrigin(0.5);
        this.down_text = this.add.text(250, 325, this.down_word.string, wordConfig).setOrigin(0.5);

        this.up_word.key = this.create_new_up_key(this.up_word.string);
        this.down_word.key = this.create_new_down_key(this.down_word.string);

        this.input.keyboard.on('keycombomatch', (combo, event) => {
            if (combo === up_key) { 
                this.move_up = true;
            }  
        });

        this.input.keyboard.on('keycombomatch', (combo, event) => {
            if (combo === down_key) { 
                this.move_down = true;
            }  
        });

        this.min_point = 0;
        this.max_point = 100;
        //this.max_point = 20;
        this.speed = -80;
        this.backgroundSpeed = 4;
        this.spiralSpeed = 2;
        this.shapesSpeed = 1;
    }

    addRock(){
        if (this.score < this.max_point && this.score > this.min_point){ 
            let rock = new Rock(this, this.speed, 'box');
            this.rockGroup.add(rock);
        }
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

    create_new_up_key(string){
        return up_key = this.input.keyboard.createCombo(string, {
            resetOnWrongKey: true,  
            maxKeyDelay: 0,         
            resetOnMatch: true,     
            deleteOnMatch: false    
        });
    }

    create_new_down_key(string){
        return down_key = this.input.keyboard.createCombo(string, {
            resetOnWrongKey: true,  
            maxKeyDelay: 0,         
            resetOnMatch: true,     
            deleteOnMatch: false    
        });
    }

    update() {

        if (!this.gameOver){
            this.background1.tilePositionX += this.backgroundSpeed;
            this.spiral.tilePositionX += this.spiralSpeed;
            //this.spiral.rotation += 0.01;
            this.shapes.tilePositionX += this.shapesSpeed;
            }

        if (this.gameOver){
            this.clock = this.time.delayedCall(3000, () => {
                this.gameOver = false;
                this.scene.start("gameOverScene");
            }, null, this);
        }

        if (this.score > this.max_point){
            this.max_point += 100;
            this.min_point += 100;
            this.speed -= 80;
            this.backgroundSpeed += 4;
            this.spiralSpeed += 2;
            this.shapesSpeed += 1;
        }

        this.physics.world.collide(this.dude, this.rockGroup, this.donezo, null, this);

        if (this.gameOver != true && this.move_up){
            this.dude.moveUp();
            this.num = this.getRandomInt(7);
            this.up_word.swap_word(this.up_word_array[this.num]);
            this.up_text.text = this.up_word.string;
            this.up_key = this.create_new_up_key(this.up_word.string);
            this.move_up = false;
        }
        if (this.gameOver != true && this.move_down){
            this.dude.moveDown();
            this.num = this.getRandomInt(7);
            this.down_word.swap_word(this.down_word_array[this.num]);
            this.down_text.text = this.down_word.string;
            this.down_key = this.create_new_down_key(this.down_word.string);
            this.move_down = false;
        }

        if (this.gameOver != true) {
            this.score += .05;
            this.scoreLeft.text = Math.floor(this.score);
        } 
    }

    donezo (){
        this.gameOver = true;
    }
}