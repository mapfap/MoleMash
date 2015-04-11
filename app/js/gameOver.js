(function(){
  game.state.add('gameOver', {create: create});

  function create(){
    game.add.text(50, 125, "GAME OVER", { fontSize: '32px', fill: "white"});
  }
})();