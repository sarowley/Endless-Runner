class Rock extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity, texture) {
        super(scene, 700, Phaser.Math.Between(55, 325), texture); 
        
        this.parentScene = scene;

        this.parentScene.add.existing(this);    
        this.parentScene.physics.add.existing(this);   
        this.setVelocityX(velocity);           
        this.setImmovable();                    
        this.newRock = true;             
    }

    update() {
        if(this.newRock && this.x < 100) {
            this.parentScene.addRock(this.parent, this.velocity);
            this.newRock = false;
        }

        if(this.x < -this.width) {
            this.destroy();
        }
    }
}