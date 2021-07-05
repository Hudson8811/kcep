document.addEventListener('DOMContentLoaded', () => {
	const FP = new fullpage('#fullpage', {
		licenseKey: '930B3D8E-64114A48-BE58EB40-E2698A87',
		autoScrolling: true,
		scrollOverflow: true,
		navigation: true,
		paddingTop: '0',
		paddingBottom: '0',
		verticalCentered: false,
		responsiveHeight: true
	});
	
	//methods
	
	const nextSlideBtn = document.querySelector('.home-hero__bottom-left');
	
	if (nextSlideBtn) {
		nextSlideBtn.addEventListener('click', () => {
			fullpage_api.moveSectionDown();
		})
	}
})

