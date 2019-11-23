<body style="background-color: black; width:100%;  height:100%; margin:0 ">
<!-- your content will go there..  -->
 <style>
	#battlePlayerMenu {
		background:#ffffff70;
		width:96px;
		height:96px;
		margin: 0;
		padding: 0;
		flex: 1;
		list-style-type: none;
	}
 
	#battlePlayerMenu li:hover {
		background: #ffffffc9;
	}
 </style>
 <div id="introWindow" style="width:100%; height:100%; position: relative;">
	<button id="intro" style="width: 100%; margin:auto; margin-top: 20%">
		Start Game
	</button>
 </div>
 
 <div id="gameWindow" style="background: yellow; width:100%; height:100%; position: relative; display: none;">
	<div id="player" style="background:red; width:20px; height:20px; position: absolute; left: 0; top: 0;">
		
	</div>
 </div>

 <div id="battleWindow" style="
	background-image: url(../src/img/battleBG.png);
    background-size: 2000px 1200px;
    background-position: -700px 0px;
    background-repeat: no-repeat;
    width: 600px;
    height: 400px;
    position: relative;
	display: none;">
	<div id="lowerArea" style="width:100%; position: absolute; bottom: 0px; height: 96px; display:flex;">
		<div id="battlePlayer" style="background-image: url(../src/img/monster/1-rear.png); width:96px; height:96px;">
			
		</div>
		<ul id="battlePlayerMenu" style="">
			<li>Attack</li>
			<li>Catch</li>
			<li>Run</li>
		</ul>

	</div>
	<div id="topArea">
		<div id="battleEnemy" style="background-image: url(../src/img/monster/1-front.png); width:96px; height:96px; position: absolute; right: 100px; top: 130px;">
		</div>
	</div>
 </div>
 
</body>

</html>