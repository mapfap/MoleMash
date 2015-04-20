//(function(){
  game.state.add('playgame', { preload:preload, create:create, update: update });

  function preload() {
    game.load.image('background', 'app/assets/background_field.png');
    game.load.image('mole', 'app/assets/mole.png');
    game.load.spritesheet('shrub', 'app/assets/shrub.png', 20, 20, 3)
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
    shrub = game.add.sprite(150, 200, 'shrub')
    shrub.animations.add('sway', [0, 1], 2, true);
    shrub.animations.play('sway');
    shrub2 = game.add.sprite(30, 200, 'shrub')
    shrub2.animations.add('sway', [0, 1], 1, true);
    shrub2.animations.play('sway');
    shrub3 = game.add.sprite(90, 120, 'shrub')
    shrub3.animations.add('sway', [0, 1], 2, true);
    shrub3.animations.play('sway');
    shrub4 = game.add.sprite(20, 35, 'shrub')
    shrub4.animations.add('sway', [0, 1], 1, true);
    shrub4.animations.play('sway');
    shrub5 = game.add.sprite(220, 300, 'shrub')
    shrub5.animations.add('sway', [0, 1], 2, true);
    shrub5.animations.play('sway');

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
    nextMoleRate--;
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