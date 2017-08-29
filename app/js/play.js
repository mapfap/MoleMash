(function(){
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
    game.load.image('hole', 'app/assets/stage_hole_no_stroke.png');
    game.load.image('holeTop', 'app/assets/stage_hole_for_character_hide.png');
    game.load.image('hammer', 'app/assets/object_hammer.png');
    game.load.audio('sword', 'app/assets/buy.mp3');
  }

  var nextMoleTime = 1000;
  var nextMoleRate = 1000;
  var hitTextOut = 1000;
  var score = 0;
  var gameTime = 0;
  var timeLeft = 30;
  var sword;
  var holes = []
  var holeTops = []
  var holeWidth = game.width / 4;
  var combo = 0;


  function create() {
    bg = game.add.sprite(0, 0, 'background');
    bg.scale.setTo(0.1, 0.1);
    bg.anchor.setTo(0, 0);
    bg.height = game.height;
    bg.width = game.width;
    bg.events.onInputUp.add(miss, this);
    bg.enableBody = true;
    bg.physicsBodyType = Phaser.Physics.ARCADE;
    bg.inputEnabled = true;


    holeWidth = game.width / 4;

    holes = [];
    holes.push(new Phaser.Point(game.width / 7, game.height / 3));
    holes.push(new Phaser.Point(game.width / 1.5, game.height / 2.2));
    holes.push(new Phaser.Point(game.width / 3, game.height / 1.9));
    holes.push(new Phaser.Point(game.width / 5.98, game.height / 1.4));
    holes.push(new Phaser.Point(game.width / 1.4, game.height / 1.36));
    holes.push(new Phaser.Point(game.width / 2, game.height / 1.1));

    holes.forEach(function(hole) {
      spawnHole(hole.x, hole.y);
    });

    hitText = game.add.text(game.width/2, game.height/4, "", { fontSize: '22px', fill: 'white' });
    hitText.anchor.setTo(0.5, 0.5);
    scoreBoard = game.add.text(10, 10, "SCORE: " + score, { fontSize: '22px', fill: 'white' });
    timeBoard = game.add.text(10, 40, "Time Left: " + timeLeft, { fontSize: '22px', fill: 'white' });

    sword = game.add.audio('sword');
    game.world.sendToBack(bg);
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

  function arrangeStuffs() {
    holeTops.forEach(function(holeTop) {
      game.world.bringToTop(holeTop);
    });
  }

  function miss(clicked) {
    hitText.text = "MISS";
    hitTextOut = 1000;
    combo = 0;
    hamming(game.input.pointer1.x, game.input.pointer1.y);

  }

  function hamming(x, y) {
    var hammer = game.add.sprite(x+40, y+40, 'hammer');
    hammer.anchor.setTo(1, 1);
    hammer.scale.setTo(0.2, 0.2);
    game.add.tween(hammer).to( { angle: -10 }, 50, Phaser.Easing.Exponential.Out, true);
    setTimeout(function() {
      hammer.kill();
    }, 300);
  }

  function spawnHole(x, y) {
    hole = game.add.sprite(x, y, 'hole');
    hole.anchor.setTo(0.5, 0.5);
    hole.width = holeWidth;
    hole.height = hole.width / 3.6;
    holeTop = game.add.sprite(hole.x, hole.y+20, 'holeTop');
    holeTop.width = hole.width+10;
    holeTop.height = hole.height*2;
    holeTop.anchor.setTo(0.5, 0.5);
    holeTops.push(holeTop);
    
    game.world.sendToBack(hole);
    arrangeStuffs()
  }
  function spawnMole () {
    tweenSize = game.height/100;
    variatedMascot = game.rnd.integerInRange(1, 4);
    variatedHole = holes[game.rnd.integerInRange(0, holes.length-1)];
    mole = game.add.sprite(variatedHole.x, variatedHole.y + tweenSize, 'mole' + variatedMascot);
    mole.enableBody = true;
    mole.anchor.setTo(0.5, 0.5);
    mole.inputEnabled = true;
    mole.width = hole.width;
    mole.height = mole.width*3;

    mole.events.onInputUp.add(whackMole, this);
    nextMoleRate = 1002
    nextMoleTime = game.time.now + nextMoleRate;
    
    var bounce = game.add.tween(mole);
    bounce.to({ y: variatedHole.y - tweenSize }, 100, Phaser.Easing.Bounce.In);
    bounce.start();

    setTimeout(function() {
      var runaway = game.add.tween(mole);
      runaway.to({ y: variatedHole.y + tweenSize }, 100, Phaser.Easing.Bounce.Out);
      runaway.start();
    }, 300);

    setTimeout(function() {
      mole.kill();
    }, 1000 / game.rnd.integerInRange(1, 2) * 1.5);
    arrangeStuffs() 
  }

  function whackMole(clicked) {
      clicked.kill();
      
      // nextMoleRate--;

      var whacked = game.add.sprite(clicked.x, clicked.y, 'whacked' + variatedMascot);
      whacked.anchor.setTo(0.5, 0.5);
      whacked.scale.setTo(0.2, 0.2);

      setTimeout(function() {
        whacked.kill();
      }, 800);

      combo++;
      score += combo;
      scoreBoard.text = "SCORE: " + score;

      if (combo > 1) {
        hitText.text = "COMBOx" + combo;
      } else {
        hitText.text = "KRUNGSRIHIT";
      }
      hitTextOut = 1000;

      arrangeStuffs()
      hamming(game.input.pointer1.x, game.input.pointer1.y);

      sword.play();
  }

  function checkGameOver() {
    if (Math.floor(game.time.now / 1000) >= gameTime) {
      gameOver();
    }
  }

  function gameOver() {
    game.state.start('gameOver');
  }
})();