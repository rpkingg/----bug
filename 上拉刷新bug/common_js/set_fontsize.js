(function($, document) {
	console.log("This is a test");
	var fontSize = $(window).width() / 10;
	$("html").css('font-size', fontSize + 'px');
})(jQuery, document);