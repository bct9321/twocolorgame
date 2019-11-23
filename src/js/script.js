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
		var id = 'battleWindow';
		var $window = $('#' + id);
		return {
			$window: $window,
			id: id
		}
	}

	function GamePlayer(_gameWindow) {
		var $player = $('#player');
		var x = 0;
		var y = 0;
		var gameWindow = _gameWindow;
		function moveRight() {
			if (x < gameWindow.$window.width() - PLAYER_WIDTH) {
				x += PLAYER_WIDTH;
			}
			fixPlayerPosition();
		}
		function moveLeft() {
			if (x > 0) {
				x -= PLAYER_WIDTH;
			}
			fixPlayerPosition();
		}

		function moveUp() {
			if (y > 0) {
				y -= PLAYER_HEIGHT;
			}
			fixPlayerPosition();
		}

		function moveDown() {
			if (y < gameWindow.$window.height() - PLAYER_HEIGHT) {
				y += PLAYER_HEIGHT;
			}
			fixPlayerPosition();
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

		function render() {
			$player.css({'left': x, 'top': y});
		}
		return {
			moveRight: moveRight,
			moveLeft: moveLeft,
			moveUp: moveUp,
			moveDown: moveDown,
			render: render
		}
	}	

	function WindowControl() {
		this.currentWindow;
		
		function show(displayWindow) {
			if (this.currentWindow) {
				//hide.call(this, currentWindow);
				hide(this.currentWindow);
			}
			displayWindow.$window.show();
			this.currentWindow = displayWindow;
		}
		function hide(displayWindow) {
			displayWindow.$window.hide();
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
	
	$(document).on('keydown', function (even) {
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
				windowControl.show(battleWindow);
			} else {
				windowControl.show(gameWindow);
			}
		} else {

		}
		player.render();
	});
	
	
});