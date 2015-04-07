//(function(){
  game.state.add('playgame', { preload:preload, create:create, update: update });
  game.state.start('playgame');

  function preload() {
    game.load.image('background', 'app/assets/background.png');
    game.load.image('mole', 'app/assets/mole.png');
  }

  var nextMoleTime = 1000;
  var nextMoleRate = 1000;
  var holes = {};
  createHole(0, 30, 15);
  createHole(1, 220, 15);
  createHole(2, 115, 125);
  createHole(3, 30, 200);
  createHole(4, 220, 200);
  createHole(5, 115, 300);
  createHole(6, 30, 400);
  createHole(7, 220, 400)

  function create() {
    game.add.sprite(0, 0, 'background');
  }

  function update() {
    if (game.time.now > nextMoleTime) {
      checkGameOver();
      checkforPlacement();
    }

  }

function spawnMole (number) {
  game.add.sprite(holes[number].xCoord, holes[number].yCoord, 'mole')
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
    console.log('spawning on hole ' + whichHole);
  } else {
    console.log('recuuuursion');
    checkforPlacement();
  }
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