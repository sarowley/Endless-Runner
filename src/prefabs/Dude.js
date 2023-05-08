class Dude extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.moveSpeed = 50;
    }

    moveUp(){
        if (this.y > 200){
            this.y -= this.moveSpeed;
        }
    }
    moveDown(){
        if (this.y < 500){
            this.y += this.moveSpeed;
        }
    }
}