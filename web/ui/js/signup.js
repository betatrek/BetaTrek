$(document).ready(function(){
    // makes the begin here box visible at start
	var win_height = $(window).height(),
		fold       = win_height,
		signup     = $('#signup'),
		signup_height = signup.height(),
		signup_bottom = signup_height + signup.offset().top;
	if (fold <= signup_bottom) {
		$('html, body').animate({
			scrollTop: signup_bottom - fold + 25 
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
    
    // while the checkbox is focused or idle
	var remember_me_label = $("label[for='remember_me']");
    $("input[name='remember_me']").hover(
        function(){
            remember_me_label.addClass("hover");
        },
        function(){
            remember_me_label.removeClass("hover");
        }
    );

    // Changes buttons' class for changing their style while hovered, clicked or passive
    $("[type='button'], [type='submit']").hover(
        function(){
            $(this).addClass("hover");
        },
        function(){
            $(this).removeClass("hover");
        }
    ).mouseleave(function(){ // for if user holds the mouse down will leaving button
        $(this).removeClass("click");
    });
	
    $("[type='button']:not([name='remember_me']), [type='submit']").mousedown(function(){
        $(this).addClass("click");
    }).mouseup(function(){
        $(this).removeClass("click");
    });
    
    // Toggle the checkbox's state
    $(".checkbox").click(function(){
        if ($(this).hasClass('checked')) {
            $(this).removeClass("checked").attr('value', '0');
        }
        else {
            $(this).addClass("checked").attr('value', '1');
        }
    });

    // select all the objects with a class of modal
	var close_button = $(".close");
    $(".modal").click(function(e) {
        // cancel the link behavior
        e.preventDefault();
        // get the a tag
        var id = "#" + $(this).attr("name");

        // get the screen's height and width
        var docHeight = $(document).height();
        var docWidth = $(document).width();

        // set height and width to mask to fill up the whole screen
        $("#mask").css({"width": docWidth, "height": docHeight});

        // transition effect
        $("#mask").fadeIn(1000).fadeTo("slow", 0.8);

        // places the popup window over it's parent
        var winWidth = $(window).width();
        var winHeight = $(window).height();
        var centerWidth = $(id).width()/2;
        var centerHeight = $(id).height()/2;
        $(id).css({"left": (docWidth/2 - centerWidth) + "px", "top": (docHeight/2 - centerHeight) + "px"});

        // set the default email to be the attempted email address in sign in bar
        var email = $("#signin input.email").val();
        if (email != "") {
            $("#recovery input.email").val(email);
        }

        // set the focus to the email field
        focus("#recovery input.email");

        // set the default email and password from the Begin Here box
        email = $("#signup input.email").val();
        var password = $("#signup_pass").val();

        // set the focus to the country field
        if (email != "") {
            $("#email").val(email);
		}
		if (password != "") {
            $("#password").val(password);
		}

        // Positions the close button based on operating system
        // Right if Windows, Left otherwise
        if ($.client.os == "Windows") {
            close_button.css('left', '146px');
        }
        else {
            close_button.css('left', '-146px');
        }

        // transition effect
        $(id).fadeIn(2000);
    });

    // if close button is clicked
    close_button.click(function(e) {
        // cancel the link behavior
        e.preventDefault();
        $("#mask, .window").fadeOut(1000);
    });

    // if mask is clicked
    $("#mask").click(function() {
        $(this).fadeOut(1000);
        $(".window").fadeOut(1000);
    });

    // if recovery link is clicked
    $("#password_reset").click(function() {
        // check email field is valid user
        var email = $("#recovery input.email").val();
        if (email != "" && email != "Email Address") {
            $.getJSON('/investub/controller/user/getUser/' + email,
                function() {
                    $("#mask, .window").fadeOut(1000);
                    // reset password to randomly generated one          
                }
            );
        }
    });  
	
	// Populates the State selection field
	populateStates();
	
	// Adds Chosen widget to the State selection field
	var create_account = $('#create_account');
	$("#state").chosen({no_results_text: "No matching country found."}).change(function() {
		// can't select nothing, so hides the error
		create_account.validate().element('#state');
		$("#state").valid();
	});

	// Popultates the Country selection field with options
	populateCountries();
	
	// Adds Chosen widget to the Country selection field
	var state          = $("#state_chzn, label[for='state']"),
	    togglePosition = false;
	$("#country").chosen({no_results_text: "No matching country found."}).change(function() {
		var selected    = $("#country_chzn span").text(),
		    agree_error = $("label.error[for='agree']");
		// Hide the State field if not United States of America or Canada
		if (selected == "United States") {
			state.slideDown(2600);
			if (togglePosition) {
				agree_error.animate({top: '+=4em'}, 2750);
				togglePosition = false;
				create_account.validate().element('#state');
				$("#state").valid();
			}
			$("label.error[for='state']").slideDown(2600);
		} else if (selected == "Canada") {
			state.slideDown(2600);
			if (togglePosition) {
				agree_error.animate({top: '+=4em'}, 2750);
				togglePosition = false;
			}
			$("label.error[for='state']").slideDown(2600);
		} else {
			state.slideUp(2600);
			$("label.error[for='state']").slideUp(2600);
			if (!togglePosition) {
				agree_error.animate({top: '-=4em'}, 2750);
				togglePosition = true;
			}
		}
		// can't select nothing, so hides the error
		create_account.validate().element('#country');
		$("#country").valid();
	});
	
	// Add show/hide button to password fields
	$('#signup_pass').showPassword({
	    linkTopOffset: 11,
	    showPasswordInputClass: 'signup_password_showing'
	});
	$('#password').showPassword({
	    showPasswordInputClass: 'creation_password_showing'
	});
	
	// assign names to the input fields in the create account window
	$("#create_account input, #country, #state").each(function() {
		var $this = $(this);
		$this.attr('name', $this.attr('id'));
	});
	
	// Set up form validation
	var country_placeholder = $('#country').attr('data-placeholder'),
	    state_placeholder   = $("#state").attr('date-placeholder');
	$("#signin").validate({
		errorContainer: "#signin_errors",
		errorLabelContainer: "ul",
		wrapper: "li",
		highlight: function(element, errorClass) {
		     $(element).addClass('invalid');
		}
	});
	$("#recovery").validate();
	jQuery.validator.addMethod("country_required", function(value, element) {
		return $('#country_chzn span').text() != country_placeholder;
	}, "");
	jQuery.validator.addMethod("agree", function(value, element) {
		return $(element).val() == 1;
	}, "");
	jQuery.validator.addMethod("state", function(value, element) { // from Adam Thody
		return this.optional(element) || $("#state_chzn span").text() != state_placeholder;
	}, "");
	create_account.validate({
		rules: {
			email: {
				required: true,
				email: true
			},
			password: {
				required: true
			},
			country: "country_required",
			state: {
				required: {
					depends: '#state_chzn:visible'
				},
				state: true
			},
			agree: "agree"
		},
		highlight: function(element) {
			var obj = $(element);
			if (obj.hasClass('chzn-select')) {
				$('#' + obj.attr('id') + '_chzn .chzn-single').addClass('invalid').removeClass('valid');	
			} else {
		    	obj.addClass('invalid').removeClass('valid');
			}
		},
		unhighlight: function(element) {
			var obj = $(element);
			if (obj.hasClass('chzn-select')) {
				$('#' + obj.attr('id') + '_chzn .chzn-single').addClass('valid').removeClass('invalid');	
			} else {
		    	obj.addClass('valid').removeClass('invalid');
			}
		},
		messages: {
			email: {
				email:     'Please change email to look like: example@domain.com',
				required:  'Please enter your email address.'
			},
			password: {
				required:  'Please enter a password.'
			},
			country:       'Please select your country.',
			state: 		   'Please select your state.',
			agree:         'Please confirm agreement before continuing.'
		}
	});
	// Update error message on agree clicked
	$("#agree").bind('click', function(){create_account.validate().element("#agree")});
	
	// Add color bars to password fields
	$(".password, #password").chromaHash();
	
	// Set up input field watermarks
	if ($.browser.mozilla) {
		$("#signin_bar .email").watermark({html: "Email Address", css: {left: '-310px', top: '8px', color: '#aaa', fontSize: '.85em'}});
		$("#signin_pass").watermark({html: "Password", css: {left: '-183px', top: '8px', color: '#aaa', fontSize: '.85em'}});
	} else if ($.browser.msie) {
		$("#signin_bar .email").watermark({html: "Email Address", css: {left: '132px', top: '7px', color: '#aaa', fontSize: '.85em'}});
		$("#signin_pass").watermark({html: "Password", css: {left: '-183px', top: '8px', color: '#aaa', fontSize: '.85em'}});
	} else {
		$("#signin_bar .email").watermark({html: "Email Address", css: {left: '4px', top: '7px', color: '#aaa', fontSize: '.85em'}});
		$("#signin_pass").watermark({html: "Password", css: {left: '4px', top: '8px', color: '#aaa', fontSize: '.85em'}});
	}
	if ($.browser.msie) {
		$("#signup_box .email").watermark({html: "Email Address", css: {left: '68px', top: '-15px', color: '#aaa'}});
    	$("#signup_pass").watermark({html: "Password",  cls: 'watermark', css: {left: '84px', top: '-15px', color: '#aaa'}});
		$("#recovery .email").watermark({html: "Email Address", css: {left: '64px', top: '-13px', color: '#aaa'}});
   	} else {
		$("#signup_box .email").watermark({html: "Email Address", css: {left: '68px', top: '-2px', color: '#aaa'}});
	    $("#signup_pass").watermark({html: "Password",  cls: 'watermark', css: {left: '84px', top: '-2px', color: '#aaa'}});
		$("#recovery .email").watermark({html: "Email Address", css: {left: '64px', top: '-2px', color: '#aaa'}});
	}

	// Set up color flash on input with a maxlength
	$("input[maxlength='24']").bind('keyup', function() {
		var $this = $(this);
		if ($this.val().length >= 24) {
			$this.animate({color: "#fff"},
			 			  'fast')
				.animate({color: "#8d8d8d"},
				 		 'fast');
		} else {
			$this.css({color: "#000"});
		}
	});
	
	// Changes input fields' class for changing style while focused
    // or idle
	var input = $("input[type='text'], input[type='password']");
    input.addClass("idle").bind('focus', function() {
        $(this).addClass("active").removeClass("idle");
    }).bind('blur', function() {
        $(this).removeClass("active").addClass("idle");
    });
	
	// makes jQuery handle the create account form submission
	$('#create').click(createUser);
	
	// TODO: don't allow typing while password remains visible (ie hide it)
	// Switch to password field from showing password focus
	/*var signup_pass = $("#signup_pass"),
		show_pass   = $(".show-password-link");
	$("#signup_password_showing").bind('focus', function() {
		show_pass.click();
	});*/
});

// focus a specified input field, and make sure to mark any previous input field
// as idle
function focus(selector) {
    $('.active').blur();
    $(selector).focus();
}

// calls controller/user/addUser in the backend with the create account form data
function createUser() {
	var create_account = $("#create_account").validate();
	if (create_account.valid()) {
		var email   = $('#email').val(),
			pass    = $('#password').val(),
			country = $('#country_chzn span').text(),
			state     = $('#state_chzn span').text();
		$.post('/controller/user/addUser', {'email': email, 'password': pass, 'country': country, 'state': state});
	}
	return false;
}

function populateCountries() {
	$("#country").append("<option value='' />"
		          + "<option value='United States'>United States</option> "
		          + "<option value='United Kingdom'>United Kingdom</option> "
		          + "<option value='Afghanistan'>Afghanistan</option> "
		          + "<option value='Albania'>Albania</option> "
		          + "<option value='Algeria'>Algeria</option> "
		          + "<option value='American Samoa'>American Samoa</option> "
		          + "<option value='Andorra'>Andorra</option> "
		          + "<option value='Angola'>Angola</option> "
		          + "<option value='Anguilla'>Anguilla</option> "
		          + "<option value='Antarctica'>Antarctica</option> "
		          + "<option value='Antigua and Barbuda'>Antigua and Barbuda</option> "
		          + "<option value='Argentina'>Argentina</option> "
		          + "<option value='Armenia'>Armenia</option> "
		          + "<option value='Aruba'>Aruba</option> "
		          + "<option value='Australia'>Australia</option> "
		          + "<option value='Austria'>Austria</option> "
		          + "<option value='Azerbaijan'>Azerbaijan</option> "
		          + "<option value='Bahamas'>Bahamas</option> "
		          + "<option value='Bahrain'>Bahrain</option> "
		          + "<option value='Bangladesh'>Bangladesh</option> "
		          + "<option value='Barbados'>Barbados</option> "
		          + "<option value='Belarus'>Belarus</option> "
		          + "<option value='Belgium'>Belgium</option> "
		          + "<option value='Belize'>Belize</option> "
		          + "<option value='Benin'>Benin</option> "
		          + "<option value='Bermuda'>Bermuda</option> "
		          + "<option value='Bhutan'>Bhutan</option> "
		          + "<option value='Bolivia'>Bolivia</option> "
		          + "<option value='Bosnia and Herzegovina'>Bosnia and Herzegovina</option> "
		          + "<option value='Botswana'>Botswana</option> "
		          + "<option value='Bouvet Island'>Bouvet Island</option> "
		          + "<option value='Brazil'>Brazil</option> "
		          + "<option value='British Indian Ocean Territory'>British Indian Ocean Territory</option> "
		          + "<option value='Brunei Darussalam'>Brunei Darussalam</option> "
		          + "<option value='Bulgaria'>Bulgaria</option> "
		          + "<option value='Burkina Faso'>Burkina Faso</option> "
		          + "<option value='Burundi'>Burundi</option> "
		          + "<option value='Cambodia'>Cambodia</option> "
		          + "<option value='Cameroon'>Cameroon</option> "
		          + "<option value='Canada'>Canada</option> "
		          + "<option value='Cape Verde'>Cape Verde</option> "
		          + "<option value='Cayman Islands'>Cayman Islands</option> "
		          + "<option value='Central African Republic'>Central African Republic</option> "
		          + "<option value='Chad'>Chad</option> "
		          + "<option value='Chile'>Chile</option> "
		          + "<option value='China'>China</option> "
		          + "<option value='Christmas Island'>Christmas Island</option> "
		          + "<option value='Cocos (Keeling) Islands'>Cocos (Keeling) Islands</option> "
		          + "<option value='Colombia'>Colombia</option> "
		          + "<option value='Comoros'>Comoros</option> "
		          + "<option value='Congo'>Congo</option> "
		          + "<option value='Congo, The Democratic Republic of The'>Congo, The Democratic Republic of The</option> "
		          + "<option value='Cook Islands'>Cook Islands</option> "
		          + "<option value='Costa Rica'>Costa Rica</option> "
		          + "<option value='Cote D\'ivoire'>Cote D\'ivoire</option> "
		          + "<option value='Croatia'>Croatia</option> "
		          + "<option value='Cuba'>Cuba</option> "
		          + "<option value='Cyprus'>Cyprus</option> "
		          + "<option value='Czech Republic'>Czech Republic</option> "
		          + "<option value='Denmark'>Denmark</option> "
		          + "<option value='Djibouti'>Djibouti</option> "
		          + "<option value='Dominica'>Dominica</option> "
		          + "<option value='Dominican Republic'>Dominican Republic</option> "
		          + "<option value='Ecuador'>Ecuador</option> "
		          + "<option value='Egypt'>Egypt</option> "
		          + "<option value='El Salvador'>El Salvador</option> "
		          + "<option value='Equatorial Guinea'>Equatorial Guinea</option> "
		          + "<option value='Eritrea'>Eritrea</option> "
		          + "<option value='Estonia'>Estonia</option> "
		          + "<option value='Ethiopia'>Ethiopia</option> "
		          + "<option value='Falkland Islands (Malvinas)'>Falkland Islands (Malvinas)</option> "
		          + "<option value='Faroe Islands'>Faroe Islands</option> "
		          + "<option value='Fiji'>Fiji</option> "
		          + "<option value='Finland'>Finland</option> "
		          + "<option value='France'>France</option> "
		          + "<option value='French Guiana'>French Guiana</option> "
		          + "<option value='French Polynesia'>French Polynesia</option> "
		          + "<option value='French Southern Territories'>French Southern Territories</option> "
		          + "<option value='Gabon'>Gabon</option> "
		          + "<option value='Gambia'>Gambia</option> "
		          + "<option value='Georgia'>Georgia</option> "
		          + "<option value='Germany'>Germany</option> "
		          + "<option value='Ghana'>Ghana</option> "
		          + "<option value='Gibraltar'>Gibraltar</option> "
		          + "<option value='Greece'>Greece</option> "
		          + "<option value='Greenland'>Greenland</option> "
		          + "<option value='Grenada'>Grenada</option> "
		          + "<option value='Guadeloupe'>Guadeloupe</option> "
		          + "<option value='Guam'>Guam</option> "
		          + "<option value='Guatemala'>Guatemala</option> "
		          + "<option value='Guinea'>Guinea</option> "
		          + "<option value='Guinea-bissau'>Guinea-bissau</option> "
		          + "<option value='Guyana'>Guyana</option> "
		          + "<option value='Haiti'>Haiti</option> "
		          + "<option value='Heard Island and Mcdonald Islands'>Heard Island and Mcdonald Islands</option> "
		          + "<option value='Holy See (Vatican City State)'>Holy See (Vatican City State)</option> "
		          + "<option value='Honduras'>Honduras</option> "
		          + "<option value='Hong Kong'>Hong Kong</option> "
		          + "<option value='Hungary'>Hungary</option> "
		          + "<option value='Iceland'>Iceland</option> "
		          + "<option value='India'>India</option> "
		          + "<option value='Indonesia'>Indonesia</option> "
		          + "<option value='Iran, Islamic Republic of'>Iran, Islamic Republic of</option> "
		          + "<option value='Iraq'>Iraq</option> "
		          + "<option value='Ireland'>Ireland</option> "
		          + "<option value='Israel'>Israel</option> "
		          + "<option value='Italy'>Italy</option> "
		          + "<option value='Jamaica'>Jamaica</option> "
		          + "<option value='Japan'>Japan</option> "
		          + "<option value='Jordan'>Jordan</option> "
		          + "<option value='Kazakhstan'>Kazakhstan</option> "
		          + "<option value='Kenya'>Kenya</option> "
		          + "<option value='Kiribati'>Kiribati</option> "
		          + "<option value='Korea, Democratic People\'s Republic of'>Korea, Democratic People\'s Republic of</option> "
		          + "<option value='Korea, Republic of'>Korea, Republic of</option> "
		          + "<option value='Kuwait'>Kuwait</option> "
		          + "<option value='Kyrgyzstan'>Kyrgyzstan</option> "
		          + "<option value='Lao People\'s Democratic Republic'>Lao People\'s Democratic Republic</option> "
		          + "<option value='Latvia'>Latvia</option> "
		          + "<option value='Lebanon'>Lebanon</option> "
		          + "<option value='Lesotho'>Lesotho</option> "
		          + "<option value='Liberia'>Liberia</option> "
		          + "<option value='Libyan Arab Jamahiriya'>Libyan Arab Jamahiriya</option> "
		          + "<option value='Liechtenstein'>Liechtenstein</option> "
		          + "<option value='Lithuania'>Lithuania</option> "
		          + "<option value='Luxembourg'>Luxembourg</option> "
		          + "<option value='Macao'>Macao</option> "
		          + "<option value='Macedonia, The Former Yugoslav Republic of'>Macedonia, The Former Yugoslav Republic of</option> "
		          + "<option value='Madagascar'>Madagascar</option> "
		          + "<option value='Malawi'>Malawi</option> "
		          + "<option value='Malaysia'>Malaysia</option> "
		          + "<option value='Maldives'>Maldives</option> "
		          + "<option value='Mali'>Mali</option> "
		          + "<option value='Malta'>Malta</option> "
		          + "<option value='Marshall Islands'>Marshall Islands</option> "
		          + "<option value='Martinique'>Martinique</option> "
		          + "<option value='Mauritania'>Mauritania</option> "
		          + "<option value='Mauritius'>Mauritius</option> "
		          + "<option value='Mayotte'>Mayotte</option> "
		          + "<option value='Mexico'>Mexico</option> "
		          + "<option value='Micronesia, Federated States of'>Micronesia, Federated States of</option> "
		          + "<option value='Moldova, Republic of'>Moldova, Republic of</option> "
		          + "<option value='Monaco'>Monaco</option> "
		          + "<option value='Mongolia'>Mongolia</option> "
		          + "<option value='Montenegro'>Montenegro</option>"
		          + "<option value='Montserrat'>Montserrat</option> "
		          + "<option value='Morocco'>Morocco</option> "
		          + "<option value='Mozambique'>Mozambique</option> "
		          + "<option value='Myanmar'>Myanmar</option> "
		          + "<option value='Namibia'>Namibia</option> "
		          + "<option value='Nauru'>Nauru</option> "
		          + "<option value='Nepal'>Nepal</option> "
		          + "<option value='Netherlands'>Netherlands</option> "
		          + "<option value='Netherlands Antilles'>Netherlands Antilles</option> "
		          + "<option value='New Caledonia'>New Caledonia</option> "
		          + "<option value='New Zealand'>New Zealand</option> "
		          + "<option value='Nicaragua'>Nicaragua</option> "
		          + "<option value='Niger'>Niger</option> "
		          + "<option value='Nigeria'>Nigeria</option> "
		          + "<option value='Niue'>Niue</option> "
		          + "<option value='Norfolk Island'>Norfolk Island</option> "
		          + "<option value='Northern Mariana Islands'>Northern Mariana Islands</option> "
		          + "<option value='Norway'>Norway</option> "
		          + "<option value='Oman'>Oman</option> "
		          + "<option value='Pakistan'>Pakistan</option> "
		          + "<option value='Palau'>Palau</option> "
		          + "<option value='Palestinian Territory, Occupied'>Palestinian Territory, Occupied</option> "
		          + "<option value='Panama'>Panama</option> "
		          + "<option value='Papua New Guinea'>Papua New Guinea</option> "
		          + "<option value='Paraguay'>Paraguay</option> "
		          + "<option value='Peru'>Peru</option> "
		          + "<option value='Philippines'>Philippines</option> "
		          + "<option value='Pitcairn'>Pitcairn</option> "
		          + "<option value='Poland'>Poland</option> "
		          + "<option value='Portugal'>Portugal</option> "
		          + "<option value='Puerto Rico'>Puerto Rico</option> "
		          + "<option value='Qatar'>Qatar</option> "
		          + "<option value='Reunion'>Reunion</option> "
		          + "<option value='Romania'>Romania</option> "
		          + "<option value='Russian Federation'>Russian Federation</option> "
		          + "<option value='Rwanda'>Rwanda</option> "
		          + "<option value='Saint Helena'>Saint Helena</option> "
		          + "<option value='Saint Kitts and Nevis'>Saint Kitts and Nevis</option> "
		          + "<option value='Saint Lucia'>Saint Lucia</option> "
		          + "<option value='Saint Pierre and Miquelon'>Saint Pierre and Miquelon</option> "
		          + "<option value='Saint Vincent and The Grenadines'>Saint Vincent and The Grenadines</option> "
		          + "<option value='Samoa'>Samoa</option> "
		          + "<option value='San Marino'>San Marino</option> "
		          + "<option value='Sao Tome and Principe'>Sao Tome and Principe</option> "
		          + "<option value='Saudi Arabia'>Saudi Arabia</option> "
		          + "<option value='Senegal'>Senegal</option> "
		          + "<option value='Serbia'>Serbia</option> "
		          + "<option value='Seychelles'>Seychelles</option> "
		          + "<option value='Sierra Leone'>Sierra Leone</option> "
		          + "<option value='Singapore'>Singapore</option> "
		          + "<option value='Slovakia'>Slovakia</option> "
		          + "<option value='Slovenia'>Slovenia</option> "
		          + "<option value='Solomon Islands'>Solomon Islands</option> "
		          + "<option value='Somalia'>Somalia</option> "
		          + "<option value='South Africa'>South Africa</option> "
		          + "<option value='South Georgia and The South Sandwich Islands'>South Georgia and The South Sandwich Islands</option> "
		          + "<option value='South Sudan'>South Sudan</option> "
		          + "<option value='Spain'>Spain</option> "
		          + "<option value='Sri Lanka'>Sri Lanka</option> "
		          + "<option value='Sudan'>Sudan</option> "
		          + "<option value='Suriname'>Suriname</option> "
		          + "<option value='Svalbard and Jan Mayen'>Svalbard and Jan Mayen</option> "
		          + "<option value='Swaziland'>Swaziland</option> "
		          + "<option value='Sweden'>Sweden</option> "
		          + "<option value='Switzerland'>Switzerland</option> "
		          + "<option value='Syrian Arab Republic'>Syrian Arab Republic</option> "
		          + "<option value='Taiwan, Republic of China'>Taiwan, Republic of China</option> "
		          + "<option value='Tajikistan'>Tajikistan</option> "
		          + "<option value='Tanzania, United Republic of'>Tanzania, United Republic of</option> "
		          + "<option value='Thailand'>Thailand</option> "
		          + "<option value='Timor-leste'>Timor-leste</option> "
		          + "<option value='Togo'>Togo</option> "
		          + "<option value='Tokelau'>Tokelau</option> "
		          + "<option value='Tonga'>Tonga</option> "
		          + "<option value='Trinidad and Tobago'>Trinidad and Tobago</option> "
		          + "<option value='Tunisia'>Tunisia</option> "
		          + "<option value='Turkey'>Turkey</option> "
		          + "<option value='Turkmenistan'>Turkmenistan</option> "
		          + "<option value='Turks and Caicos Islands'>Turks and Caicos Islands</option> "
		          + "<option value='Tuvalu'>Tuvalu</option> "
		          + "<option value='Uganda'>Uganda</option> "
		          + "<option value='Ukraine'>Ukraine</option> "
		          + "<option value='United Arab Emirates'>United Arab Emirates</option> "
		          + "<option value='United Kingdom'>United Kingdom</option> "
		          + "<option value='United States'>United States</option> "
		          + "<option value='United States Minor Outlying Islands'>United States Minor Outlying Islands</option> "
		          + "<option value='Uruguay'>Uruguay</option> "
		          + "<option value='Uzbekistan'>Uzbekistan</option> "
		          + "<option value='Vanuatu'>Vanuatu</option> "
		          + "<option value='Venezuela'>Venezuela</option> "
		          + "<option value='Viet Nam'>Viet Nam</option> "
		          + "<option value='Virgin Islands, British'>Virgin Islands, British</option> "
		          + "<option value='Virgin Islands, U.S.'>Virgin Islands, U.S.</option> "
		          + "<option value='Wallis and Futuna'>Wallis and Futuna</option> "
		          + "<option value='Western Sahara'>Western Sahara</option> "
		          + "<option value='Yemen'>Yemen</option> "
		          + "<option value='Zambia'>Zambia</option> "
		          + "<option value='Zimbabwe'>Zimbabwe</option>"
		);
}

function populateStates() {
	$("#state").append("<option value='' />" +
					   	"<option value='AL'>Alabama</option>" +
						"<option value='AK'>Alaska</option>" +
						"<option value='AZ'>Arizona</option>" +
						"<option value='AR'>Arkansas</option>" +
						"<option value='CA'>California</option>" +
						"<option value='CO'>Colorado</option>" +
						"<option value='CT'>Connecticut</option>" +
						"<option value='DE'>Delaware</option>" +
						"<option value='DC'>District of Columbia</option>" +
						"<option value='FL'>Florida</option>" +
						"<option value='GA'>Georgia</option>" +
						"<option value='HI'>Hawaii</option>" +
						"<option value='ID'>Idaho</option>" +
						"<option value='IL'>Illinois</option>" +
						"<option value='IN'>Indiana</option>" +
						"<option value='IA'>Iowa</option>" +
						"<option value='KS'>Kansas</option>" +
						"<option value='KY'>Kentucky</option>" +
						"<option value='LA'>Louisiana</option>" +
						"<option value='ME'>Maine</option>" +
						"<option value='MD'>Maryland</option>" +
						"<option value='MA'>Massachusetts</option>" +
						"<option value='MI'>Michigan</option>" +
						"<option value='MN'>Minnesota</option>" +
						"<option value='MS'>Mississippi</option>" +
						"<option value='MO'>Missouri</option>" +
						"<option value='MT'>Montana</option>" +
						"<option value='NE'>Nebraska</option>" +
						"<option value='NV'>Nevada</option>" +
						"<option value='NH'>New Hampshire</option>" +
						"<option value='NJ'>New Jersey</option>" +
						"<option value='NM'>New Mexico</option>" +
						"<option value='NY'>New York</option>" +
						"<option value='NC'>North Carolina</option>" +
						"<option value='ND'>North Dakota</option>" +
						"<option value='OH'>Ohio</option>" +
						"<option value='OK'>Oklahoma</option>" +
						"<option value='OR'>Oregon</option>" +
						"<option value='PA'>Pennsylvania</option>" +
						"<option valur='PR'>Puerto Rico</option>" +
						"<option value='RI'>Rhode Island</option>" +
						"<option value='SC'>South Carolina</option>" +
						"<option value='SD'>South Dakota</option>" +
						"<option value='TN'>Tennessee</option>" +
						"<option value='TX'>Texas</option>" +
						"<option value='UT'>Utah</option>" +
						"<option value='VT'>Vermont</option>" +
						"<option value='VA'>Virginia</option>" +
						"<option value='WA'>Washington</option>" +
						"<option value='WV'>West Virginia</option>" +
						"<option value='WI'>Wisconsin</option>" +
						"<option value='WY'>Wyoming</option>"
	);
}
