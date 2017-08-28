//(function(){
  game.state.add('playgame', { preload:preload, create:create, update: update });

  function preload() {
    game.load.image('background', 'app/assets/background_field.png');
    game.load.image('mole', 'app/assets/mole.png');
    game.load.image('whacked', 'app/assets/whacked_mole.png');
    // game.load.spritesheet('shrub', 'app/assets/shrub.png', 20, 20, 3);
    game.load.audio('sword', 'app/assets/buy.mp3');
  }

  var nextMoleTime = 1000;
  var nextMoleRate = 1000;
  var hitTextOut = 1000;
  var score = 0;
  var timeLeft = 30;
  var sword;

  function create() {
    bg = game.add.sprite(0, 0, 'background');
    bg.events.onInputUp.add(miss, this);
    bg.enableBody = true;
    bg.physicsBodyType = Phaser.Physics.ARCADE;
    bg.inputEnabled = true;

    hitText = game.add.text(200, 200, "", { fontSize: '22px', fill: 'white' });
    scoreBoard = game.add.text(8, 8, "SCORE: " + score, { fontSize: '22px', fill: 'white' });
    timeBoard = game.add.text(8, 38, "Time Left: " + timeLeft, { fontSize: '22px', fill: 'white' });
    moleGroup = game.add.group();
    moleGroup.enableBody = true;
    moleGroup.physicsBodyType = Phaser.Physics.ARCADE;
    moleGroup.createMultiple(50, 'mole');
    // shrub = game.add.sprite(150, 200, 'shrub')
    // shrub.animations.add('sway', [0, 1], 2, true);
    // shrub.animations.play('sway');
    // shrub2 = game.add.sprite(30, 200, 'shrub')
    // shrub2.animations.add('sway', [0, 1], 1, true);
    // shrub2.animations.play('sway');
    // shrub3 = game.add.sprite(90, 120, 'shrub')
    // shrub3.animations.add('sway', [0, 1], 2, true);
    // shrub3.animations.play('sway');
    // shrub4 = game.add.sprite(20, 35, 'shrub')
    // shrub4.animations.add('sway', [0, 1], 1, true);
    // shrub4.animations.play('sway');
    // shrub5 = game.add.sprite(220, 300, 'shrub')
    // shrub5.animations.add('sway', [0, 1], 2, true);
    // shrub5.animations.play('sway');
    sword = game.add.audio('sword');

  }

  function update() {
    timeBoard.text = "Time Left: " +  (timeLeft - Math.floor(game.time.now / 1000));
    hitTextOut-=50;
    if (hitTextOut < 0) {
      hitText.text = "";
    }
    if (game.time.now > nextMoleTime) {
      checkGameOver();
      spawnMole();
    }
  }

  function miss() {
    hitText.text = "MISS";
    hitTextOut = 1000;
  }

function spawnMole () {
  mole = moleGroup.create(getRandomArbitrary(50, 230), getRandomArbitrary(50, 320), 'mole');
  mole.enableBody = true;
  mole.anchor.setTo = (0.5, 0.5);
  mole.inputEnabled = true;
  mole.events.onInputUp.add(whackMole, this);
  nextMoleRate = 1002
  nextMoleTime = game.time.now + nextMoleRate;
  // nextMoleRate = nextMoleRate - 1;
  setTimeout(function() {
    mole.kill();
  }, 1000 / game.rnd.integerInRange(1, 2) * 1.5);
  // game.time.events.add(Phaser.Timer.SECOND * 1, hideMole, this);
}

function whackMole(clicked) {
    clicked.kill();
    score += 100;
    scoreBoard.text = "SCORE: " + score;
    nextMoleRate--;
    var whacked = game.add.sprite(clicked.x, clicked.y, 'whacked');
    setTimeout(function() {
      whacked.kill();
    }, 800);

    var whacked = game.add.sprite(clicked.x, clicked.y, 'whacked');
    setTimeout(function() {
      whacked.kill();
    }, 800);

    // var hitText = game.add.text(30, 30, "KRUNGSRI HIT", { fontSize: '22px', fill: 'white' });
    // setTimeout(function() {
    //   hitText.kill();
    // }, 800);

    hitText.text = "KRUNGSRIHIT";
    hitTextOut = 1000;

    sword.play();
}

function checkGameOver() {
  if (Math.floor(game.time.now / 1000) > 30) {
    gameOver();
  }
}

function gameOver() {
  game.state.start('gameOver');
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}