/*
 clearInput
 This plugin is using jQuery UI lib, must be enabled before this plugin called
 jQuery UI code snippets for Google CDN
 <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js"></script>
 <link rel="stylesheet" class="theme-link" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.0/themes/base/jquery-ui.css" type="text/css" media="screen" />

 Plugin is showing UI icon and removes the inputs value on click

 @name			jquery.clearinput.js
 @author		Maksim Bikov
 @version		0.1
 @date			20-May-2013
 @copyright		(c) 2013 Maksim Bikov
 @license		MIT License
 @homepage		https://github.com/pebehb/clearInput
 @example		...
 @usage
<script type="text/javascript">
(function($){
	$('input').clearInput();
})(jQuery);
</script>

*/
(function($){
	$.clearInput = function(el, options){
		// To avoid scope issues, use 'base' instead of 'this'
		// to reference this class from internal events and functions.
		var base = this;

		base.$el = $(el);
		base.options = $.extend({},$.clearInput.defaultOptions, options);
		base.span = $('<span class="ui-icon ui-icon-circle-close"></span>')
						.css($.clearInput.spanCss)
						.addClass(base.options.spanClass);

		// Add a reverse reference to the DOM object
		base.$el.data("clearInput", base);

		base.init = function(){
			// overvwriting default settings if any

			// not in all markups need to wrap input element
			if (base.options.wrapper)
			{
				var wrappper = $('<div/>')
						.css($.clearInput.wrapperCss)
						.addClass(base.options.wrapperClass);
				base.$el.wrap(wrappper);
			}
			// start up status could be changed
			if ( !base.hideOrShow() )
			{
				base.span.hide();
			}
			// inserting prepared span here
			base.$el.after(base.span);
			// let cover all element events
			base.$el.on('keypress keyup change blur focus', function(){
				base.changeVisibility();
			});
			// we should clena input's value by clicking on span
			base.span.on('click', function(){
				base.$el.val('').change().focus();
				// specific issue - need to call outsourced function
				if (base.$el.attr('name') == 'location[keyword]' && clearLocationFields != 'undefined')
				{
					clearLocationFields();
				}
			});
		};

		base.changeVisibility = function()
		{
			var newtop = base.$el.position().top+6;
			base.hideOrShow() ? base.span.css({top: newtop}).show() : base.span.hide();
		};

		base.hideOrShow = function()
		{
			return $('body').innerWidth() <= 1024 && base.$el.val().length > 0;
		};

		// Run initializer
		base.init();
	};

	$.clearInput.defaultOptions = {
		wrapperClass: 'clearInput',
		spanClass: '', // additional class if needed
		wrapper: true
	};

	$.clearInput.spanCss = {'position':'absolute', 'top':'0px', 'right':'3px', 'width':'16px', 'cursor':'pointer', 'zIndex':10};
	$.clearInput.wrapperCss = {'position':'relative'};

	$.fn.clearInput = function(options){
		return this.each(function(){
			if (this.tagName == 'INPUT' && (this.type == 'text' || this.type == 'password'))
			{
				(new $.clearInput(this, options));
			}
		});
	};

})(jQuery);
