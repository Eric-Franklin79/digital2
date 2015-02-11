window.onload = function() {
    
   "use strict";
    Fighter = function(){
    	    this.x = 1200;
    	    this.y = 500;
    	    this.health = 500;
    	    this.actionFin = true;
    	    this.fighter = game.add.sprite( this.x, this.y, 'tux', 'Stance.png');
    	    game.physics.enable(this.fighter, Phaser.Physics.ARCADE);
    	    
    	    this.fighter.anchor.setTo(0.5, 0.5);
    	    this.fighter.scale.x = -1;
    	    this.fighter.body.collideWorldBounds = true;
    	    this.fighter.animations.add('punch', ['punchMid.png', 'punch.png', 'punchRe.png', 'Stance.png'], 10);
    	    this.fighter.animations.add('kick', ['kcikStart.png', 'kick.png', 'kick.png','kickDown.png', 'Stance.png'], 10);
    	    this.fighter.animations.add('dodge', ['dodge.png'], 5, true);
    	    
    	    this.fighter.maxHealth = 500;
    	    
    }
    Fighter.prototype.reset = function(){
    	    this.fighter.reset(this.x, this.y, 200);
    }
    Fighter.prototype.die = function(){
    	    this.fighter.body.rotation += 30;
    	    this.fighter.kill();
    }
    Fighter.prototype.update = function(){
    	    this.fighter.body.collideWorldBounds = true;
    	    this.fighter.health = this.health;
    	    this.fight = Math.random()*(6-0);
    	    this.move = Math.random()*(6-0);
    	    
    	    
    	    if((Math.floor((gameTime - roundTime)*.01)%5=== 0)){
    	    	    
    	    	    
		    if(this.move < 2){
			    this.fighter.body.velocity.x = 0;
		    }
		    else if(this.move < 4){
			    this.fighter.body.velocity.x = 100;
			    if(this.fighter.x === 1300){
				    this.fighter.body.velocity.x = 0;
			    }
		    }
		    else{
			  this.fighter.body.velocity.x = -300;
			    if(this.fighter.x - tuxMan.tuxMan.x < 250){
				 if(this.fight < 4){
				 	this.fighter.animations.play('punch');	 
				 }
				 else{
				 	this.fighter.animations.play('kick'); 
				 }
				 dudeFighting = true;
			    }
			    dudeFighting = false;
		    }
    	    }
    }
    Tux = function(){
    	    this.x = 100;
    	    this.y = 500;
    	    this.tuxMan = game.add.sprite( this.x, this.y, 'tux', 'Stance.png');
    	    game.physics.enable(this.tuxMan, Phaser.Physics.ARCADE);
    	    this.tuxMan.anchor.setTo(0.5, 0.5);
    	    this.tuxMan.body.collideWorldBounds = true;
    	    
    	    this.tuxMan.animations.add('punch', ['punchMid.png', 'punch.png', 'punchRe.png', 'Stance.png'], 10);
    	    this.tuxMan.animations.add('kick', ['kcikStart.png', 'kick.png', 'kick.png','kickDown.png', 'Stance.png'], 10);
    	    this.tuxMan.animations.add('dodge', ['dodge.png'], 5, true);
    	    
    	    this.tuxMan.maxHealth = 200;
    	    this.tuxMan.health = 200;
    }
    Tux.prototype.reset = function(){
    	    this.tuxMan.reset(this.x, this.y, 200);
    }
    Tux.prototype.det = function() {
    	    this.tuxMan.destroy();
    }
    Tux.prototype.fight = function() {
    	    if(dodge.isDown){
    	    	   this.tuxMan.animations.play('dodge');
    	    	   tuxFighting = true;
    	    }
    	    else if(kick.downDuration(250)){
    	    	   this.tuxMan.animations.play('kick');    
    	    	   tuxFighting = true;
    	    }
    	    else if(punch.downDuration(250)){
    	    	   this.tuxMan.animations.play('punch');
    	    	   tuxFighting = true;
    	    }
    	    else{
    	    	this.tuxMan.loadTexture('tux', 'Stance.png');    
    	    	tuxFighting = false;
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
    	    	    this.tuxMan.body.velocity.y = -1000;
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
    var roundTime = new Date().getTime();;
    var timer = 90;
    var gameTime;
    var roundCount = 1, winCount = 0;
    var cursors;
    var timeText, roundTimeText;
    var pause;
    var punch;
    var kick;
    var dodge;
    var tuxMan;
    var healthbar, fighterHealthbar;
    var dude;
    var Fighter;
    var fighterHit = false, dudeFighting = false, tuxFighting = false;
    
    function create() {
    	    game.physics.startSystem(Phaser.Physics.ARCADE);
    	    game.physics.arcade.gravity.y = 1000;
    	    var background = game.add.tileSprite(0,0, 1300, 755, 'diner');
    	    game.world.setBounds(0,0, 1300, 755);
    	    
    	    healthbar = game.add.sprite(0,25,'health');
    	    fighterHealthbar = game.add.sprite(800,25,'health');
    	    
    	    //Create all the text that we need
    	    var styleT = { font: "bold 50px Verdana", fill: "#000000", align: "center" };
    	    roundTimeText = game.add.text(550, 10, String(timer), styleT);
    	    var styleH = { font: "20px Verdana", fill: "#000000", align: "center" };
    	    var punchText = game.add.text(350, 175, "Q - Punch", styleH);
    	    var kickText = game.add.text(500, 175, "W - Kick", styleH);
    	    var dodgeText = game.add.text(650, 175, "E - Dodge", styleH);
    	    var moveText = game.add.text(800, 175, "<--/--> - move left/right", styleH);
    	    
    	    //Create the keys that we need to use cursors, space, Q, W, E
    	    cursors = game.input.keyboard.createCursorKeys();
    	    game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
    	    pause = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    	    punch = game.input.keyboard.addKey(Phaser.Keyboard.Q);
    	    kick = game.input.keyboard.addKey(Phaser.Keyboard.W);
    	    dodge = game.input.keyboard.addKey(Phaser.Keyboard.E);
    	    
    	    tuxMan = new Tux(game);
    	    dude = new Fighter()
    	    
    	    
    }
    
    function update() {
    	    gameTime = new Date().getTime();
    	    if(game.physics.arcade.collide(tuxMan.tuxMan, dude.fighter)){
    	    	hit();	    
    	    }
    	    
    	    tuxMan.move();
    	    tuxMan.fight();
    	    dude.update();
    	    updateTimer();
    }
    function updateTimer(){
    	    timer = 90 - Math.floor((gameTime-roundTime)*.001);
    	    roundTimeText.x = game.world.centerX;
    	    roundTimeText.y = 10;
    	    roundTimeText.setText(String(timer));
    	    if(timer < 0){roundOver()} 
    }
    function roundOver(){
    	    if((roundCount === 3)||(winCount == 2)){
    	    	    gameOver();
    	    }
    	    else{
    	    	    newRound();
    	    	    roundCount++;
    	    }
    }
    function newRound(){
    	    roundTime = new Date().getTime();
    	    tuxMan.reset();
    	    dude.reset();
    	    fighterHealthbar.reset(800,25);
    	    healthbar.reset(0, 25);
    }
    function gameOver(){
    	    if(winCount == 2){
    	    	    //win condition
    	    }
    	    else{
    	    	    //loose condition
    	    }
    }
    function hit(){
    	 if(dudeFighting){
    	 	healthbar.x -= 20;	 
    	 }
    	 if(dodge.isDown){
    	 	 healthbar.x -= 5;  
    	 }
    	 else if(punch.downDuration(10) || kick.downDuration(10)){
    	 	 fighterHealthbar.x += 20;  
    	 	 dude.health -= 20;
    	 	 if(dude.health === 0){
    	 	 	dude.die();
    	 	 	roundOver();
    	 	 }
    	 }
    	 fighterHit = true;
    	 
    }
};
