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

        //i am genuinely sorry for the below mess of code, 
        //but i just couldn't get it to work the way i wanted 
        //and this was the closest i could get it to my creative vision. sorry :(
        let up_word = 'up';
        let up_word1 = 'bummer';
        let up_word2 = 'howdy';
        let up_word3 = 'yeowch';
        let up_word4 = 'dog';

        this.up_word_text = this.add.text(250, 25, 'up', wordConfig).setOrigin(0.5);
        this.up_word_text1 = this.add.text(250, 25, 'bummer', wordConfig).setOrigin(0.5);
        this.up_word_text1.visible = false;
        this.up_word_text2 = this.add.text(250, 25, 'howdy', wordConfig).setOrigin(0.5);
        this.up_word_text2.visible = false;
        this.up_word_text3 = this.add.text(250, 25, 'yeowch', wordConfig).setOrigin(0.5);
        this.up_word_text3.visible = false;
        this.up_word_text4 = this.add.text(250, 25, 'dog', wordConfig).setOrigin(0.5);
        this.up_word_text4.visible = false;
            
        let up_key = this.input.keyboard.createCombo(up_word, {
            resetOnWrongKey: true,  
            maxKeyDelay: 0,         
            resetOnMatch: true,     
            deleteOnMatch: false    
        });

        let up_key1 = this.input.keyboard.createCombo(up_word1, {
            resetOnWrongKey: true,  
            maxKeyDelay: 0,         
            resetOnMatch: true,     
            deleteOnMatch: false    
        });

        let up_key2 = this.input.keyboard.createCombo(up_word2, {
            resetOnWrongKey: true,  
            maxKeyDelay: 0,         
            resetOnMatch: true,     
            deleteOnMatch: false    
        });

        let up_key3 = this.input.keyboard.createCombo(up_word3, {
            resetOnWrongKey: true,  
            maxKeyDelay: 0,         
            resetOnMatch: true,     
            deleteOnMatch: false    
        });

        let up_key4 = this.input.keyboard.createCombo(up_word4, {
            resetOnWrongKey: true,  
            maxKeyDelay: 0,         
            resetOnMatch: true,     
            deleteOnMatch: false    
        });

        this.input.keyboard.on('keycombomatch', (combo, event) => {
            if (combo === up_key || combo === up_key1 || combo === up_key2 || combo === up_key3 || combo === up_key4) { 
                this.move_up = true;
            }  
        });


        //first half of disgusting code done
        let down_word = 'down';
        let down_word1 = 'dude';
        let down_word2 = 'cat';
        let down_word3 = 'light';
        let down_word4 = 'music';

        this.down_word_text = this.add.text(250, 325, 'down', wordConfig).setOrigin(0.5);
        this.down_word_text1 = this.add.text(250, 325, 'dude', wordConfig).setOrigin(0.5);
        this.down_word_text1.visible = false;
        this.down_word_text2 = this.add.text(250, 325, 'cat', wordConfig).setOrigin(0.5);
        this.down_word_text2.visible = false;
        this.down_word_text3 = this.add.text(250, 325, 'light', wordConfig).setOrigin(0.5);
        this.down_word_text3.visible = false;
        this.down_word_text4 = this.add.text(250, 325, 'music', wordConfig).setOrigin(0.5);
        this.down_word_text4.visible = false;

        let down_key = this.input.keyboard.createCombo(down_word, {
            resetOnWrongKey: true,  
            maxKeyDelay: 0,         
            resetOnMatch: true,     
            deleteOnMatch: false    
        });

        let down_key1 = this.input.keyboard.createCombo(down_word1, {
            resetOnWrongKey: true,  
            maxKeyDelay: 0,         
            resetOnMatch: true,     
            deleteOnMatch: false    
        });

        let down_key2 = this.input.keyboard.createCombo(down_word2, {
            resetOnWrongKey: true,  
            maxKeyDelay: 0,         
            resetOnMatch: true,     
            deleteOnMatch: false    
        });

        let down_key3 = this.input.keyboard.createCombo(down_word3, {
            resetOnWrongKey: true,  
            maxKeyDelay: 0,         
            resetOnMatch: true,     
            deleteOnMatch: false    
        });

        let down_key4 = this.input.keyboard.createCombo(down_word4, {
            resetOnWrongKey: true,  
            maxKeyDelay: 0,         
            resetOnMatch: true,     
            deleteOnMatch: false    
        });

        this.input.keyboard.on('keycombomatch', (combo, event) => {
            if (combo === down_key || combo === down_key1 || combo === down_key2 || combo === down_key3 || combo === down_key4) { 
                this.move_down = true;
            }  
        });
        //end of block of code for words

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

        if (this.gameOver != true && this.move_up){
            this.dude.moveUp();
            this.set_up_invis();
            this.move_up = false;
        }
        if (this.gameOver != true && this.move_down){
            this.dude.moveDown();
            this.set_down_invis();
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

    set_up_invis (){
        this.up_word_text.visible = false;
        this.up_word_text1.visible = false;
        this.up_word_text2.visible = false;
        this.up_word_text3.visible = false;
        this.up_word_text4.visible = false;

        let int = this.getRandomInt(4);
        console.log('up int: ', int)

        if (int == 0) {
            this.up_word_text.visible = true;
        }
        if (int == 1) {
            this.up_word_text1.visible = true;
        }
        if (int == 2) {
            this.up_word_text2.visible = true;
        }
        if (int == 3) {
            this.up_word_text3.visible = true;
        }
        if (int == 4) {
            this.up_word_text4.visible = true;
        }
    }

    set_down_invis (){
        this.down_word_text.visible = false;
        this.down_word_text1.visible = false;
        this.down_word_text2.visible = false;
        this.down_word_text3.visible = false;
        this.down_word_text4.visible = false;

        let int = this.getRandomInt(4);
        console.log('down int: ', int)

        if (int == 0) {
            this.down_word_text.visible = true;
        }
        if (int == 1) {
            this.down_word_text1.visible = true;
        }
        if (int == 2) {
            this.down_word_text2.visible = true;
        }
        if (int == 3) {
            this.down_word_text3.visible = true;
        }
        if (int == 4) {
            this.down_word_text4.visible = true;
        }
    }

}