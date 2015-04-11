//(function(){
  game.state.add('playgame', { preload:preload, create:create, update: update });
  game.state.start('playgame');

  function preload() {
    game.load.image('background', 'app/assets/background.png');
    game.load.image('mole', 'app/assets/mole.png');
  }

  var nextMoleTime = 1000;
  var nextMoleRate = 1000;
  var score = 0;
  var holes = {};
  createHole(0, 30, 15);
  createHole(1, 220, 15);
  createHole(2, 115, 125);
  createHole(3, 30, 200);
  createHole(4, 220, 200);
  createHole(5, 115, 300);
  createHole(6, 30, 400);
  createHole(7, 220, 400);

  function create() {
    game.add.sprite(0, 0, 'background');
    scoreBoard = game.add.text(8, 8, "SCORE: " + score, { fontSize: '32px', fill: 'white' });
    moleGroup = game.add.group();
    moleGroup.enableBody = true;
    moleGroup.physicsBodyType = Phaser.Physics.ARCADE;
    moleGroup.createMultiple(50, 'mole');
  }

  function update() {
    if (game.time.now > nextMoleTime) {
      checkGameOver();
      checkforPlacement();
    }

  }

function spawnMole (number) {
  mole = moleGroup.create(holes[number].xCoord, holes[number].yCoord, 'mole');
  mole.enableBody = true;
  mole.anchor.setTo = (0.5, 0.5);
  mole.inputEnabled = true;
  mole.events.onInputUp.add(whackMole, this);
  nextMoleTime = game.time.now + nextMoleRate;
  nextMoleRate = nextMoleRate - 1;
}

function getRandomHoleNumber (min, max) {
  return Math.floor(Math.random() * ((max + 1) - min) + min);
}
function createHole(num, x, y) {
   var newHole = {};
   newHole['xCoord'] = x;
   newHole['yCoord'] = y;
   newHole['populated'] = false;
   holes[num] = newHole;
}
function checkforPlacement () {
  var whichHole = getRandomHoleNumber(0,5);
  if (holes[whichHole].populated === false) {
    spawnMole (whichHole);
    holes[whichHole].populated = true;
  } else if (holes[whichHole].populated === true && moleGroup.countLiving() > 8) {
    checkforPlacement();
  }
}

function whackMole(clicked) {
    clicked.kill();
    score += 100;
    scoreBoard.text = "SCORE: " + score
    console.log(poin)
}

function checkGameOver() {
  if (holes[0].populated === true &&
      holes[1].populated === true &&
      holes[2].populated === true &&
      holes[3].populated === true &&
      holes[4].populated === true &&
      holes[5].populated === true &&
      holes[6].populated === true &&
      holes[7].populated === true
    ) {
    gameOver();
  }
}

function gameOver() {
  alert('game over');
}
//})();