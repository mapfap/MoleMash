(function(){
  game.state.add('gameOver', {create: create});

  function create(){
    $('#myModal').modal({
      backdrop: 'static',
      keyboard: false
    })
  }
  
})();