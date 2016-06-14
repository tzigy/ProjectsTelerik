var models = models || {};

(function (scope) {

	function generateGallery(url, num) {
		var i,
			len,
			imageSrc,
			$carouselInner,
			$carouselItem,
			$carouselRow,
			$carouselImageDiv,
			$carouselImage,

		$carouselInner = $('<div>').addClass('carousel-inner');

		for (i = 0, len = num; i < len; i += 1) {
			imageSrc = url + (i + 1) + '.jpg';
			$carouselImage = $('<img>')
								.attr('src', imageSrc)
								.attr('alt', 'Image')
								.addClass('img-responsive');
			$carouselImageDiv = $('<div>')
								.addClass('col-sm-3')
								.append($carouselImage);

			if (!(i % 4)) {
				if (!!$carouselItem) {
					$carouselItem.append($carouselRow);
					$carouselInner.append($carouselItem);
				}

				$carouselRow = $('<div>')
								.addClass('row');
				$carouselItem = $('<div>')
								.addClass('item');
			}

			$carouselRow.append($carouselImageDiv);
		}

		$carouselItem.append($carouselRow);
		$carouselInner.append($carouselItem);
		$($carouselInner.find('.item')[0]).addClass('active');

		return $carouselInner;
	}

	scope.getGallery = function getGallery(url, num) {
		return generateGallery(url, num);
	}

}(models));




//<div class="carousel-inner">
//						<div class="item active">
//							<div class="row">
//								<div class="col-sm-3">
//									<img src="images/2.jpg" alt="Image" class="img-responsive">
//								</div>
//								<div class="col-sm-3">
//									<img src="images/2.jpg" alt="Image" class="img-responsive">
//								</div>
//								<div class="col-sm-3">
//									<img src="images/2.jpg" alt="Image" class="img-responsive">
//								</div>
//								<div class="col-sm-3">
//									<img src="images/2a.jpg" alt="Image" class="img-responsive">
//								</div>
//							</div>

//						</div>
//						<div class="item">
//							<div class="row">
//								<div class="col-sm-3">
//									<a href="#x"><img src="images/cars/2.jpg" alt="Image" class="img-responsive"></a>
//								</div>
//								<div class="col-sm-3">
//									<a href="#x"><img src="images/cars/2.jpg" alt="Image" class="img-responsive"></a>
//								</div>
//								<div class="col-sm-3">
//									<a href="#x"><img src="images/cars/2.jpg" alt="Image" class="img-responsive"></a>
//								</div>
//								<div class="col-sm-3">
//									<a href="#x"><img src="images/cars/2.jpg" alt="Image" class="img-responsive"></a>
//								</div>
//							</div>
//						</div>
//						<div class="item">
//							<div class="row">
//								<div class="col-sm-3">
//									<a href="#x"><img src="images/cars/3.jpg" alt="Image" class="img-responsive"></a>
//								</div>
//								<div class="col-sm-3">
//									<a href="#x"><img src="images/cars/3.jpg" alt="Image" class="img-responsive"></a>
//								</div>
//								<div class="col-sm-3">
//									<a href="#x"><img src="images/cars/3.jpg" alt="Image" class="img-responsive"></a>
//								</div>
//								<div class="col-sm-3">
//									<a href="#x"><img src="images/cars/3.jpg" alt="Image" class="img-responsive"></a>
//								</div>
//							</div>
//						</div>
//					</div>
