window.onload = function() {
    
   "use strict";
    
    Tux = function( game){
    	    this.x = 100;
    	    this.y = 400;
    	    this.game = game;
    	    this.tuxMan = game.add.sprite( this.x, this.y, 'tux', 'Stance.png');
    	    game.physics.enable(this.tuxMan, Phaser.Physics.ARCADE);
    	    this.tuxMan.anchor.setTo(0.5, 0.5);
    	    this.tuxMan.body.collideWorld = true;
    	    this.tuxMan.animations.add('punch', ['punchMid.png', 'punch.png', 'punchRe.png', 'Stance.png'], 10);
    	    this.tuxMan.animations.add('kick', ['kcikStart.png', 'kick.png', 'kick.png','kickDown.png', 'Stance.png'], 10);
    	    this.tuxMan.animations.add('dodge', ['dodge.png'], 5, true);
    	    
    	    this.tuxMan.maxHealth = 200;
    }
    Tux.prototype.det = function() {
    	    this.tuxMan.destroy();
    }
    Tux.prototype.fight = function() {
    	    if(dodge.isDown){
    	    	   this.tuxMan.animations.play('dodge');
    	    }
    	    else if(kick.isDown){
    	    	   this.tuxMan.animations.play('kick');    
    	    }
    	    else if(punch.isDown){
    	    	   this.tuxMan.animations.play('punch');
    	    }
    	    else{
    	    	this.tuxMan.loadTexture('tux', 'Stance.png');    
    	    }
    }
    Tux.prototype.move = function() {
    	    if(cursors.left.isDown){
    	    	    this.tuxMan.body.velocity.x = -200;
    	    }
    	    else if(cursors.right.isDown){
    	    	    this.tuxMan.body.velocity.x = 200;
    	    }
    	    else{
    	    	    this.tuxMan.body.velocity.x = 0;
    	    	    //load default texture?
    	    	    //try to get acceleration and deceleration
    	    }
    	    if(cursors.up.isDown){
    	    	    this.tuxMan.body.velocity.y = -200;
    	    }
    }
    
    var game = new Phaser.Game( 1300, 755, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
    	     game.load.atlasJSONHash( 'tux', 'assets/tux.png', 'assets/tux.json' );
    	     game.load.image( 'diner', 'assets/diner.png' );
       
        
    }
    var tuxMan;
    var background;
    var Tux;
    var roundTime = 0;
    var timer;
    var gameTime;
    var rountCount = 1;
    var cursors;
    var timeText;
    var pause;
    var punch;
    var kick;
    var dodge;
    var tuxMan;
    
    function create() {
    	    background = game.add.tileSprite(0,0, 1300, 755, 'diner');
    	    
    	    
    	    
    	    tuxMan = new Tux(game);
    	    
    	    //Time for rounds
    	   // var styleT = { font: "35px Verdana", fill: "#FFFFFF", align: "center" };
    	  //  timeText = game.add.text(300, 200, "Click to Start", styleT);
    	    
    	    cursors = game.input.keyboard.createCursorKeys();
    	    game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
    	    pause = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    	    punch = game.input.keyboard.addKey(Phaser.Keyboard.Q);
    	    kick = game.input.keyboard.addKey(Phaser.Keyboard.W);
    	    dodge = game.input.keyboard.addKey(Phaser.Keyboard.E);
    }
    
    function update() {
    	    gameTime = new Date().getTime();
    	    tuxMan.move();
    	    tuxMan.fight();
    }
    function updateTimer(){
    	    timer = 90 - Math.floor((gameTime-roundTime)*.001);
    	    timeText.x = game.world.centerX;
    	    timeText.y = 10;
    	    timeText.setText(String(timer));
    	    if(timer < 0){roundOver()} 
    }
    function roundOver(){
    	    if(roundCount === 3){
    	    	    //game over
    	    }
    	    else{
    	    	    newRound();
    	    	    rountCount++;
    	    }
    }
    function newRound(){
    	    roundTime = new Date().getTime();
    	//reset sprites
    	//reset health
    	//reset timer
    }
};
