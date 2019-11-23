$(document).ready(function() {
    // jQuery code goes here
	
	function GameWindow() {
		var $window = $('#gameWindow');
	}

	function GamePlayer() {
		var $player = $('#player');
		var x = 0;
		var y = 0;
		function moveRight() {
			x++;
		}
		function moveLeft() {
			x--;
		}

		function moveUp() {
			y--;
		}

		function moveDown() {
			y++;
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
	
	
	
	
	
	var gameWindow = new GameWindow();
	var player = new GamePlayer();
	var KEY_RIGHT = 39;
	var KEY_UP = 38;
	var KEY_LEFT = 37;
	var KEY_DOWN = 40;
	
	$(document).on('keydown', function (even) {
		if (event.keyCode === KEY_RIGHT) {
			player.moveRight();
		} else if (event.keyCode === KEY_LEFT) {
			player.moveLeft();
		} else if (event.keyCode === KEY_UP) {
			player.moveUp();
		} else if (event.keyCode === KEY_DOWN) {
			player.moveDown();
		} else {

		}
		player.render();
	});
	
	
});