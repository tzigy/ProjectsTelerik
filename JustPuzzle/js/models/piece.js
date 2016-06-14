var models = models || {};

(function(scope) {
	
	function Piece(width, height, posX, posY) {
		this.width = width;
		this.height = height;
		this.currentPosX = posX;
		this.currentPosY = posY;
		this.originalPosX = posX;
		this.originalPosY = posY;		
	}

	scope.getPiece = function getPiece(width, height, posX, posY) {
		return new Piece(width, height, posX, posY);
	};

}(models));