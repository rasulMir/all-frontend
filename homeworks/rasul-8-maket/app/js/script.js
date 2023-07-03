

$(document).ready(function(){
	$('.head-top__click').click(function(event) {
		$('.head-top__nav').toggleClass("menu__active");
		$('body').toggleClass("block");
		$($(this)).toggleClass("click-menu__active");
	});
 });

$(document).ready(function(){

	$('.services-wrap__next').click(function() {
		var currentItem = $('.services-wrap__item.curry').hide();
		var currentItemIndex = $('.services-wrap__item.curry').index();
		var nextItemIndex = currentItemIndex + 1;
		var nextItem = $('.services-wrap__item').eq(nextItemIndex);
		currentItem.fadeOut(200);
		currentItem.removeClass('curry');
	
		if(nextItemIndex == ($('.services-wrap__item:last').index()+1)){
			$('.services-wrap__item').eq(0).fadeIn(400);
			$('.services-wrap__item').eq(0).addClass('curry');
		} else {
			nextItem.fadeIn(400);
			nextItem.addClass('curry').show();
		}
	});

	$('.services-wrap__prev').click(function() {
		var currentItem = $('.services-wrap__item.curry').hide();
		var currentItemIndex = $('.services-wrap__item.curry').index();
		var prevItemIndex = currentItemIndex - 1;
		var prevItem = $('.services-wrap__item').eq(prevItemIndex);
		currentItem.fadeOut(200);
		currentItem.removeClass('curry');
		prevItem.fadeIn(400);
		prevItem.addClass('curry').show();
	});
});

$(document).ready(function() {
	$('.reviews-wrap__slider').slick({
		autoplay: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		prevArrow: ' <span class="reviews-wrap__prev"><i class="icon-arrow-left"></i></span>',
		nextArrow: ' <span class="reviews-wrap__next"><i class="icon-arrow-right"></i></span>',
		mobileFirst: true,
		responsive: [
			{
			  breakpoint: 1023.98,
			  settings: {
					centerMode: true
			  }
			}
		 ]
	 });
});

$(document).ready(function() {
	$('.map').click(function() {
		$('.maps').removeAttr('style');
	});
});

$(document).ready(function() {
	$('.head-top__btn,.head-bottom__column-footer-btn,.services-wrap__consult-btn,.poly-wrap__btn,.faq-wrap__btn').click(function() {
		$('.pop-up').addClass('pop-up__active');
	});
	$('.pop-up__exit').click(function() {
		$('.pop-up').removeClass('pop-up__active');
	});
});