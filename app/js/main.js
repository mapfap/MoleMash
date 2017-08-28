
  var w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      x = w.innerWidth || e.clientWidth || g.clientWidth,
      y = w.innerHeight|| e.clientHeight|| g.clientHeight;

// var clientWidth = function () {  return Math.max(window.innerWidth, document.documentElement.clientWidth);};var clientHeight = function () {  return Math.max(window.innerHeight, document.documentElement.clientHeight);};
var game = new Phaser.Game(300, 400, Phaser.AUTO, 'game-holder');
// var game = new Phaser.Game(280, 380, Phaser.AUTO, 'game-holder');

