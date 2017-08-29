game.state.add('menu', { preload:preload, create:create } );
game.state.start('menu');

var startButton;

function preload() {
  game.load.image('menu', 'app/assets/main_menu.png')
}

function create() {
  menu = game.add.sprite(0, 0, 'menu');
  menu.events.onInputUp.add(startClick, this);
  // menu.enableBody = true;
  // menu.physicsBodyType = Phaser.Physics.ARCADE;
  menu.inputEnabled = true;
}

function startClick () {
  game.state.start('playgame');
}
