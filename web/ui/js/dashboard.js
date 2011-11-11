$(document).ready(function() {
	var search_watermark = $('label[for="search"]'),
		time = 1000,
		nav_clicked,
		accordion_clicked,
		skip_button = $(".skip"),
		continue_button = $('#continue'),
		portfolio = $('#portfolio');
	// Set up displays that only work with jQuery running
	search_watermark.show();
	$('.arrow, .grey-arrow').addClass('right');
	$('.subnav').slideUp(time);
	continue_button.hide();
	$('.extras').hide();
	
	// Hide the Search watermark on keypress
	$('#search').keypress(function(event){
		// 13 is the enter key
		if (event.keyCode == 13)
			$(this).after('SEARCHING....');
		else
			search_watermark.fadeOut(time);	
	}).blur(function(){
		// Show the Search watermark if filed is empty
		if ($(this).val() == '')
			search_watermark.fadeIn(time);
	});
	
	skip_button.mousedown(function(e){
		// disable default behavior
		e.preventDefault();
		
		$(this).find("div").addClass("active");
	}).mouseup(function(){
		$(this).find("div").removeClass("active");	
	});
	
	// Switches the skip button to a continue button when the user inputs data
	$("form[name='portfolio'] input").focus(function(){
		skip_button.hide();
		continue_button.show();
	});
	
	// Navigation animation
	$('nav a:not(.subnav a)').click(function(e){
		// disable default behavior
		e.preventDefault();
		
		// close expanded subsection
		if (nav_clicked) {
			$(nav_clicked).find('div').addClass('right')
							          .removeClass('down');
			$(nav_clicked).next('.subnav').slideUp(time);
		}
		if (nav_clicked == this) {
			nav_clicked = undefined;
		} else {
			nav_clicked = this;	
			$(this).find('div').addClass('down')
							   .removeClass('right');
			$(this).next('.subnav').slideDown(time);
		}
	}).hover(function(){
		$(this).find('div').addClass('active');
	}, function(){
		$(this).find('div').removeClass('active');
	});
	
	/*$('nav li:not(.subnav li)').hoverIntent(function(){
		$(this).find('div').addClass('down active')
		                   .removeClass('right');
		$(this).parent().next('.subnav').slideDown(time);
		$(this).parent().parent().mouseleave(function() {
			$(this).find('div').addClass('right')
			                   .removeClass('down active');
			$(this).find('.subnav').slideUp(time);
		});
	}, function(){ // exit function
		$(this).find('div').removeClass('active');
	});*/
	
	// Accordion
	// Navigation animation
	$('.accordion a:not(.subnav a)').click(function(e){
		// disable default behavior
		e.preventDefault();
		
		// close expanded subsection
		if (accordion_clicked) {
			$(accordion_clicked).find('div').addClass('right')
							                .removeClass('down');
			$(accordion_clicked).parent().find('.subnav').slideUp(time);
			$(accordion_clicked).find('li').removeClass('active');
		}
		if (accordion_clicked == this) {
			accordion_clicked = undefined;
		} else { // expand subsection
			accordion_clicked = this;	
			$(this).find('div').addClass('down')
							   .removeClass('right');
			$(this).parent().find('.subnav').slideDown(time);
			$(this).find('li').addClass('active');
		}
	}).hover(function(){
		$(this).find('div').addClass('active');
	}, function(){
		$(this).find('div').removeClass('active');
	});
	
	$('.zip-chzn').load('../res/zipcode_select.html', function() {
		alert('loaded');
	});
	
	// Adds Chosen widget to the Zip Code selection field
	$(".zip-chzn").chosen({no_results_text: "No matching zip code found."}).change(
				  function() {
					// can't select nothing, so hides the error
					var id = $(this).attr('id');
					id = '#' + id;
					portfolio.validate().element(id);
					$(id).valid();
	});
});