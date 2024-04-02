(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').css('top', '0px');
        } else {
            $('.sticky-top').css('top', '-100px');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });

     $(document).ready(function(){
        $(".nav-item").on('click', function (e) {
            $(".nav-item").each(function(){
                $(this).removeClass('active');
            });
            $(e.target).addClass('active');
        });
    });

     //send message
    $( document ).ready(function() {
        $.validator.setDefaults({
            errorClass: 'text-danger'
        })

        let contactForm = $('.ajax-contact-form');

        contactForm.validate({
            rules: {
                name: {
                    required: true,
                    minlength: 4
                },
                email: {
                    required: true
                },
                message: {
                    required: true
                }
            },
            messages: {
                name: {
                    required: "Имя обязательно",
                    minlength: jQuery.validator.format("Необходимо ввести как минимум {0} символовы")
                },
                email: {
                    required: "Email обязательн"
                },
                message: {
                    required: "Сообщение обязательно"
                }
            },
            submitHandler: function(form){
                var str = $(form).serialize();
                $.ajax({
                    type: "POST",
                    url: "http://localhost/contact.php",
                    //headers: {  "Access-Control-Allow-Origin:": "*"},
                    data: str,
                    success: function(xml, textStatus, xhr){
                        if(xhr.status === 200){
                            $("#exampleModal").modal("show");
                        }
                    },
                    error: function (jqXHR, exception) {
                        if (jqXHR.status === 0) {
                            alert('Не удается подключиться. Проверьте сеть.');
                        } else if (jqXHR.status == 404) {
                            alert('Запрошенная страница не найдена (404).');
                        } else if (jqXHR.status == 500) {
                            alert('Внутренняя ошибка сервера (500).');
                        } else if (exception === 'parsererror') {
                            alert('Не удалось выполнить запрошенный синтаксический анализ JSON.');
                        } else if (exception === 'timeout') {
                            alert('Ошибка тайм-аута.');
                        } else if (exception === 'abort') {
                            alert('Ajax-запрос прерван.');
                        } else {
                            alert('Неперехваченная ошибка. ' + jqXHR.responseText);
                        }
                    }
                });
                form.reset();
                return false;
            }
        });

    });

    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

    const popover = new bootstrap.Popover('.popover-dismiss', {
        trigger: 'focus',
        html: true
    });
    
})(jQuery);

