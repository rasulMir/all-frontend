$(document).ready(function(){
    $('.my-slider').slick({
     
        infinite: false,
        slidesToShow:3,
        slidesToScroll:1,
        arrows: true,
        nextArrow: '<i class="fa fa-angle-right" aria-hidden="true"></i>',
        prevArrow: '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        dots: true,
        dotsClass: 'dots-style',
        autoplay:true,
        autoplaySpeed:2000,
        // centerMode:true,
        pauseOnDotsHover:true,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots:false
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          
          ]





    });
  });