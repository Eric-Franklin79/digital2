window.onload = function() {
    
   "use strict";
    Fighter = function(){
    	    this.x = 1100;
    	    this.y = 500;
    	    this.fighter = game.add.sprite( this.x, this.y, 'tux', 'Stance.png');
    	    game.physics.enable(this.fighter, Phaser.Physics.ARCADE);
    	    
    	    this.fighter.anchor.setTo(0.5, 0.5);
    	    this.fighter.scale.x = -1;
    	    this.fighter.body.collideWorld = true;
    	    this.fighter.animations.add('punch', ['punchMid.png', 'punch.png', 'punchRe.png', 'Stance.png'], 10);
    	    this.fighter.animations.add('kick', ['kcikStart.png', 'kick.png', 'kick.png','kickDown.png', 'Stance.png'], 10);
    	    this.fighter.animations.add('dodge', ['dodge.png'], 5, true);
    	    
    	    this.fighter.maxHealth = 200;
    	    this.fighter.health = 200;
    }
    Fighter.prototype.update = function(){
    	    	    
    }
    Tux = function(){
    	    this.x = 100;
    	    this.y = 500;
    	    this.tuxMan = game.add.sprite( this.x, this.y, 'tux', 'Stance.png');
    	    game.physics.enable(this.tuxMan, Phaser.Physics.ARCADE);
    	    this.tuxMan.anchor.setTo(0.5, 0.5);
    	    this.tuxMan.body.collideWorld = true;
    	    this.tuxMan.animations.add('punch', ['punchMid.png', 'punch.png', 'punchRe.png', 'Stance.png'], 10);
    	    this.tuxMan.animations.add('kick', ['kcikStart.png', 'kick.png', 'kick.png','kickDown.png', 'Stance.png'], 10);
    	    this.tuxMan.animations.add('dodge', ['dodge.png'], 5, true);
    	    
    	    this.tuxMan.maxHealth = 200;
    	    this.tuxMan.health = 200;
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
    	     game.load.image( 'health', 'assets/health.png' );
        
    }
    var tuxMan;
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
    var healthbar;
    var dude;
    var Fighter;
    
    function create() {
    	    var background = game.add.tileSprite(0,0, 1300, 755, 'diner');
    	    tuxMan = new Tux(game);
    	    dude = new Fighter()
    	    healthbar = game.add.sprite(0,0,'health');
    	    healthbar.cropEnabled = true;
    	    
    	    
    	   //Time for rounds
    	   // var styleT = { font: "35px Verdana", fill: "#FFFFFF", align: "center" };
    	   // timeText = game.add.text(300, 200, "Click to Start", styleT);
    	    
    	    cursors = game.input.keyboard.createCursorKeys();
    	    game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
    	    pause = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    	    punch = game.input.keyboard.addKey(Phaser.Keyboard.Q);
    	    kick = game.input.keyboard.addKey(Phaser.Keyboard.W);
    	    dodge = game.input.keyboard.addKey(Phaser.Keyboard.E);
    }
    
    function update() {
    	    gameTime = new Date().getTime();
    	    healthbar.crop.width = (tuxMan.health / tuxMan.maxHealth) * healthbar.width;
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
