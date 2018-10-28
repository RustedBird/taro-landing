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
    $(document).on('click', '.bonus_button', function (e) {
        var $this = $(this);
        $this.next('.taro_description').slideToggle(400);
        $this.toggleClass('active');
    });


    //up button and smooth scroll to the top
    var $upBtn = $('.up_button');
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
        var $form = $(this).closest('form'),
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
                beforeSend: function () {
                    $response.html('Отправка...');
                },
                success: function (response) {
                    $response.html(response);
                }
            });
        }
    });

    function init() {
        var vidDefer = document.getElementsByTagName('iframe');
        for (var i = 0; i < vidDefer.length; i++) {
            if (vidDefer[i].getAttribute('data-src')) {
                vidDefer[i].setAttribute('src', vidDefer[i].getAttribute('data-src'));
            }
        }
    }
    window.onload = init;


    $(".wpcf7").validate({
        rules: {
            name: "required",
            phone: "required",
            email: {
                required: true,
                email: true
            },
            question: 'required'
        },
        messages: {
            name: "Please include your name.",
            email: "Please include a valid email address.",
            phone: "Please include a valid phone.",
            question: "Please tell me how I can help you.",

        },
    });

})(jQuery);