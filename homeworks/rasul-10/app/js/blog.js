$(document).ready(function() {
	var $container = $('.blog-masonry-wrap');
	// Инициализация Масонри, после загрузки изображений
	$container.imagesLoaded( function() {
	  $container.masonry();
	});

	$('.blog-masonry-wrap').masonry({
		// options
		percentPosition: true,
		columnWidth: 270,
		itemSelector: '.blog-masonry-wrap__item',
		gutter: 30,
		isResizable: true
	 });

	 /*$('.blog-masonry__btn').on( 'click', function() {
		// create new item elements
		var $items = $('<div class="blog-masonry-wrap__item test"></div>');
		// append items to grid
		$grid.append( $items )
		  // add and lay out newly appended items
		  .masonry( 'appended', $items );
	 });*/

	 $('.blog-masonry-wrap-slider').slick({
			dots: true,
			arrows: false
	 });

	 $('.blog-masonry-wrap-slider-second').slick({
			arrows: true,
			dots: false,
			prevArrow: ' <span class="blog-masonry-wrap-slider-second__prev"><i class="icon-arrow-left"></i></span>',
			nextArrow: ' <span class="blog-masonry-wrap-slider-second__next"><i class="icon-arrow-right"></i></span>'
	});

	$('.blog-masonry-wrap-hover__link').click(function() {
		if($('.blog-masonry-wrap-hover__link').hasClass('blog-masonry-wrap-hover__link_active')) {
			$($(this)).removeClass('blog-masonry-wrap-hover__link_active')
		}
		$($(this)).addClass('blog-masonry-wrap-hover__link_active')
	});
});