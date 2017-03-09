
var Character = function(x, y, sprite) {
    // Variables applied to each of our instances go here,
    this.sprite = sprite;
    this.x = x;
    this.y = y;
};

// Draw the character on the screen, required method for game
Character.prototype.render = function() {
    //console.log(this.sprite);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function(x, y, sprite, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    Character.call(this, x, y, sprite);
    this.speed = speed;
};

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt * 100;
};

// Draw the enemy on the screen, required method for game
// Enemy.prototype.render = function() {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, sprite) {
    //this.sprite = 'images/char-boy.png';
    Character.call(this, x, y, sprite);
};

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

// Update the player's position, required method for game
Player.prototype.update = function() {
};


Player.prototype.handleInput = function(code) {
    if (code == 'left') {
        //left move
        if (this.x - HORIZONTAL_MOVE < 0) {
            return;
        }
        this.x -= HORIZONTAL_MOVE;
    } else if (code == 'up') {
        //up move
        if (this.y - VERTICLE_MOVE < 0) {
            this.x = TILE_WIDTH;
            this.y = TILE_HEIGHT;
            return;
        }
        this.y -= VERTICLE_MOVE;
    } else if (code == 'right') {
        //right move
        if (this.x + HORIZONTAL_MOVE > 400) {
            return;
        }
        this.x += HORIZONTAL_MOVE;
    } else if (code == 'down') {
        //down move
        if (this.y + VERTICLE_MOVE > 450) {
            return;
        }
        this.y += VERTICLE_MOVE;
    }
    //console.log(this.y);
};

//constant
var TILE_WIDTH = 200;
var TILE_HEIGHT = 390;
var HORIZONTAL_MOVE = 100;
var VERTICLE_MOVE = 83; 

// Now instantiate your objects.
// Place all player objects in an array called allEnemies
// Place the player object in a variable called player
allEnemies = new Array();
for (var i = 0; i < 20; i++) {
    var enemy1 = new Enemy(-300 * i, 58, 'images/enemy-bug.png', 1);
    var enemy2 = new Enemy(-600 * i, 141, 'images/enemy-bug.png', 2);
    var enemy3 = new Enemy(-800 * i, 224, 'images/enemy-bug.png', 3);
    allEnemies.push(enemy1, enemy2, enemy3);

}

player = new Player(TILE_WIDTH, TILE_HEIGHT, 'images/char-boy.png');


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
