/*
 * jQuery Show Password Plugin
 * http://github.com/davist11/jQuery-Show-Password
 *
 * Copyright (c) 2010 Trevor Davis (http://trevordavis.net)
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://jquery.org/license
 *
 * @version 0.3
 *
 * Example usage:
 * $(':password').showPassword({
 *   linkClass: 'show-password-link',
 *   linkText: 'Show',
 *   showPasswordLinkText: 'Hide',
 *   showPasswordInputClass: 'password-showing',
 *   linkRightOffset: 0,
 *   linkTopOffset: 0
 * });
 */
;(function($) {
// Add button to show password in input field
$.fn.showPassword = function(options) {
  var opts = $.extend({}, $.fn.showPassword.defaults, options);

  return this.each(function() {
    var $this = $(this),
        elPosition = $this.position(),
        elWidth = $this.outerWidth(),
        elHeight = $this.outerHeight(),
        $parent = $this.parent(),
        parentHeight = $parent.height(),
		id = $this.attr('id'),
		arrowdown = $.Event('keyup');
		
	arrowdown.which = '35';

    // Support for the Metadata Plugin.
    var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
    
    $parent.height(parentHeight);
  
    //Create the link
    $('<a/>', {
      href: '#',
      'class': o.linkClass,
      click: function(e) {
        var $showPassInput = $parent.find('.'+o.showPasswordInputClass),
			showPassInputId = $showPassInput.attr('id');
			toggleLink = $this.prev('.watermark');
        if($this.css('display') === 'none') { //If the regular input is hidden, show it
          $(this).text(o.linkText);
          $this.val($showPassInput.val()).show();
          $showPassInput.hide();
		  $("label[for='" + id + "']").show();
		  if ($this.val() !== '') {
			$this.focus().trigger(arrowdown);
		} else {
		  // show watermark
		  toggleLink.show();
		  $this.trigger(arrowdown);
		}
        } else { //If the showing password input is hidden, show it
          $(this).text(o.showPasswordLinkText);
          $showPassInput.val($this.val()).show().focus().trigger(arrowdown);
          $this.hide();
		  // hide watermark
		  toggleLink.hide();
        }
        e.preventDefault();
      },
      css: {
        left: elPosition.left + elWidth,
        top: elPosition.top + elHeight
      },
      text: o.linkText
    }).appendTo($parent);
    
    var $toggleAnchor = $parent.find('.'+o.linkClass),
        toggleAnchorWidth = $toggleAnchor.outerWidth(),
        toggleAnchorLeft = parseInt($toggleAnchor.css('left'), 10),
        toggleAnchorHeight = $toggleAnchor.outerHeight(),
        toggleAnchorTop = parseInt($toggleAnchor.css('top'), 10);
        
    $toggleAnchor.css({
      'left': (toggleAnchorLeft - toggleAnchorWidth - o.linkRightOffset),
      'top': (toggleAnchorTop - toggleAnchorHeight - o.linkTopOffset)
    });

	// position #password toggle link
	if ($this.attr('id') == 'password') {
		$toggleAnchor.css({
	      'left': 188,
	      'top': 102
	    });
	}
    
    //Create the input to switch
    $(this).before($('<input/>', {
      'class': o.showPasswordInputClass + " password img",
	  'id': o.showPasswordInputClass,
	  'maxlength': parseInt($(this).attr('maxlength'), 10),
      css: {
        display: 'none'
      },
      type: 'text'
    }));
    
    //When form is submitted and password is hidden, update the password val
    $this.closest('form').bind('submit', function() {
      if($this.css('display') === 'none') {
		var $showPassInput = $this.siblings('.'+o.showPasswordInputClass);
        $this.val($showPassInput.val()).show();
        $showPassInput.hide();
		$("label[for='" + id + "']").show().trigger(arrowdown);
		$this.prev().hide();
      }
    });
    
  });
};

// default options
$.fn.showPassword.defaults = {
  linkClass: 'show-password-link',
  linkText: 'Show',
  showPasswordLinkText: 'Hide',
  showPasswordInputClass: 'password-showing',
  linkRightOffset: 180,
  linkTopOffset: 0
};

})(jQuery);