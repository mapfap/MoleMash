game.state.add('menu', { preload:preload, create:create, update:update } );
game.state.start('menu');

var startButton;

function preload() {
  game.load.image('menu', 'app/assets/main_menu.png')
}

function create() {
  // game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  // game.scale.pageAlignVertically = true;
  // game.scale.setScreenSize( true );
  menu = game.add.sprite(0, 0, 'menu');
  menu.events.onInputUp.add(startClick, this);
}

function update() {
  if (game.input.onTap) {
    startClick();
  }
}

function startClick () {
  game.state.start('playgame');
}