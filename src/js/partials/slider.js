$(document).ready(function () {
	const historySlider = $("#historySlider").slick({
		dots: true,
		arrows: true,
		infinite: true,
		slidesToShow: 1,
		prevArrow: ".slider-button-prev",
		nextArrow: ".slider-button-next",
		appendDots: ".slider-pagination-wrapper",
		dotsClass: "slider-pagination",
	});

	const productionSlider = $("#productionSlider").slick({
		dots: true,
		arrows: true,
		infinite: true,
		slidesToShow: 1,
		prevArrow: ".about-production-slider-button-prev",
		nextArrow: ".about-production-slider-button-next",
		appendDots: ".about-production-slider-pagination-wrapper",
		dotsClass: "slider-pagination",
	});
});
