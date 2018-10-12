;(function ($) {

    $('#slick_slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        infinite: true,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    arrows: false,
                    dots: true
                }
            }
        ]
    });


    $(document).on('click', '.bonus_button', function () {
        let $this = $(this);
        $this.next('.taro_description').slideToggle(400);
        $this.toggleClass('active');
    });

    $('#video_slider').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: true,
        infinite: true,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                    arrows: false,
                    dots: true
                }
            }
        ]
    });

    let $upBtn = $('.up_button');
    window.onscroll = function() {scrollFunction()};


    function scrollFunction() {
        if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) {
            $upBtn.fadeIn();
        } else {
            $upBtn.fadeOut();
        }
    }

    $(document).on('click', '.up_button', function () {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });


})(jQuery);