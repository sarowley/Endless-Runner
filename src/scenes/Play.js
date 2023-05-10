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
        this.move_up = false;
        this.move_down = false;

        this.dude = new Dude(this,150,175,'box').setOrigin(0.5);

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


        //this.direction = 0;
        //this.string = 'yo';
        this.word_array = ['yo', 'up', 'cat', 'dog', 'woop', 'help', 'howdy']
        this.num = this.getRandomInt(7);
        this.word = new KeyComboObject(this.word_array[this.num]);

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

        this.test = this.add.text(250, 25, this.word.string, wordConfig).setOrigin(0.5);

        this.word.key = this.create_new_key(this.word.string);

        this.input.keyboard.on('keycombomatch', (combo, event) => {
            if (combo === up_key) { 
                this.move_up = true;
            }  
       });

        this.min_point = 0;
        this.max_point = 100;
        this.speed = -80;
    }

    addRock(){
        if (this.score < this.max_point && this.score > this.min_point){ 
            let rock = new Rock(this, this.speed);
            this.rockGroup.add(rock);
        }
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

    create_new_key(string){
        return up_key = this.input.keyboard.createCombo(string, {
            resetOnWrongKey: true,  
            maxKeyDelay: 0,         
            resetOnMatch: true,     
            deleteOnMatch: false    
        });
    }

    update() {

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
        }

        this.physics.world.collide(this.dude, this.rockGroup, this.donezo, null, this);

        if (Phaser.Input.Keyboard.JustDown(keyDOWN)){
            this.move_down = true;
        }

        if (this.gameOver != true && this.move_up){
            this.dude.moveUp();
            this.num = this.getRandomInt(7);
            this.word.swap_word(this.word_array[this.num]);
            this.test.text = this.word.string;
            this.up_key = this.create_new_key(this.word.string);
            this.move_up = false;
        }
        if (this.gameOver != true && this.move_down){
            this.dude.moveDown();
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