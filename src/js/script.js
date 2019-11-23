$(document).ready(function() {
    // jQuery code goes here
	
	function GameWindow() {
		var $window = $('#gameWindow');
	}

	function GamePlayer() {
		var $player = $('#player');
		var x = 0;
		var y = 0;
		this.moveRight = function () {
			x++;
		}
		this.render = function() {
			$player.css('left', x);
		}
	}	
	
	
	
	
	
	var gameWindow = new GameWindow();
	var player = new GamePlayer();
	
	$(document).on('keydown', function (even) {
		if (event.keyCode === 13) {
			player.moveRight();
			player.render();
		}
	});
	
	
});