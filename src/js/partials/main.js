document.addEventListener("DOMContentLoaded", function () {
	const titleTrim = (e) => {
		const title = document.querySelector(".home-video__title");

		if (!title) {
			return;
		}

		if (e.matches) {
			title.textContent = `Производствен-
         ные мощности`;
		} else {
			title.textContent = `Производственные мощности`;
		}
	};

	const checkWidth = () => {
		const media = window.matchMedia("(max-width: 400px)");

		titleTrim(media);

		media.addEventListener("change", titleTrim);
	};

	checkWidth();

	const toggleTabs = () => {
		const videoSection = document.querySelector('.home-video');

		if (!videoSection) {
			return;
		}

		const tabsWrapper = videoSection.querySelector(
			".home-video__tabs-control-inner"
		);
		const tabs = tabsWrapper.querySelectorAll(".home-video__tab");
		const tabsItems = videoSection.querySelectorAll(".home-video__tabs-item");
		const tabsVideo = videoSection.querySelectorAll('video');

		let count = 0;

		tabsVideo.forEach((item, idx) => {
			item.addEventListener('ended', () => {
				autoplay();
			})
			item.addEventListener('timeupdate', () => {
				
				if (item.currentTime >= item.duration - 1 && item.classList.contains('video--active')) {
					item.classList.remove('video--active');
				}
				if (item.currentTime <= 1 && !item.classList.contains('video--active')) {
					item.classList.add('video--active');
				}
			})
		})

		function autoplay() {
			tabs.forEach((tab) => tab.classList.remove("tab--active"));
			tabsItems.forEach((tabsItem) => tabsItem.classList.remove("active"));

			const currentVideo = tabsItems[count].querySelector('video');
			const timeline = tabs[count].querySelector('.home-video__tab-timeline');
			
			timeline.classList.add('timeline--active');

			currentVideo.addEventListener('timeupdate', () => {
				timeline.style.width = `${(currentVideo.currentTime / (currentVideo.duration - 1.2)) * 100}%`;

				if (currentVideo.currentTime === currentVideo.duration) {
					timeline.style.width = 0;
					timeline.classList.remove('timeline--active');
				}
			})

			currentVideo.play();
			if (count < tabsItems.length) {
				tabs[count].classList.add("tab--active");
				tabsItems[count].classList.add("active");
			}

			count++;

			if (count === tabsItems.length) {
				count = 0;
			}
		};

		$('.home-video__anchor').one('inview', function(event, isInView) {
			if (isInView) {
				autoplay();
			}
		})

		tabsWrapper.addEventListener("click", (event) => {
			let target = event.target;

			target = target.closest(".home-video__tab");

			if (target && !target.classList.contains('tab--active')) {
				tabs.forEach((tab, idx) => {
					tabsVideo[idx].classList.remove('video--active');
					const video = tabsItems[idx].querySelector('video');
					
					tab.classList.remove("tab--active");
					tab.querySelector('.home-video__tab-timeline').classList.remove('timeline--active');
					tabsItems[idx].classList.remove("active");
					video.pause();
					video.currentTime = 0;

					if (tab === target) {
						const currentVideo = tabsItems[idx].querySelector('video');
						const timeline = tab.querySelector('.home-video__tab-timeline');

						tabsItems[idx].classList.add("active");
						tab.querySelector('.home-video__tab-timeline').classList.add('timeline--active');
						currentVideo.classList.add('video--active');

						count = idx < 2 ? idx + 1 : 0;

						currentVideo.addEventListener('timeupdate', () => {
							timeline.style.width = `${(currentVideo.currentTime / currentVideo.duration) * 100}%`;
			
							if (currentVideo.currentTime === currentVideo.duration) {
								timeline.style.width = 0;
								timeline.classList.remove('timeline--active');
							}
						})

						video.play();
					}
					target.classList.add("tab--active");
				});

				
			}
		});
	};

	toggleTabs();

	const toggleInfoPopups = () => {

		const tabs = document.querySelectorAll(".product-info__tabs-item");
		const slides = document.querySelectorAll(".product-hero__slide");
		const tabsControlItems = document.querySelectorAll(
				".product-info__tabs-control-item"
		);

		if (!tabs.length) {
			return;
		}

		tabsControlItems[0].classList.add("active");
		tabs[0].classList.add("active");
		slides[0].classList.add("active");

		const toggleActiveClass = (targetItem) => {
			const items = document.querySelectorAll(`.${targetItem.className}`);
			const activeTab = document.querySelector(
					".product-info__tabs-item.active"
			);
			const activeSlide = document.querySelector(".product-hero__slide.active");

			if (
					targetItem.classList.contains("product-info__tabs-control-item") &&
					!targetItem.classList.contains("active")
			) {
				activeTab.classList.remove("active");
			}

			if (
					targetItem.classList.contains("product-hero__pagination-item") &&
					!targetItem.classList.contains("active")
			) {
				activeSlide.classList.remove("active");
			}

			items.forEach((item, index) => {
				if (item.classList.contains("active")) {
					item.classList.remove("active");
				}
				if (item === targetItem && !item.classList.contains("active")) {
					item.classList.add("active");

					if (
							targetItem.classList.contains("product-info__tabs-control-item")
					) {
						tabs[index].classList.add("active");
					}

					if (targetItem.classList.contains("product-hero__pagination-item")) {
						slides[index].classList.add("active");
					}
				}
			});
		};

		const clickHandler = (e) => {
			let target = e.target;

			if (target.closest(".product-info__tabs-control-item")) {
				toggleActiveClass(target.closest(".product-info__tabs-control-item"));
			}

			if (target.closest(".product-hero__pagination-item")) {
				toggleActiveClass(target.closest(".product-hero__pagination-item"));
			}
		};


		document.addEventListener("click", clickHandler);
	};

	toggleInfoPopups();

	const toggleMapsPoints = () => {
		const mapList = document.querySelector(".about-geography__list");
		const mapListItems = mapList.querySelectorAll("li");
		const points = document.querySelectorAll(".about-geography__map-point");

		mapList.addEventListener("mouseover", (event) => {
			event.preventDefault();
			const target = event.target;

			if (target.closest("li")) {
				target.closest("li").classList.add("active");

				mapListItems.forEach((li, index) => {
					if (target.closest("li") === li) {
						if (points[index]) {
							points[index].classList.add("active");
						}
					}
				});
			}
		});

		mapList.addEventListener("mouseout", (event) => {
			event.preventDefault();
			const target = event.target;

			if (target.closest("li")) {
				target.closest("li").classList.remove("active");

				mapListItems.forEach((li, index) => {
					if (target.closest("li") === li) {
						if (points[index].classList.contains('active')) {
							points[index].classList.remove("active");
						}
					}
				});
			}
		});

		mapList.addEventListener("click", (event) => {
			const target = event.target;

			if (target.matches("a")) {
				event.preventDefault();
			}
		});
	};

	function isMapPage() {
		const mapList = document.querySelector(".about-geography__list");
		if (mapList) {
			return true;
		}
		return false;
	}

	if (isMapPage()) {
		toggleMapsPoints();
	}

	const displayTime = () => {
		const time = document.querySelectorAll(".time");
		const timeZone = 6;
		const date = new Date(
			new Date().getTime() + timeZone * 3600 * 1000
		).toUTCString();

		const regExp = /\d\d:\d\d/g;
		const timeRaw = date.match(regExp);
		const timeArr = timeRaw[0].split(":");

		const hours = timeArr[0];
		const fullHours = hours.length < 2 ? `0${hours}` : hours;

		const minutes = timeArr[1];
		const fullMinutes = minutes.length < 2 ? `0${minutes}` : minutes;

		time.forEach((text) => (text.textContent = `${fullHours}:${fullMinutes}`));
	};

	displayTime();

	setInterval(displayTime, 1000);

	const toggleZoomPopup = () => {
		const imgPopup = document.querySelector(".img-popup");
		const imgsList = document.querySelectorAll(".images-for-zoom");

		if (imgsList.length && imgPopup) {
			const popupInnerImg = imgPopup.querySelector("img");
			const PopupText = imgPopup.querySelector("p");

			imgsList.forEach(list => {
				list.addEventListener("click", (event) => {
					event.preventDefault();
	
					let target = event.target;

					if (!target.closest('.certificates-item__link')) {
						const targetText = target.querySelector('p');

						if (targetText) {
							PopupText.textContent = targetText.textContent;
						}
		
						target = target.closest("img");
		
						if (target) {
							const imgSrc = target.dataset.popup;
		
							popupInnerImg.src = imgSrc;
		
							imgPopup.classList.add("active");
							document.body.classList.add("scroll-stoped");
						}
					} 
					
					target = target.closest('.certificates-item__link');

					if (target) {
						const img = target.querySelector('img');
						const text = target.querySelector('p').textContent;

						popupInnerImg.src = img.dataset.popup;
						PopupText.textContent = text;

						imgPopup.classList.add("active");
						document.body.classList.add("scroll-stoped");
					}

					
				});
			})

			imgPopup.addEventListener("click", (event) => {
				const target = event.target;

				if (
					target.matches(".img-popup") ||
					target.closest(".img-popup__close") ||
					target.closest(".img-popup__button-prev")
				) {
					imgPopup.classList.remove("active");
					document.body.classList.remove("scroll-stoped");
				}
			});
		}
	};

	const isZoomImgsPage = () => {
		const imgsList = document.querySelector(".images-for-zoom");

		if (imgsList) {
			return true;
		}
		return false;
	};

	if (isZoomImgsPage()) {
		toggleZoomPopup();
	}

	const replaceStickBg = () => {
		const bg = document.querySelector('.sticky-bg');

		if (bg) {
			const stickyOffset = document.querySelector('.sticky-offset').clientHeight;
	
			bg.style.top = stickyOffset + 'px';
		}
	}

	replaceStickBg();
	
	function resizeHandler() {
		replaceStickBg();
	}

	window.addEventListener('resize', resizeHandler);

	const delegateClick = () => {
		document.addEventListener('click', e => {
			const target = e.target;

			if (target.matches('.production-item__title') || target.matches('img')) {
				const link = target.parentNode.querySelector('a');
				link.click();
			}
		})
	}

	function isProductionPage() {
		const productionSection = document.querySelector('.production-item');

		if (productionSection) {
			return true;
		}

		return false;
	}

	if (isProductionPage()) {
		delegateClick();
	}

	function toggleVideo() {

		const heroVideo = document.querySelector('.home-hero__slide>video');

		$('.home-hero__slide').on('inview', function(event, isInView) {
			if (isInView) {
				heroVideo.play();
			} else {
				heroVideo.pause();
			}
		});

		
		
		$('.home-about__left').on('inview', function(event, isInView) {
			if (isInView) {
				aboutVideo.play();
			} else {
				aboutVideo.pause();
				aboutVideo.classList.remove('video--active');
			}
		})

		$('.home-video__anchor').on('inview', function(event, isInView) {
			const activeTab = document.querySelector('.home-video__tabs').querySelector('.active');
			const activeVideo = activeTab.querySelector('video');

			if (isInView) {
				if (!activeVideo.classList.contains('video--active')) {
					activeVideo.classList.add('video--active');
				}
				activeVideo.play();
			} else {
				activeVideo.pause();
			}
		})

		const aboutVideoSection = document.querySelector('.home-about__left');

		if (!aboutVideoSection) {
			return;
		}
		const aboutVideo = aboutVideoSection.querySelector('video');

		aboutVideo.addEventListener('play', function() {
			aboutVideo.classList.add('video--active');
		})

		aboutVideo.addEventListener('timeupdate', function() {
			if (aboutVideo.currentTime >= aboutVideo.duration - 1 && aboutVideo.classList.contains('video--active')) {
				aboutVideo.classList.remove('video--active');
			}

			if (aboutVideo.currentTime <= 1 && !aboutVideo.classList.contains('video--active')) {
				aboutVideo.classList.add('video--active');
			}
		})
	}

	toggleVideo();


	const switchClassImgPopup = () => {
		const aboutSection = document.querySelector('.about-hero');

		if (!aboutSection) {
			return;
		}

		const popup = document.querySelector('.img-popup');

		popup.classList.add('img-popup--transparent');

		
	}

	switchClassImgPopup();

	const createCookies = () => {
		var cookieName = "showBannerCookies";

		var createCookie = function (name, value, days) {
			var expires;
			if (days) {
				var date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				expires = "; expires=" + date.toGMTString();
			} else {
				expires = "";
			}
			document.cookie = name + "=" + value + expires + "; path=/";
		};

		function getCookie(c_name) {
			if (document.cookie.length > 0) {
				c_start = document.cookie.indexOf(c_name + "=");
				if (c_start != -1) {
					c_start = c_start + c_name.length + 1;
					c_end = document.cookie.indexOf(";", c_start);
					if (c_end == -1) {
						c_end = document.cookie.length;
					}
					return unescape(document.cookie.substring(c_start, c_end));
				}
			}
			return "";
		};

		var cookie = getCookie(cookieName);


		$("#cookieBanner").toggle(cookie == "", "slow");


		$("#acceptCookies").click(function () {
			//console.log("Creating cookie!");
			createCookie(cookieName, 1, 30);
			$("#cookieBanner").toggle("slow");
		});
	}

	createCookies();
});
