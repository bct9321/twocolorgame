$(document).ready(function() {
    // jQuery code goes here
	
	function GameWindow() {
		var id = "gameWindow";
		var $window = $('#' + id);
		return {
			$window: $window,
			id: id
		}
	}

	function BattleWindow() {
		var self = this;
		var id = 'battleWindow';
		var $window = $('#' + id);

		var attacker = {
			speed: 1
		};
		var defender = {
			speed: 0
		};

		function actionAttack() {
			alert('Attack Not Implemented!');
			//..attack
		}

		function actionCatch() {
			alert('Catch Not Implemented!');
		}

		var numEscapesAttempted = 0;
		
		function actionRun(attacker, defender) {
			
			if (defender.speed < attacker.speed || ((attacker.speed * 32) / ((efender.speed/4) % 256)) + numEscapesAttempted) {
				// escaped
				windowControl.hide(battleWindow);
				windowControl.show(gameWindow);
			}
			
			
		}
		
		$window.on('click', 'ul#battlePlayerMenu li', function (e) {
			var menueOption = $(this).text().toLowerCase();

			if(menueOption === 'attack') {
				actionAttack();
			} else if(menueOption === 'catch') {
				actionCatch();
			} else if(menueOption === 'run') {
				actionRun(attacker, defender);
			}
		});

		return {
			$window: $window,
			id: id
		}
	}

	function GamePlayer(_gameWindow) {
		var $player = $('#player');
		var x = 0;
		var oldX = 0;
		var y = 0;
		var oldY = 0;
		var gameWindow = _gameWindow;
		var stepCounter = 0;
		function moveRight() {
			oldX = x;
			if (x < gameWindow.$window.width() - PLAYER_WIDTH) {
				x += PLAYER_WIDTH;
			}
			fixPlayerPosition();
			if (x != oldX) {
				rollRandomBattle();
			}
		}
		function moveLeft() {
			oldX = x;
			if (x > 0) {
				x -= PLAYER_WIDTH;
			}
			fixPlayerPosition();
			if (x != oldX) {
				rollRandomBattle();
			}
		}

		function moveUp() {
			oldY = y;
			if (y > 0) {
				y -= PLAYER_HEIGHT;
			}
			fixPlayerPosition();
			if (y != oldY) {
				rollRandomBattle();
			}
		}

		function moveDown() {
			oldY = y;
			if (y < gameWindow.$window.height() - PLAYER_HEIGHT) {
				y += PLAYER_HEIGHT;
			}
			fixPlayerPosition();
			if (y != oldY) {
				rollRandomBattle();
			}
		} 

		function fixPlayerPosition() {
			if (x > gameWindow.$window.width() - PLAYER_WIDTH) {
				x =  gameWindow.$window.width() - PLAYER_WIDTH;
			}
			if (y > gameWindow.$window.height() - PLAYER_HEIGHT) {
				y =  gameWindow.$window.height() - PLAYER_HEIGHT;
			}
			if (y < 0) {
				y = 0;
			}
			if (x < 0) {
				x = 0;
			}
		}

		function randomIntFromInterval(min, max) { // min and max included 
  			return Math.floor(Math.random() * (max - min + 1) + min);
		}

		function rollRandomBattle() {
			var randomNum = randomIntFromInterval(1, 255);
			stepCounter += 192;
			var startBattle;
			startBattle = Boolean(randomNum < stepCounter / 256);
			if (startBattle) {
				stepCounter = 0;
				startBattleSequence();
			}
		}

		function startBattleSequence() {
			windowControl.show(battleWindow);
		}

		function render() {
			$player.css({'left': x, 'top': y});
		}
		return {
			moveRight: moveRight,
			moveLeft: moveLeft,
			moveUp: moveUp,
			moveDown: moveDown,
			render: render,
			rollRandomBattle: rollRandomBattle
		}
	}	

	function WindowControl() {
		this.currentWindow;
		
		function show(displayWindow, fadeIn) {
			if (this.currentWindow) {
				var effect = null;
				//FIXME: Theres probably a smarter way to fo this
				if (displayWindow.id === battleWindow.id) {
					effect = 'explode'
				}
				hide(this.currentWindow, effect);
			}
			
			if (fadeIn) {
				displayWindow.$window.delay(800).fadeIn('slow');
			} else {
				displayWindow.$window.show();
			}
			this.currentWindow = displayWindow;
		}
		function hide(displayWindow, effect) {
			if (effect) {
				displayWindow.$window.effect(effect);
			} else {
				displayWindow.$window.hide();
			}
		}

		return {
			show: show,
			hide: hide,
			currentWindow: this.currentWindow
		}
	}




	
	
	
	
	
	var gameWindow = new GameWindow();
	var battleWindow = new BattleWindow();
	var windowControl = new WindowControl();

	windowControl.show(gameWindow);
	var player = new GamePlayer(gameWindow);

	var KEY_RIGHT = 39;
	var KEY_UP = 38;
	var KEY_LEFT = 37;
	var KEY_DOWN = 40;
	var PLAYER_WIDTH = 20;
	var PLAYER_HEIGHT = 20;
	
	$(document).on('keydown', function (event) {
		if (event.keyCode === KEY_RIGHT && windowControl.currentWindow.id === gameWindow.id) {
			player.moveRight();
		} else if (event.keyCode === KEY_LEFT && windowControl.currentWindow.id === gameWindow.id) {
			player.moveLeft();
		} else if (event.keyCode === KEY_UP && windowControl.currentWindow.id === gameWindow.id) {
			player.moveUp();
		} else if (event.keyCode === KEY_DOWN && windowControl.currentWindow.id === gameWindow.id) {
			player.moveDown();
		} else if (event.keyCode === 13) {
			if (windowControl.currentWindow.id === gameWindow.id) {
				windowControl.show(battleWindow, true);
			} else {
				windowControl.show(gameWindow);
			}
		} else {

		}
		player.render();
	});



	$(window).on('resize', function(event) {
		// fix game window not having a size
		$('#gameWindow').css({'width': $('#gameWindow').width() + 'px', 'height': $('#gameWindow').height() + 'px'});
	});
	$(window).trigger('resize');
	
	
});