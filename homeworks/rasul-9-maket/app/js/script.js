$(document).ready(function() {
	$('.iso-head__exit').click(function(){
		$('.iso-head').slideUp(300);
	});
});

$(document).ready(function() {
	$('.process-wrap__circle-outer').mouseenter(function(){
		$(this).children('.process-wrap__card').slideDown(300);
	});
	$('.process-wrap__circle-outer').mouseleave(function(){
		$(this).children('.process-wrap__card').slideUp(200);
	});
});

$(document).ready(function() {
	$('.roadmap-wrap__btn').click(function() {
		$(this).siblings('.roadmap-wrap__txt').children('p').addClass('txt-active');
		$('.roadmap-wrap__btn').not($(this)).siblings('.roadmap-wrap__txt').children('p').removeClass('txt-active');
	});
});

$(document).ready(function() {
	$('.faq-wrap__question').click(function() {
		$(this).siblings('.faq-wrap__answer').slideDown(300);
		$(this).children('span').css({
			'transform': 'rotateZ(0)'
		});
		$('.faq-wrap__question').not($(this)).siblings('.faq-wrap__answer').slideUp(300);
	});
});