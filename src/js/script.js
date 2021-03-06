$(document).ready(function() {
    // jQuery code goes here
	
	function GameWindow() {
		var id = "gameWindow";
		var $window = $('#' + id);
		var music = '22203_newgrounds_overwo.mp3';
		
		return {
			$window: $window,
			id: id,
			music: music
		}
	}

	function BattleWindow() {
		var self = this;
		var id = 'battleWindow';
		var $window = $('#' + id);
		var music = '661012_Space-Battle.mp3';

		var attacker = {
			speed: 10
		};
		var defender = {
			speed: 10
		};

		function actionAttack(attacker, defender) {
			alert('Attack Not Implemented!');
			return;
			
			var damage = attacker.strength * (attacker.strength - defender.defense);
			defender.hp -= damage;
			console.log('%s attacked %s for %s damage!', attacker.name, defender.name, damage);
			//if(defender.hp === 0) {

			//}

		}

		function actionCatch() {
			alert('Catch Not Implemented!');
		}

		var numEscapesAttempted = 0;
		
		function actionRun(attacker, defender) {
			var escapes = false;
			var f = false;
			
			
			if (attacker.speed > defender.speed) {
				escapes = true;
			} else if ((f = ((attacker.speed * 32) / ((defender.speed/4) % 256)) + numEscapesAttempted) > 255) {
				escapes = true;
			} else {
				var min = 0;
				var max = 255;
				var rand = Math.floor(Math.random() * (max - min + 1)) + min;
				if (rand < f) {
					escapes = true;
				}
			}
			
			if (escapes) {
				// escaped
				windowControl.hide(battleWindow);
				windowControl.show(gameWindow);
			} else {
				alert('Can\'t Escape!');
			}
			
			
		}
		
		$window.on('click', 'ul#battlePlayerMenu li', function (e) {
			var menueOption = $(this).text().toLowerCase();

			if(menueOption === 'attack') {
				actionAttack(attacker, defender);
			} else if(menueOption === 'catch') {
				actionCatch();
			} else if(menueOption === 'run') {
				actionRun(attacker, defender);
			}
		});

		return {
			$window: $window,
			id: id,
			music: music
		}
	}

	function GamePlayer(_$player, _gameWindow, _enableBattleRoll) {
		var $player = _$player;
		var x = 0;
		var oldX = 0;
		var y = 0;
		var oldY = 0;
		var gameWindow = _gameWindow;
		var stepCounter = 0;
		var enableBattleRoll = _enableBattleRoll;
		
		function setEnableBattleRoll(val)
		{
			enableBattleRoll = val;
		}

		function getX() {
			return x;
		}

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
			if (!enableBattleRoll) {
			    // done
				return;
			}

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
			rollRandomBattle: rollRandomBattle,
			setEnableBattleRoll: setEnableBattleRoll,
			getX: getX
		}
	}	

	function WindowControl() {
		var self = this;
		this.currentWindow;
		this.audioElement = document.createElement('audio');
		this.audioElement.setAttribute('src', '');
		try {
		    this.settings = JSON.parse(localStorage.getItem('windowControl-settings'));
		    if(!this.settings) {
		    	throw new Error('settings not defined');
		    }
		} catch (e) {
            this.settings = {
            	musicAudio: true
            }
		}
		
		this.audioElement.muted = !this.settings.musicAudio;
		
   
		
		function playMusic(window) {
			this.audioElement.muted = !this.settings.musicAudio;
			this.audioElement.autoplay = true;

			this.audioElement.load()
			this.audioElement.addEventListener("load", function() { 
				 self.audioElement.play(); 
			}, true);

			this.audioElement.src = '../src/artifacts/music/' + window.music;
			
		}

		function toggleMusicAudio() {
			this.settings.musicAudio = !this.settings.musicAudio;
			this.audioElement.muted = !this.settings.musicAudio;
			if (this.settings.musicAudio) {
				$('#mute').addClass('audio-on');
			} else {
				$('#mute').removeClass('audio-on');
			}
			localStorage.setItem('windowControl-settings', JSON.stringify(this.settings));
		}
		
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
			
			this.playMusic(this.currentWindow);
		}

		function hide(displayWindow, effect) {
			if (effect) {
				displayWindow.$window.effect(effect);
			} else {
				displayWindow.$window.hide();
			}
		}

        // toggle music before we call toggle.
        this.settings.musicAudio = !this.settings.musicAudio;
		toggleMusicAudio.call(this);


		return {
			show: show,
			hide: hide,
			currentWindow: this.currentWindow,
			audioElement: this.audioElement,
			settings: this.settings,
			toggleMusicAudio: toggleMusicAudio,
			playMusic: playMusic
		}
	}




	
	
	
	
	
	var gameWindow = new GameWindow();
	var battleWindow = new BattleWindow();
	var windowControl = new WindowControl();

	var player = new GamePlayer($('#player'), gameWindow, true);
	var enemies = [new GamePlayer($('#enemy').clone().show().addClass('enemy-idle').removeClass('enemy-none').appendTo(gameWindow.$window), gameWindow)];
	var anis = [new GamePlayer($('#ball').show().addClass('enemy-idle').removeClass('enemy-none').appendTo(gameWindow.$window), gameWindow)];
	
	var KEY_RIGHT = 39;
	var KEY_UP = 38;
	var KEY_LEFT = 37;
	var KEY_DOWN = 40;
	var PLAYER_WIDTH = 20;
	var PLAYER_HEIGHT = 20;
	var KEY_M = 77;
	var KEY_ENTER = 13;

	$('#intro').on('click', function() {
		$('#introWindow').hide();
		windowControl.show(gameWindow);
	});
	
	$(document).on('keydown', function (event) {
		if (event.keyCode === KEY_RIGHT && windowControl.currentWindow.id === gameWindow.id) {
			player.moveRight();
		} else if (event.keyCode === KEY_LEFT && windowControl.currentWindow.id === gameWindow.id) {
			player.moveLeft();
		} else if (event.keyCode === KEY_UP && windowControl.currentWindow.id === gameWindow.id) {
			player.moveUp();
		} else if (event.keyCode === KEY_DOWN && windowControl.currentWindow.id === gameWindow.id) {
			player.moveDown();
		} else if (event.keyCode === KEY_ENTER) {
			if (windowControl.currentWindow.id === gameWindow.id) {
				windowControl.show(battleWindow, true);
			} else {
				windowControl.show(gameWindow);
			}
		} else if (event.keyCode === KEY_M) {
			windowControl.toggleMusicAudio();
		}else {

		}
		player.render();
	});
	
	var diceRoll = function(sides) {
		return Math.floor(Math.random() * sides) + 1
	};
	
	
	// run enemy logic
	var doEnemyLogic = function() {
		$.each(enemies, function(index, enemy) {
			// move right
			var roll = diceRoll(10);
			if (roll === 3 || roll === 7) {
				
			} else if (roll % 2 === 0) {
				// if even go horizontal
				if (roll > 7) {
					// move right
					enemy.moveRight();
				} else if (roll < 3) {
					// move left
					enemy.moveLeft();
				} else {
					// no move
				}
			} else {
				// if odd go vertical
				if (roll > 7) {
					// move up
					enemy.moveUp();
				} else if (roll < 3) {
					// move down
					enemy.moveDown();
				} else {
					// no move
				}
			}
			enemy.render();
		});
	};	
	
	var ai_enabled = true;
	
	var aiRunner = function() {
		if (ai_enabled) {
			setTimeout(function(){
				doEnemyLogic();
				aiRunner();
			}, 500);
		}
	};
	aiRunner();
	
	var direction = false;
	var doAniLogic = function() {
		$.each(anis, function(index, ani) {
			if(gameWindow.$window.width() <=  ani.getX() + PLAYER_WIDTH) {
				direction = false;
			} else if(ani.getX() <= 0) {
				direction = true;
			} 

			if (direction) {
				ani.moveRight();
			} else {
				ani.moveLeft();
			};

			ani.render();
		});
	};
	
	var aniRunner = function() {
		if (ai_enabled) {
			setTimeout(function(){
				doAniLogic();
				aniRunner();
			}, 60);
		}
	};
	aniRunner();



	$(window).on('resize', function(event) {
		// fix game window not having a size
		$('#gameWindow').css({'width': $('#gameWindow').width() + 'px', 'height': $('#gameWindow').height() + 'px'});
	});
	$(window).trigger('resize');
	
	
});