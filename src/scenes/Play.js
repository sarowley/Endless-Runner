class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
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
        this.game_over_text = this.add.tileSprite(0,0, 700, 350, 'game_over').setOrigin(0,0);
        this.game_over_text.setVisible(false); 
        
        this.death_music = this.sound.add('death_music');
        
        this.music = this.sound.add('music');
        this.music.loop = true;
        this.music.play();

        this.click = this.sound.add('click');

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
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(75, 15, this.score, scoreConfig).setOrigin(0.5);

        this.up_word_array = ['up', 'cat', 'space', 'alien', 'dude', 'typing', 'help', 'wallet', 'queue', 'vector', 'sonic', 'water', 'bipedal', 'laptop', 'cowabunga', 'telescope']
        this.down_word_array = ['down', 'dog', 'earth', 'human', 'bummer', 'call', 'attempt', 'jacket', 'poster', 'ring', 'book', 'bimodal', 'computer', 'stack', 'howdy', 'telecommunications']
        this.num = this.getRandomInt(16);
        this.up_word = new KeyComboObject(this.up_word_array[this.num]);
        this.down_word = new KeyComboObject(this.down_word_array[this.num]);

        let wordConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
        }

        this.up_text = this.add.text(350, 15, this.up_word.string, wordConfig).setOrigin(0.5);
        this.down_text = this.add.text(350, 335, this.down_word.string, wordConfig).setOrigin(0.5);

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
        this.speed = -80;
        this.backgroundSpeed = 4;
    }

    update() {

        if (!this.gameOver){
            this.background1.tilePositionX += this.backgroundSpeed;
            }

        if (this.gameOver){
            this.clock = this.time.delayedCall(3000, () => {
                this.game_over_text.setVisible(true);
            }, null, this);
        }

        if (this.gameOver){
            if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
                this.gameOver = false;
                this.death_music.stop();
                this.scene.start('menuScene');    
            }
        }

        if (this.score > this.max_point){
            this.max_point += 100;
            this.min_point += 100;
            this.speed -= 80;
            this.backgroundSpeed += 2;
        }

        this.physics.world.collide(this.dude, this.rockGroup, this.donezo, null, this);

        if (this.gameOver != true && this.move_up){
            this.dude.moveUp();
            this.click.play();
            this.num = this.getRandomInt(16);
            this.up_word.swap_word(this.up_word_array[this.num]);
            this.up_text.text = this.up_word.string;
            this.up_key = this.create_new_up_key(this.up_word.string);
            this.move_up = false;
        }
        if (this.gameOver != true && this.move_down){
            this.dude.moveDown();
            this.click.play();
            this.num = this.getRandomInt(16);
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
        this.death_music.play();
        this.music.stop();
        this.speed = 0;
    }

    addRock(){
        if (this.score < this.max_point && this.score > this.min_point){ 
            let rock = new Rock(this, this.speed, 'enemy');
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
}