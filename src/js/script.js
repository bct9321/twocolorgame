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

	function GamePlayer() {
		var $player = $('#player');
		var x = 0;
		var y = 0;
		function moveRight() {
			if (x < GAME_WIDTH - PLAYER_WIDTH) {
				x++;
			}
		}
		function moveLeft() {
			if (x > 0) {
				x--;
			}
		}

		function moveUp() {
			if (y > 0) {
				y--;
			}
		}

		function moveDown() {
			if (y < GAME_HEIGHT - PLAYER_HEIGHT) {
				y++;
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
	var player = new GamePlayer();
	var KEY_RIGHT = 39;
	var KEY_UP = 38;
	var KEY_LEFT = 37;
	var KEY_DOWN = 40;
	var GAME_WIDTH = 200;
	var GAME_HEIGHT = 200;
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