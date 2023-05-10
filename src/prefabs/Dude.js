class Dude extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.moveSpeed = 100;
    }

    moveUp(){
        if (this.y > 75){
            this.y -= this.moveSpeed;
        }
    }
    moveDown(){
        if (this.y < 275){
            this.y += this.moveSpeed;
        }
    }
    moveLeft(){
        this.x -= 5
    }
}