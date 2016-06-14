var models = models || {};
(function (models) {
	var URL_DEFAULT = 'images/gallery/',
		IMAGES_COUNT = 12;

	$('#level').on('change', function (ev) {		
		var newLevel = $(this).val();
		$(this.options)
				.removeAttr('selected')
				.filter("[value=" + newLevel + "]")
				.attr('selected', 'selected');	
	});

	$('#upload-image').on('change', function (event) {		
		var $image = $('#puzzle-image');	
		if (this.files && this.files[0]) {
			var reader = new FileReader();
			reader.onload = function(ev) {				
				$image.attr('src', reader.result);				
			}
			reader.readAsDataURL(this.files[0]);
		}
	});

	$('#btn-gallery').on('click', function (ev) {
		var $carouselInner;
	
		if ($.trim($('.carousel-inner').html()) == '') {
			
			$carouselInner = models.getGallery(URL_DEFAULT, IMAGES_COUNT);
			$('#gallery-carousel').prepend($carouselInner[0]);
		}
		
		$('#gallery-container').show();
	});

	$('#gallery-container').on('click', function (ev) {
		var imageSrc;

		if (ev.target.tagName == 'IMG') {
			imageSrc = ev.target.src;
			$('#puzzle-image').attr('src', imageSrc);
			$('#gallery-container').hide();
		}
	});

	$('#set-options').on('click', function (ev) {
		console.log('jasdflksdfgs');
		models.init();
	});

}(models));