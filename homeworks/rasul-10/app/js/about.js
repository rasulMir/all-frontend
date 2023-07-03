$(document).ready(function() {

	$('.statistic-wrap__service_active').next('.statistic-wrap__service-descr').show();
	$('.statistic-wrap__service').click(function() {
		if($('.statistic-wrap__service').hasClass('statistic-wrap__service_active')) {
			$('.statistic-wrap__service').removeClass('statistic-wrap__service_active').next('.statistic-wrap__service-descr').slideUp(400);
		}
		$($(this)).addClass('statistic-wrap__service_active').next('.statistic-wrap__service-descr').slideDown(400);
	});

	$('.reviews__slider').slick({
		prevArrow: ' <span class="reviews__slider-prev"><i class="icon-arrow-left"></i></span>',
		nextArrow: ' <span class="reviews__slider-next"><i class="icon-arrow-right"></i></span>'
	});


});