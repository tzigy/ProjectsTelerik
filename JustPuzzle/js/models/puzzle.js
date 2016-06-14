var models = models || {};

(function (scope) {

	function Puzzle(field, level, scale) {		
		const PUZZLE_HOVER_TINT = '#009900';
		var that = this;

		that.field = field;
		that.canvas = that.field.canvas;
		that.level = level;
		that.scale = scale;		
		that.img = that.field.image;
		that.puzzleWidth = that.field.width;
		that.puzzleHeight = that.field.height;
		that.stage = that.field.stage;
		that.pieceWidth = Math.floor(that.puzzleWidth / that.level);
		that.pieceHeight = Math.floor(that.puzzleHeight / that.level);
		that.initPuzzle();
	}

	Puzzle.prototype.initPuzzle = function initPuzzle() {
		var that = this;

		that.pieces = [];
		that.mouse = { x: 0, y: 0 };
		that.currentPiece = null;
		that.currentDropPiece = null;
		that.stage.drawImage(that.img, 0, 0, that.puzzleWidth, that.puzzleHeight);
		that.createLable("Click to Start Puzzle");
		that.buildPieces();
	}

	Puzzle.prototype.createLable = function createLable(msg) {
		this.stage.fillStyle = "#000000";
		this.stage.globalAlpha = .4;
		this.stage.fillRect(100, this.puzzleHeight - 40, this.puzzleWidth - 200, 40);
		this.stage.fillStyle = "#FFFFFF";
		this.stage.globalAlpha = 1;
		this.stage.textAlign = "center";
		this.stage.textBaseline = "middle";
		this.stage.font = "20px Arial";
		this.stage.fillText(msg, this.puzzleWidth / 2, this.puzzleHeight - 20);
	}

	Puzzle.prototype.buildPieces = function buildPieces() {		
		var i,
			len,
			piece,
			posX = 0,
			posY = 0,
			that = this;

		for (i = 0, len = that.level * that.level; i < len; i += 1) {

			piece = models.getPiece(that.pieceWidth, that.pieceHeight, posX, posY);
			that.pieces.push(piece);
			posX += that.pieceWidth;

			if (posX >= that.puzzleWidth) {
				posX = 0;
				posY += that.pieceHeight;
			}
		}

		that.canvas.onmousedown = function () { that.shufflePuzzle(); };
	}

	Puzzle.prototype.shufflePuzzle = function shufflePuzzle() {

		var i,
			len,
			piece,
			newPosX = 0,
			newPosY = 0,
			that = this;;

		that.canvas.onmousedown = null;
		that.pieces = shuffleArray(that.pieces);
		that.stage.clearRect(0, 0, that.puzzleWidth, that.puzzleHeight);

		for (i = 0, len = that.pieces.length; i < len; i += 1) {
			piece = that.pieces[i];		
			piece.currentPosX = newPosX;
			piece.currentPosY = newPosY;			
			that.stage.drawImage(that.img,
								piece.originalPosX / that.scale, piece.originalPosY / that.scale,
								that.pieceWidth / that.scale, that.pieceHeight / that.scale,
								piece.currentPosX, piece.currentPosY,
								that.pieceWidth, that.pieceHeight);
			that.stage.strokeRect(newPosX, newPosY, that.pieceWidth, that.pieceHeight);
			newPosX += that.pieceWidth;

			if (newPosX >= that.puzzleWidth) {
				newPosX = 0;
				newPosY += that.pieceHeight;
			}
		}

		that.canvas.onmousedown = function (ev) { that.onPuzzleClick(ev); }
	}

	function shuffleArray(o) {
		var j, x, i;

		for (j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);

		return o;
	}

	Puzzle.prototype.onPuzzleClick = function onPuzzleClick(ev) {
		var that = this;

		if (ev.layerX || ev.layerX == 0) {
			that.mouse.x = ev.layerX;
			that.mouse.y = ev.layerY;
		}
		else if (ev.offsetX || ev.offsetX == 0) {
			that.mouse.x = ev.offsetX - that.canvas.offsetLeft;
			that.mouse.y = ev.offsetY - that.canvas.offsetTop;
		}

		that.currentPiece = that.checkPieceClicked();

		if (that.currentPiece != null) {

			that.stage.clearRect(that.currentPiece.currentPosX, that.currentPiece.currentPosY, that.pieceWidth, that.pieceHeight);
			that.stage.save();
			that.stage.globalAlpha = .9;
			that.stage.drawImage(that.img,
						that.currentPiece.originalPosX / that.scale, that.currentPiece.originalPosY / that.scale,
						that.pieceWidth / that.scale, that.pieceHeight / that.scale,
						that.mouse.x - (that.pieceWidth / 2), that.mouse.y - (that.pieceHeight / 2),
						that.pieceWidth, that.pieceHeight);
			that.stage.restore();			
			that.canvas.onmousemove = function (ev) { that.updatePuzzle(ev); }
			that.canvas.onmouseup = function (ev) { that.pieceDropped(ev); }
		}
	}

	Puzzle.prototype.checkPieceClicked = function checkPieceClicked() {
		var i,
			len,
			piece,
			that = this;

		for (i = 0, len = that.pieces.length; i < len; i += 1) {
			piece = that.pieces[i];

			if (that.mouse.x < piece.currentPosX || that.mouse.x > (piece.currentPosX + that.pieceWidth) || that.mouse.y < piece.currentPosY || that.mouse.y > (piece.currentPosY + that.pieceHeight)) {
				//PIECE NOT HIT
			}
			else {
				return piece;
			}
		}
		return null;
	}

	Puzzle.prototype.updatePuzzle = function updatePuzzle(e) {
		var that = this,
			i,
			len,
			piece;

		that.currentDropPiece = null;

		if (e.layerX || e.layerX == 0) {
			that.mouse.x = e.layerX;
			that.mouse.y = e.layerY;
		}
		else if (e.offsetX || e.offsetX == 0) {
			that.mouse.x = e.offsetX - that.canvas.offsetLeft;
			that.mouse.y = e.offsetY - that.canvas.offsetTop;
		}

		that.stage.clearRect(0, 0, that.puzzleWidth, that.puzzleHeight);

		for (i = 0, len = that.pieces.length; i < len; i += 1) {
			piece = that.pieces[i];

			if (piece == that.currentPiece) {
				continue;
			}

			that.stage.drawImage(that.img,
								piece.originalPosX / that.scale, piece.originalPosY / that.scale,
								that.pieceWidth / that.scale, that.pieceHeight / that.scale,
								piece.currentPosX, piece.currentPosY,
								that.pieceWidth, that.pieceHeight);
			that.stage.strokeRect(piece.currentPosX, piece.currentPosY, that.pieceWidth, that.pieceHeight);

			if (that.currentDropPiece == null) {
				if (that.mouse.x < piece.currentPosX || that.mouse.x > (piece.currentPosX + that.pieceWidth) || that.mouse.y < piece.currentPosY || that.mouse.y > (piece.currentPosY + that.pieceHeight)) {
					//NOT OVER
				}
				else {
					that.currentDropPiece = piece;
					that.stage.save();
					that.stage.globalAlpha = .4;
					that.stage.fillStyle = that.PUZZLE_HOVER_TINT;
					that.stage.fillRect(that.currentDropPiece.currentPosX,		that.currentDropPiece.currentPosY, that.pieceWidth, that.pieceHeight);
					that.stage.restore();
				}
			}
		}
		that.stage.save();
		that.stage.globalAlpha = .6;

		that.stage.drawImage(that.img,
							that.currentPiece.originalPosX / that.scale, that.currentPiece.originalPosY / that.scale,
							that.pieceWidth / that.scale, that.pieceHeight / that.scale,				
							that.mouse.x - (that.pieceWidth / 2), that.mouse.y - (that.pieceHeight / 2),
							that.pieceWidth, that.pieceHeight);
		that.stage.restore();
		that.stage.strokeRect(that.mouse.x - (that.pieceWidth / 2), that.mouse.y - (that.pieceHeight / 2), that.pieceWidth, that.pieceHeight);
	}

	Puzzle.prototype.pieceDropped = function pieceDropped(ev) {
		var tmp,
			that = this;

		that.canvas.onmousemove = null;
		that.canvas.onmouseup = null;

		if (that.currentDropPiece != null) {

			tmp = { posX: that.currentPiece.currentPosX, posY: that.currentPiece.currentPosY };
			that.currentPiece.currentPosX = that.currentDropPiece.currentPosX;
			that.currentPiece.currentPosY = that.currentDropPiece.currentPosY;
			that.currentDropPiece.currentPosX = tmp.posX;
			that.currentDropPiece.currentPosY = tmp.posY;
		}

		that.resetPuzzleAndCheckWin();
	}

	Puzzle.prototype.resetPuzzleAndCheckWin = function resetPuzzleAndCheckWin() {
		var that = this;

		that.stage.clearRect(0, 0, that.puzzleWidth, that.puzzleHeight);
		var i,
			len,
			piece,
			gameWin = true;

		for (i = 0, len = that.pieces.length; i < len; i += 1) {
			piece = that.pieces[i];
			that.stage.drawImage(that.img,
						piece.originalPosX / that.scale, piece.originalPosY / that.scale,
						that.pieceWidth / that.scale, that.pieceHeight / that.scale,
						piece.currentPosX, piece.currentPosY,
						that.pieceWidth, that.pieceHeight);
			that.stage.strokeRect(piece.currentPosX, piece.currentPosY, that.pieceWidth, that.pieceHeight);
			if (piece.currentPosX != piece.originalPosX || piece.currentPosY != piece.originalPosY) {
				gameWin = false;
			}
		}
		if (gameWin) {			
			that.gameOver();
		}
	}

	Puzzle.prototype.gameOver = function gameOver() {
		var that = this;

		that.canvas.onmousedown = null;
		that.canvas.onmousemove = null;
		that.canvas.onmouseup = null;

		that.initPuzzle();		
	}

	scope.getPuzzle = function getPuzzle(field, level, scale) {
		return new Puzzle(field, level, scale);
	};

}(models));