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