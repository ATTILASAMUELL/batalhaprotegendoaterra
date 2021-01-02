(function(){

	//canvas
	var cnv = document.querySelector('canvas')
	var ctx = cnv.getContext('2d')




	// Recursos do jogo


	//arrays:
	var sprites = [];

	var nave = [];

	var missels = [];

	var assetsToLoad =[];

	//sprites
	var background = new Sprite(0,0,600,500,0,0);
	sprites.push(background);

	//nave
	var defender = new Sprite(0,0,82,66,185,400);
	nave.push(defender);



	//imagem:
	var img = new Image();
	img.addEventListener('load', loadHandler,false);
	img.src = "imagens/espaco2.jpg";
	assetsToLoad.push(img);

	var nav = new Image();
	nav.src = 'imagens/nave.png';


	var misse = new Image();
	misse.src = 'imagens/missel.png';


	//contador de recursos
	var loadedAssets = 0;

	//entradas

	var LEFT = 37, RIGHT = 39, ENTER = 13, SPACE = 32;


	//Direções
	var mvLeft = mvRight = shoot = spaceIsDown = false;


	// Estados do jogo

	var LOADING = 0, PLAYING= 1, PAUSED = 2, OVER = 3;
	var gameState = LOADING;


	//Evento teclado

	window.addEventListener('keydown', function(e){
		var key = e.keyCode;
		switch(key){
			case LEFT:
				mvLeft = true;
				break;
			case RIGHT:
				mvRight = true;
				break;

			case SPACE:
				if(!spaceIsDown){
					shoot = true;
					spaceIsDown = true;
				}
				break;
		}

	},false);

	window.addEventListener('keyup', function(e){
		var key = e.keyCode;
		switch(key){
			case LEFT:
				mvLeft = false;
				break;
			case RIGHT:
				mvRight = false;
				break;
			case ENTER:
				if(gameState !== PLAYING){
					gameState = PLAYING;

				} else {
					gameState = PAUSED;
				}
				break;
			case SPACE:
					spaceIsDown = false;
				
				break;
		}

	},false);







	// funções

	function  loadHandler(){
		loadedAssets++;
		if(loadedAssets === assetsToLoad.length){
			img.removeEventListener('load', loadHandler,false);

			// inicia o jogo
			gameState = PAUSED;
		}

	}
	

	function loop(){
		requestAnimationFrame(loop,cnv);

		// define as ações com base no estado do jogo

		switch(gameState){
			case LOADING:
				console.log('loading...');
				break;
			case PLAYING:
				update();
				break;
		}
		render();
	}

	function update(){
		//atualização movimento jogo
		if(mvLeft && !mvRight){
			defender.x += -5;
		}
		if(mvRight && !mvLeft){
			defender.x += 5;
		}

		if(!mvLeft && !mvRight){
			defender.x += 0;
		}
		if(shoot){
			fireMissile();
			shoot = false;
		}
		//defender.x = Math.max(0,Math.min(cnv.width - defender.width, defender.x+ defender.vx))

		if(defender.x < 0){
			defender.x = 0;
		}
		for (var i in missels){
			var t = missels[i];
			t.y += -8;
		}




		
	}
	function fireMissile(){
		var missile = new Sprite(0,0,36,53,defender.centerX() - 4, defender.y - 13);
		missile.vy = -8;

		missels.push(missile);

		
	}

	function render(){
		// limpar tela
		ctx.clearRect(0,0,cnv.width, cnv.height);
		if(sprites.length !== 0){
			for(var i in sprites){
				var spr = sprites[i];
				ctx.drawImage(img,spr.sourceX, spr.sourceY,spr.width,spr.height,Math.floor(spr.x),Math.floor(spr.y),spr.width,spr.height);
			}
		}
		if(nave.length !== 0){
			for(var i in nave){
				var sp = nave[i];
				ctx.drawImage(nav,sp.sourceX, sp.sourceY,sp.width,sp.height,Math.floor(sp.x),Math.floor(sp.y),sp.width,sp.height);
			}
		}
		if(missels.length !== 0){
			for(var i in missels){
				var mi = missels[i];
				ctx.drawImage(misse,mi.sourceX, mi.sourceY,mi.width,mi.height,Math.floor(mi.x),Math.floor(mi.y),mi.width,mi.height);
			}
		}

		
		
	}

	loop();






}());