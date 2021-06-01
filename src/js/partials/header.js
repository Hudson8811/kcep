$(document).ready(function () {
	$(".sh-burger").click(function () {
		$(this).toggleClass("sh-burger--active");
		$(".header__nav").toggleClass("nav--open");
	});
});
