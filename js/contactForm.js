$(".input-field").each(function () {
    var $this = $(this);
    if ($this.val().length) {
        $this.parent().addClass("input--filled")
    }
    $this.on("focus", function () {
        $this.parent().addClass("input--filled");
    });
    $this.on("blur", function () {
        if (!$this.val().length) {
            $this.parent().removeClass("input--filled")
        }
    })
});



$(function () {


    // Get the form.
    var form = $('#ajax-contact'),
        // Get the messages div.
        formMessages = $('#form-messages');

    // Set up an event listener for the contact form.
    $(form).submit(function (e) {
        // Stop the browser from submitting the form.
        e.preventDefault();


        $("#btn-submit").addClass("btn-loading");


        // Serialize the form data.
        var formData = $(form).serialize();

        // Submit the form using AJAX.
        $.ajax({
                type: 'POST',
                url: $(form).attr('action'),
                data: formData
            })
            .done(function (response) {
                // Make sure that the formMessages div has the 'success' class.
                $(formMessages).removeClass('error').addClass('success').fadeIn().delay(5000).fadeOut();
                // Set the message text.
                $(formMessages).text(response);

                // Clear the form.
                $(form).trigger("reset");
                $("#btn-submit").removeClass("btn-loading");
            })
            .fail(function (data) {
                // Make sure that the formMessages div has the 'error' class.
                $(formMessages).removeClass('success').addClass('error').fadeIn().delay(5000).fadeOut();
                // Set the message text.
                if (data.responseText !== '') {
                    $(formMessages).text(data.responseText);
                } else {
                    $(formMessages).text('Oops! An error occurred and your message could not be sent.');
                }


                $("#btn-submit").removeClass("btn-loading");
            });

    });

});


$(function () {


    // Get the form.
    var form = $('#newsletter-form'),
        // Get the messages div.
        formMessages = $('#newsletter-messages');

    // Set up an event listener for the contact form.
    $(form).submit(function (e) {
        // Stop the browser from submitting the form.
        e.preventDefault();


        $("#btn-newsletter").addClass("btn-loading");


        // Serialize the form data.
        var formData = $(form).serialize();

        // Submit the form using AJAX.
        $.ajax({
                type: 'POST',
                url: $(form).attr('action'),
                data: formData
            })
            .done(function (response) {
                // Make sure that the formMessages div has the 'success' class.
                $(formMessages).removeClass('error');
                $(formMessages).addClass('success');
                setTimeout(function () {
                    $(formMessages).addClass("fade-outy");
                }, 5000);

                // Set the message text.
                $(formMessages).text(response);

                // Clear the form.
                $(form).trigger("reset");
                $("#btn-newsletter").removeClass("btn-loading");
            })
            .fail(function (data) {
                // Make sure that the formMessages div has the 'error' class.
                $(formMessages).removeClass('success');
                $(formMessages).addClass('error');
                setTimeout(function () {
                    $(formMessages).addClass("fade-outy");
                }, 5000);

                // Set the message text.
                if (data.responseText !== '') {
                    $(formMessages).text(data.responseText);
                } else {
                    $(formMessages).text('Oops! An error occurred and your message could not be sent.');
                }


                $("#btn-newsletter").removeClass("btn-loading");
            });

    });

});


/* ---------------------------------------------
 Contact form
 --------------------------------------------- */
$(document).ready(function(){
    $("#submit_btn").click(function(){

        //get input field values
        var user_name = $('input[name=name]').val();
        var user_email = $('input[name=email]').val();
        var user_message = $('textarea[name=message]').val();
        var url = "./mail_handler.php"; // the script where you handle the form input.

        //simple validation at client's end
        //we simply change border color to red if empty field using .css()
        var proceed = true;
        if (user_name == "") {
            $('input[name=name]').css('border-color', '#e41919');
            $('form-tip').css('color', '#e41919');
            proceed = false;
        }
        if (user_email == "") {
            $('input[name=email]').css('border-color', '#e41919');
            $('.form-tip').css('color', '#e41919');
            proceed = false;
        }

        if (user_message == "") {
            $('textarea[name=message]').css('border-color', '#e41919');
            $('.form-tip').css('color', '#e41919');
            proceed = false;
        }
        var atpos = user_email.indexOf("@");
        var dotpos = user_email.lastIndexOf(".");
        if (atpos<1 || dotpos<atpos+2 || dotpos+2>=user_email.length) {
            $('input[name=email]').css('border-color', '#e41919');
            $('.form-tip').css('color', '#e41919');
            proceed = false;
        }

        //everything looks good! proceed...
        if (proceed) {
            //data to be sent to server
            post_data = {
                'userName': user_name,
                'userEmail': user_email,
                'userMessage': user_message
            };
            $('.form-tip').css('color', 'initial');
            //Ajax post data to server
            $.ajax({
                type: "POST",
                url: url,
                data: $(this).closest('form').serialize(), // serializes the form's elements.
                success: function (data) {
                    $('#contact_form').closest('form').find('input[type=text], textarea').val('');
                    $('#contact_form').closest('form').find('input[type=email], textarea').val('');
                    var alertBox = "<div class='messageSent'>Message Sent</div>";
                    $('.messages').append($(alertBox));
                },
                error: function(response){
                    var alertBox = "<div class='messageNotSent'>Please Try Again</div>";
                    $('.messages').append($(alertBox));
                }
            });
        }

        return false;
    });

    //reset previously set border colors and hide all message on .keyup()
    $("#contact_form input, #contact_form textarea").keyup(function(){
        $("#contact_form input, #contact_form textarea").css('border-color', '');
        $("#result").slideUp();
    });

});

