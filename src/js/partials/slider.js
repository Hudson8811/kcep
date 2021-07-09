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

	const productSlider = $("#productSlider").slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 3000,
		dots: true,
		dotsClass: 'product-hero__pagination',
		customPaging: function(slick,index) {
			var targetImage = slick.$slides.eq(index).find('img').attr('src');
			return '<img src=" ' + targetImage + ' "/><div class="timeline"></div>';
		},
		responsive: [
			{
				breakpoint: 400,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					centerMode: true,
					variableWidth: true
				}
			}
		]
	})
});
