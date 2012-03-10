$(document).ready(function() {
	// Test placeholder support
	$.support.placeholder = false;
	_test = document.createElement('input');
	if('placeholder' in _test) $.support.placeholder = true;
	
	// Provide placeholder compatibility code
	if(!$.support.placeholder) { 
			var active = document.activeElement;
			$(':text').focus(function () {
				if ($(this).attr('placeholder') != '' && $(this).val() == $(this).attr('placeholder')) {
					$(this).val('').removeClass('hasPlaceholder');
				}
			}).blur(function () {
				if ($(this).attr('placeholder') != '' && ($(this).val() == '' || $(this).val() == $(this).attr('placeholder'))) {
					$(this).val($(this).attr('placeholder')).addClass('hasPlaceholder');
				}
			});
			$(':text').blur();
			$(active).focus();
			$('form').submit(function () {
				$(this).find('.hasPlaceholder').each(function() { $(this).val(''); });
			});
	}
	
	// Set up color flash on input with a maxlength
	$("input[maxlength]").bind('keyup.betatrek.maxlength', function() {
		var $this = $(this),
			$max = $this.attr('maxlength'),
			$color = $this.css('background');
		if ($this.val().length >= $max) {
			// TODO: implement flash
			/*$this.animate({background: "#ff7777"}, 'fast')
				 .animate({background: $color}, 'fast');*/
		}
	});
	
	// Dynamic password reset modification of the login moal window
	$('#password_reset').click(function(evt) {
		evt.preventDefault();
		
		$('#login_password').prop('disabled', true).hide('fast');
		$('#space_after_login_password').hide('fast');
		$('#password_reset').hide('fast');
		$('#space_after_password_reset').hide('fast');
		login_title = $('#login_title').text();
		$('#login_title').text('Request Password Reset');
		$('#password_reset_request').val(true);
		$('#login_close').bind('click.betatrek.temporary', function() {
			$('#login_password').prop('disabled', false).show('fast');
			$('#space_after_login_password').show('fast');
			$('#password_reset').show('fast');
			$('#space_after_password_reset').show('fast');
			$('#login_title').text(login_title);
			$('#password_reset_request').val(false);
			$(this).unbind('click.betatrek.temporary');
		})
	});
	
	// modal login window
	bindModalToLink($('#login_button'), $('#login'), $('body'), function() {
		// Copy the email address entered in the "begin here" form
		$('#login_email').val($('#signup_email').val());
	});
	
	// modal create account window
	bindModalToLink($('#begin_account_creation'), $('#creation'), $('body'), function() {
		// Copy the email address and password entered in the "begin here" form
		$('#creation_email').val($('#signup_email').val());
		$('#creation_password').val($('#signup_password').val());
	});
	
	// auto scroll to make sign up box visible on sign up page
	if ($('body').hasClass('signUpPage')) {
		scrollToElement($('#signup'));
	}

	// Function for binding a modal window to open when an object is pressed
	function bindModalToLink($link, $modal, $body, $initializer) {
		$link.click(function(evt) {
            evt.preventDefault();

			if ($initializer) { $initializer(); }
            $modal.addClass('intermediate');
            setTimeout(function() {
                $modal.addClass('active');
            }, 50);

            //$modal.find('input').first().focus();
            $modal.find('.close').click(function(evt) {
                evt.preventDefault();
                close();
            });

            $modal.find('form').submit(function(evt) {
                close();
            });

            $body.keyup(function(evt) {
                if(evt.keyCode === 27) { // ESC key
                    close();
                }
            });
			
        });

		function close() {
            $modal.addClass('minimise')
            $modal.removeClass('active');
            setTimeout(function() {
                $modal.removeClass('intermediate minimise');
            }, 550);
            $body.unbind('keyup');
            $modal.find('.close').unbind('click');
        }
	}
	
	function scrollToElement($element) {
		// makes the element visible above the fold
		var win_height = $(window).height(),
			fold       = win_height,
			element_height = $element.height(),
			element_bottom = element_height + $element.offset().top;
		if (fold <= element_bottom) {
			$('html, body').animate({
				scrollTop: element_bottom - fold + 25 
			}, 2500);
		}
		// interrupt animation on scroll or click
		var stopScrollAnimation = function() {$('html, body').stop();},
		    lastScrollTop = 0;
		$(window).click(stopScrollAnimation).scroll(function(){
		   	var st = $(this).scrollTop();
			// if user changes scroll direction stop scroll animation
		   	if (st < lastScrollTop){
		    	stopScrollAnimation();
		   	}
		   	lastScrollTop = st;
		});
	}
});
