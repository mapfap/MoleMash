//(function(){
  game.state.add('playgame', { preload:preload, create:create, update: update });

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
  var whichHole = getRandomHoleNumber(0,7);
  if (holes[whichHole].populated === false) {
    spawnMole (whichHole);
    holes[whichHole].populated = true;
  } else if (holes[whichHole].populated === true && moleGroup.countLiving() > 8) {
    checkforPlacement();
  }
}

function whackMole(clicked) {
    var holeClicked = [clicked.position.x, clicked.position.y];
    if (holeClicked[0] === 30 && holeClicked[1] === 15) {
      holes[0].populated = false;
    } else if (holeClicked[0] === 220 && holeClicked[1] === 15) {
      holes[1].populated = false;
    } else if (holeClicked[0] === 115 && holeClicked[1] === 125) {
      holes[2].populated = false;
    } else if (holeClicked[0] === 30 && holeClicked[1] === 200) {
      holes[3].populated = false;
    } else if (holeClicked[0] === 220 && holeClicked[1] === 200) {
      holes[4].populated = false;
    } else if (holeClicked[0] === 115 && holeClicked[1] === 300) {
      holes[5].populated = false;
    } else if (holeClicked[0] === 30 && holeClicked[1] === 400) {
      holes[6].populated = false;
    } else if (holeClicked[0] === 220 && holeClicked[1] === 400) {
      holes[7].populated = false;
    }

    clicked.kill();
    score += 100;
    scoreBoard.text = "SCORE: " + score;
}

function checkGameOver() {
  var populated_holes = 0;
  _.forEach(holes, function(hole) {
    if (hole.populated) {
      populated_holes++;
    }
  })
    if (populated_holes > 2) {
      gameOver();
    }
}

function gameOver() {
  game.state.start('gameOver');
}
//})();