//(function(){
  game.state.add('playgame', { preload:preload, create:create, update: update });

  function preload() {
    game.load.image('background', 'app/assets/background.png');
    game.load.image('mole', 'app/assets/mole.png');
  }

  var nextMoleTime = 1000;
  var nextMoleRate = 1000;
  var score = 0;

  function create() {
    game.add.sprite(0, 0, 'background');
    scoreBoard = game.add.text(8, 8, "SCORE: " + score, { fontSize: '22px', fill: 'white' });
    moleGroup = game.add.group();
    moleGroup.enableBody = true;
    moleGroup.physicsBodyType = Phaser.Physics.ARCADE;
    moleGroup.createMultiple(50, 'mole');
  }

  function update() {
    if (game.time.now > nextMoleTime) {
      checkGameOver();
      spawnMole();
    }
  }

function spawnMole () {
  mole = moleGroup.create(getRandomArbitrary(50, 230), getRandomArbitrary(50, 320), 'mole');
  mole.enableBody = true;
  mole.anchor.setTo = (0.5, 0.5);
  mole.inputEnabled = true;
  mole.events.onInputUp.add(whackMole, this);
  nextMoleTime = game.time.now + nextMoleRate;
  nextMoleRate = nextMoleRate - 1;
}

function whackMole(clicked) {
    clicked.kill();
    score += 100;
    scoreBoard.text = "SCORE: " + score;
}

function checkGameOver() {
  if (moleGroup.countLiving() > 1) {
    gameOver();
  }
}

function gameOver() {
  game.state.start('gameOver');
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
//})();