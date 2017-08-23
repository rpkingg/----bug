(function($, document) {
	function mainResize() {
		var fontSize = $(window).width() / 10;
		$("html").css('font-size', fontSize + 'px');
	}
	mainResize();
	$(window).resize(function() {
		mainResize();
	});
})(jQuery, document);