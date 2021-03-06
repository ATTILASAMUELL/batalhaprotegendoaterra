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

	var aliens =[];


	//  Duas variaveis para identificar a criação dos aliens:
	var alienFrequency = 100;
	var alienTime = 0;


	//sprites
	var background = new Sprite(0,0,600,500,0,0);
	sprites.push(background);

	//nave
	var defender = new Sprite(0,0,82,66,185,400);
	nave.push(defender);



	//imagens:
	var img = new Image();
	img.addEventListener('load', loadHandler,false);
	img.src = "imagens/espaco2.jpg";
	assetsToLoad.push(img);

	var nav = new Image();
	nav.src = 'imagens/nave.png';


	var misse = new Image();
	misse.src = 'imagens/missel.png';

	var alienss = new Image();
	alienss.src = 'imagens/alien.png';


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
				console.log('Desenvolvido - por: ATTILA SAMUELL NUNES TABORY')
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
		//dispara canhao
		if(shoot){
			criandoMissel();
			shoot = false;
		}
		//defender.x = Math.max(0,Math.min(cnv.width - defender.width, defender.x+ defender.vx))

		if(defender.x < 0){
			defender.x = 0;
		}
		if(defender.x + defender.width > cnv.width){
			defender.x = 318;
		}

		// atualizando posição dos missels
		for (var i in missels){
			var t = missels[i];
			t.y += t.vy;
			if(t.y < -13){

				removeObjetos(t,missels)


			}
		}

		// Encremento do alienTimer:
		alienTime ++;

		if (alienTime === alienFrequency){
			funcaocriaalien();
			alienTime = 0;


			//ajuste na frequencia de criação de alien:

			if(alienFrequency > 2){
				alienFrequency --;
			}

		}

		//atualizando posição dos aliens:

		for (var i in aliens){
			var alienn = aliens[i];
			if (alienn.STATE !== alienn.EXPLODED){
				alienn.y+= alienn.vy;
				//ALTERANDO POSIÇÃO QUANDO FOR CRAZY ESTADO DO ALIEN
				if(alienn.state === alienn.CRAZY){
					if(alienn.x >310|| alienn.x <0){
						alienn.vx *= -1;
					}
					alienn.x += alienn.vx;
				}
			}
			//confere se algum alien chegou a terra
			if(alienn.y > cnv.height + alienn.height){
				// fim do movimentação dos aliens
				
				gameState = OVER;

		}
		}

		
			
	}
	//criação dos missels funçao
	function criandoMissel(){
		var missile = new Sprite(0,0,36,53,defender.centerX() - 15, defender.y - 13);
		missile.vy = -8;

		missels.push(missile);

		
	}

	//remove os missels e alienigenas, para não lotar memoria

	function removeObjetos(objetoRemove,array){
		let i = array.indexOf(objetoRemove);
		if (i !== -1){
			array.splice(i, 1);
		} 
	}
	function funcaocriaalien(){
		var alienPosicao = (Math.floor(Math.random()* 4 )) * 100;
		
		var alien = new Alien(0,0, 90,68,alienPosicao,- 70);
		alien.vy = 1

		//otimização do alien : ALTERANDO A VELOCIDADE DO ALIEN
		if(Math.floor(Math.random()*11)>7){
			 
			alien.state = alien.CRAZY

			alien.vx=5

			
		}

		if(Math.floor(Math.random()*11)>5){
			alien.vy = 2
		}



		aliens.push(alien);

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
		if(aliens.length !== 0){
			for(var i in aliens){
				var al = aliens[i];
				ctx.drawImage(alienss,al.sourceX, al.sourceY,al.width,al.height,Math.floor(al.x),Math.floor(al.y),al.width,al.height);
			}

		}

		
		
	}

	loop();






}());