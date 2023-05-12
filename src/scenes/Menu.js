class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
    }

    create() {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.background1 = this.add.tileSprite(0,0, 700, 350, 'title').setOrigin(0,0);
        this.tutorial = this.add.tileSprite(0,0, 700, 350, 'tutorial').setOrigin(0,0);
        this.tutorial.setVisible(false);
        this.check = false;

        this.chicken = this.sound.add('chicken');
        this.chicken.loop = true;
        this.chicken.play();

        this.pop = this.sound.add('pop');

        //define keys
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyBACK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.chicken.stop();
            this.pop.play();
            this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyBACK)) {
            if (this.check == false){
                this.tutorial.setVisible(true);
                this.check = true;    
            }
            else if (this.check == true){
                this.tutorial.setVisible(false); 
                this.check = false;   
            }
          }
      }
}