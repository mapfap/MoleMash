game.state.add('menu', {create:create});
game.state.start('menu');

var startButton;

function create() {
  startButton = game.add.button(50, 125, 'start', startClick, this);
}

function startClick () {
  game.state.start('playgame');
}