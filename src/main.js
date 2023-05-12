//name: Sean Rowley
//game title: Keyboard Quest: Runless Ender
//approx hours: 15 hours
//creative tilt: I'm actually really proud of myself for figuring out how to make the type to move up and down actually work the way I wanted it to.
//originally I was just going to brute force it with really really disgusting code when I couldn't figure out how to make it do what I wanted, but then I went to Nathan's office hours
//and he helped me out with making a class to put in the prefabs so it can give random words that you need to type to move up and down. I actually was able to do
//what I set out to do when making a game, and I'm really happy with that.
//I'm also pretty happy that I made the game look decent enough, because I messed around with gradients for the title and menu screens, and really like how those look
//and I also used like an old-timey, make a 2-d thing look 3-d for my main scrolling background. And for someone who is not good at art I'm happy with how everything turned out.

//more in depth credits
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
        }
    },
    scene: [ Load, Menu, Play]
}

let game = new Phaser.Game(config);

let keyENTER, keyUP, keyDOWN, keyBACK, facadeCombo, gameOver, clock_check, up_key, down_key;

