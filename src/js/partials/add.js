$(window).on('load',function (){
	if ($('.p-sheme').length > 0){
		$('.p-sheme__dot').on('click mouseenter',function (){
			event.preventDefault();
			if (!$(this).hasClass('active')){
				$(this).addClass('active').siblings('.p-sheme__dot').removeClass('active');
			}
		});
	}
});

document.addEventListener("DOMContentLoaded", function () {
	if ($('.start-body').length > 0){
		if ($(window).width() > 1559){
			initAnimation('.i1920 path.cable');
		} else if ($(window).width() > 1025) {
			initAnimation('.i1440 path.cable');
		}

		function initAnimation(elems){
			$(elems).each(function (index,elem){
				let length = elem.getTotalLength();
				elem.style.transition = elem.style.WebkitTransition = 'none';
				elem.style.strokeDasharray = length + ' ' + length;
				if ($(elem).hasClass('cable-invert')){
					elem.style.strokeDashoffset = -length;
				} else {
					elem.style.strokeDashoffset = length;
				}
				elem.getBoundingClientRect();

				if ($(elem).hasClass('cable-7')){
					elem.style.transition = elem.style.WebkitTransition = 'stroke-dashoffset 1s linear';
					setTimeout(function (){
						elem.style.strokeDashoffset = '0';
					},0);
				}
				if ($(elem).hasClass('cable-8')){
					elem.style.transition = elem.style.WebkitTransition = 'stroke-dashoffset 1s linear';
					setTimeout(function (){
						elem.style.strokeDashoffset = '0';
					},0);
				}

				if ($(elem).hasClass('cable-6')){
					elem.style.transition = elem.style.WebkitTransition = 'stroke-dashoffset 0.6s linear';
					setTimeout(function (){
						elem.style.strokeDashoffset = '0';
					},1000);
				}
				if ($(elem).hasClass('cable-5')){
					elem.style.transition = elem.style.WebkitTransition = 'stroke-dashoffset 0.6s linear';
					setTimeout(function (){
						elem.style.strokeDashoffset = '0';
					},1000);
				}
				if ($(elem).hasClass('cable-4')){
					elem.style.transition = elem.style.WebkitTransition = 'stroke-dashoffset 0.5s linear';
					setTimeout(function (){
						elem.style.strokeDashoffset = '0';
					},1600);
				}
				if ($(elem).hasClass('cable-3')){
					elem.style.transition = elem.style.WebkitTransition = 'stroke-dashoffset 0.3s linear';
					setTimeout(function (){
						elem.style.strokeDashoffset = '0';
					},2100);
				}
				if ($(elem).hasClass('cable-2')){
					elem.style.transition = elem.style.WebkitTransition = 'stroke-dashoffset 0.3s linear';
					setTimeout(function (){
						elem.style.strokeDashoffset = '0';
					},2400);
				}
				if ($(elem).hasClass('cable-1')){
					elem.style.transition = elem.style.WebkitTransition = 'stroke-dashoffset 0.3s linear';
					setTimeout(function (){
						elem.style.strokeDashoffset = '0';
					},2700);
				}

				if ($(elem).hasClass('cable-9')){
					elem.style.transition = elem.style.WebkitTransition = 'stroke-dashoffset 1s linear';
					setTimeout(function (){
						elem.style.strokeDashoffset = '0';
					},0);
				}
				if ($(elem).hasClass('cable-10')){
					elem.style.transition = elem.style.WebkitTransition = 'stroke-dashoffset 1s linear';
					setTimeout(function (){
						elem.style.strokeDashoffset = '0';
					},0);
				}
				if ($(elem).hasClass('cable-11')){
					elem.style.transition = elem.style.WebkitTransition = 'stroke-dashoffset 0.8s linear';
					setTimeout(function (){
						elem.style.strokeDashoffset = '0';
					},1000);
				}
				if ($(elem).hasClass('cable-12')){
					elem.style.transition = elem.style.WebkitTransition = 'stroke-dashoffset 1s linear';
					setTimeout(function (){
						elem.style.strokeDashoffset = '0';
					},1800);
				}
				if ($(elem).hasClass('cable-13')){
					elem.style.transition = elem.style.WebkitTransition = 'stroke-dashoffset 1s linear';
					setTimeout(function (){
						elem.style.strokeDashoffset = '0';
					},1800);
				}
			});
		}
	}

});
