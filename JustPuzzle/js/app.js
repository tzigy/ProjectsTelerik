var models = models || {};

(function (scope) {

	function getLevel() {
		return ($('#level option:selected')[0].value);
	}

	function getImage() {
		return $('#puzzle-image').attr('src');
	}

function appInit(){
	const LEVEL_DEFAULT = 4;
	const IMAGE_DEFAULT = 'images/gallery/11.jpg';
	const SCALE_WINDOW = 0.7;

	var windowWidth,
		field = {},
		level,
		image,
		scale;

	level = getLevel() || LEVEL_DEFAULT;
	image = getImage() || IMAGE_DEFAULT;

	windowWidth = $(window).width();
	field.canvas = $('#puzzle-canvas')[0];
	field.width = Math.floor((windowWidth * SCALE_WINDOW) / level) * level;
	field.image = new Image();

	field.image.onload = function() {		
		scale = ((field.width / field.image.width) * 100) / 100;		

		field.height = Math.floor((field.image.height * (field.width / field.image.width)) / level) * level;
		field.image.width = field.width;
		field.image.height = field.height;
		field.canvas.width = field.width;
		field.canvas.height = field.height;

		field.stage = field.canvas.getContext('2d');
		field.stage.drawImage(field.image, 0, 0, field.width, field.height);

		var puzzle = models.getPuzzle(field, level, scale);
	}

	field.image.src = image;
}

	scope.init = function() {
		return appInit();
	};

}(models));
