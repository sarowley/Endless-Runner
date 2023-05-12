//name:
//sound effect website links:
//https://pixabay.com/sound-effects/click-button-140881/
//https://pixabay.com/sound-effects/appears-142455/
//https://pixabay.com/sound-effects/chicken-sounds-farm-background-sounds-ambient-sounds-143091/
//https://pixabay.com/sound-effects/uplifting-pad-texture-113842/
//https://pixabay.com/sound-effects/brain-damage-148577/

let config = {
    type: Phaser.CANVAS,
    width: 700,
    height: 350,
    pixelArt: true,
    zoom: 2,
    physics:{
        default: "arcade",
        arcade : {
            //debug: true
        }
    },
    scene: [ Load, Menu, Play]
}

let game = new Phaser.Game(config);
//reserve keyboard vars
let keyENTER, keyUP, keyDOWN, keyBACK, facadeCombo, gameOver, clock_check, up_key, down_key;

