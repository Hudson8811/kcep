$(document).ready(function () {
	$(".sh-burger").click(function () {
		$(this).toggleClass("sh-burger--active");
		$(".header__nav").toggleClass("nav--open");
		$(".header__lang").toggleClass("nav--open");
		$(document.body).toggleClass("scroll-stoped");
	});
});
