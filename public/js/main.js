;(function ($) {

    $('#slick_slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        infinite: true
    });


    $(document).on('click', '.bonus_button', function () {
        var $this = $(this);
        $this.next('.taro_description').toggle(200);
        $this.toggleClass('active')

    });

    $('#video_slider').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: true,
        infinite: true
    });


})(jQuery);