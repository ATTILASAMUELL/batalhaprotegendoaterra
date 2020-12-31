
//objeto esqueleto
var Sprite = function(sourceX, sourceY, width, height, x,y){
	this.sourceX = sourceX; // captura da imagem em x
	this.sourceY = sourceY; // captura da imagem em y
	this.width = width; //largura 
	this.height = height;  // altura
	this.x = x; // posição em x para ser exibido na tela
	this.y = y; // posição em y para ser exibido na tela
	this.vx = 0; // velocidade em x deslocamento
	this.vy = 0; // velocidade em y deslocamento

}

Sprite.prototype.centerX = function(){
	return this.x + (this.width/2);
}
Sprite.prototype.centerY = function(){
	return this.y + (this.height/2);
}

Sprite.prototype.halfWidth = function(){
	return this.width/2;
}
Sprite.prototype.halfHeight = function(){
	return this.height/2;
}