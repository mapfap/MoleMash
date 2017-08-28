//(function(){
  game.state.add('playgame', { preload:preload, create:create, update: update });

  function preload() {
    game.load.image('background', 'app/assets/stage_background.png');
    game.load.image('mole1', 'app/assets/character_1_1.png');
    game.load.image('whacked1', 'app/assets/character_1_2.png');
    game.load.image('mole2', 'app/assets/character_2_1.png');
    game.load.image('whacked2', 'app/assets/character_2_2.png');
    game.load.image('mole3', 'app/assets/character_3_1.png');
    game.load.image('whacked3', 'app/assets/character_3_2.png');
    game.load.image('mole4', 'app/assets/character_4_1.png');
    game.load.image('whacked4', 'app/assets/character_4_2.png');
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
    bg.scale.setTo(0.1,0.1);
    bg.anchor.setTo = (0, 0);
    bg.height = game.height;
    bg.width = game.width;
    bg.events.onInputUp.add(miss, this);
    bg.enableBody = true;
    bg.physicsBodyType = Phaser.Physics.ARCADE;
    bg.inputEnabled = true;

    hitText = game.add.text(200, 200, "", { fontSize: '22px', fill: 'white' });
    scoreBoard = game.add.text(8, 8, "SCORE: " + score, { fontSize: '22px', fill: 'white' });
    timeBoard = game.add.text(8, 38, "Time Left: " + timeLeft, { fontSize: '22px', fill: 'white' });
    // moleGroup = game.add.group();
    // moleGroup.enableBody = true;
    // moleGroup.physicsBodyType = Phaser.Physics.ARCADE;
    // moleGroup.createMultiple(50, 'mole');
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

  variatedMascot = game.rnd.integerInRange(1, 4);

  mole = game.add.sprite(getRandomArbitrary(50, game.width - 200), getRandomArbitrary(50, game.height - 200), 'mole' + variatedMascot);
  mole.enableBody = true;
  mole.anchor.setTo = (0.5, 0.5);
  mole.inputEnabled = true;
  mole.scale.setTo(0.2, 0.2);
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
    score++;
    scoreBoard.text = "SCORE: " + score;
    nextMoleRate--;

    var whacked = game.add.sprite(clicked.x, clicked.y, 'whacked' + variatedMascot);
    whacked.anchor.setTo = (0.5, 0.5);
    whacked.scale.setTo(0.2, 0.2);
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
  if (Math.floor(game.time.now / 1000) >= 30) {
    gameOver();
  }
}

function gameOver() {
  game.state.start('gameOver');
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}