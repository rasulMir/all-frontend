$(document).ready(function() {


	$('.head-wrap__icon').click(function(){
		$($(this)).addClass('head-wrap__icon-active')
		$('.head-wrap__search-input').addClass('head-wrap__search-input-active')
	});

	$('.panel-wrap__wishlist-remove').click(function() {
		$($(this)).parent('.panel-wrap__wishlist-card').fadeOut(400);
	});

	$('.clients__slider').slick({
		autoplay: true,
		dots: false,
		arrows: true,
		slidesToShow: 5,
		centerMode: true,
		centerPadding: '30px',
		prevArrow: ' <span class="slick__prev"><i class="icon-arrow-left"></i></span>',
		nextArrow: ' <span class="slick__next"><i class="icon-arrow-right"></i></span>'
	});

	
});