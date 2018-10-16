;(function ($) {

    //First slider
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

    //Second slider
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

    //bonus bittuin
    $(document).on('click', '.bonus_button', function () {
        let $this = $(this);
        $this.next('.taro_description').slideToggle(400);
        $this.toggleClass('active');
    });


    //up button and smooth scroll to the top
    let $upBtn = $('.up_button');
    window.onscroll = function () {
        scrollFunction()
    };


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

    $(document).on('click', '.more', function () {
        $('html, body').animate({
            scrollTop: $('.about').offset().top
        }, 500);
    });

    $(document).on('click', '.buy', function () {
        $('html, body').animate({
            scrollTop: $('.selling').offset().top
        }, 500);
    });

    $(".question_form").on('click', function (e) {
        let $form = $(this).closest('form'),
            valid = $form[0].checkValidity(),
            $response = $('.response');

        $response.empty();
        if (valid) {
            e.preventDefault();
            $.ajax({
                url: 'send.php',
                method: 'post',
                data: $form.serialize(),
                dataType: 'json',
                beforeSend: function() {
                    $response.html('Отправка...');
                },
                success: function (results) {
                    if (results.message === 'Queued. Thank you.') {
                        $response.html('Ваше сообщение упешно отправлено');
                    } else {
                        $response.html('Ошибка отправки, попробуйте снова.');
                    }
                },
                error: function () {
                    $response.html('Ошибка на сервере. Пожалуйста, свяжитесь с нами по телефону');
                }
            });
        }
    });
})(jQuery);