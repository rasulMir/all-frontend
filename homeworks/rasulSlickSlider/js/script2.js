$(document).ready(function(){
	$('.slider').slick({
		autoplay:true,
		slidesToShow: 4,
		dots: true,
		centerMode: true,
		prevArrow:'<i class="fas fa-chevron-circle-left"></i>',
		nextArrow:'<i class="fas fa-chevron-circle-right"></i>',
		swipeToSlide: true
	});
 })