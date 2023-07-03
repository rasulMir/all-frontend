$('#slick1').slick({
		rows: 2,
		dots: false,
		arrows: false,
		infinite: true,
		speed: 300,
		slidesToShow: 6,
		slidesToScroll: 6,
	responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
								slidesToScroll: 1,
						rows: 1,
          }
        },
        {
          breakpoint: 550,
          settings: {
				
            slidesToShow: 1,
						slidesToScroll: 1,
            rows: 1,
          }
        }
      ]
});
