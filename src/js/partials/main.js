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
		const tabsWrapper = document.querySelector(
			".home-video__tabs-control-inner"
		);
		const tabs = tabsWrapper.querySelectorAll("span");
		const tabsItems = document.querySelectorAll(".home-video__tabs-item");

		let count = 0;

		const autoplay = () => {
			tabs.forEach((tab) => tab.classList.remove("tab--active"));
			tabsItems.forEach((tabsItem) => tabsItem.classList.remove("active"));

			if (count === 0) {
				tabs[count].classList.add("tab--active");
				tabsItems[count].classList.add("active");
				count++;
			} else {
				count++;

				tabsItems[count - 1].classList.add("active");
				tabs[count - 1].classList.add("tab--active");
			}

			if (count === tabsItems.length) {
				count = 0;
			}
		};
		autoplay();

		setInterval(autoplay, 9000);

		tabsWrapper.addEventListener("click", (event) => {
			let target = event.target;

			target = target.closest("span");

			if (target) {
				tabs.forEach((tab, idx) => {
					tab.classList.remove("tab--active");
					tabsItems[idx].classList.remove("active");
					if (tab === target) {
						tabsItems[idx].classList.add("active");
					}
				});
				target.classList.add("tab--active");
			}
		});
	};

	const switchSlides = () => {
		const slides = document.querySelectorAll(".slide");
		const dotsList = document.querySelector(".dots");
		const dotsWrapper = document.querySelector(".dots-wrapper");

		let currentSlide = 0;
		let interval;

		const addDots = () => {
			slides.forEach(() => {
				const dot = document.createElement("li");
				dot.classList.add("dots-item");
				dotsList.append(dot);
			});
			dotsList.querySelector("li").classList.add("dot--active");
		};

		addDots();

		const prevSlide = (elem, index, strClass) => {
			elem[index].classList.remove(strClass);
		};

		const nextSlide = (elem, index, strClass) => {
			elem[index].classList.add(strClass);
		};

		const dots = document.querySelectorAll(".dots-item");

		const autoPlaySlide = () => {
			prevSlide(slides, currentSlide, "active");
			prevSlide(dots, currentSlide, "dot--active");
			currentSlide++;

			if (currentSlide === slides.length) {
				currentSlide = 0;
			}

			nextSlide(slides, currentSlide, "active");
			nextSlide(dots, currentSlide, "dot--active");
		};

		const startSlide = (time = 3000) => {
			interval = setInterval(autoPlaySlide, time);
		};

		const stopSlide = () => {
			clearInterval(interval);
		};

		dotsList.addEventListener("click", (e) => {
			let target = e.target;

			target = target.closest(".dots-item");

			if (target) {
				dots.forEach((dot, idx) => {
					dot.classList.remove("dot--active");
					slides[idx].classList.remove("active");

					if (dot === target) {
						slides[idx].classList.add("active");
						dot.classList.add("dot--active");
					}
				});
			}
		});

		dotsWrapper.addEventListener("mouseover", (event) => {
			const target = event.target;
			if (target.matches(".dots") || target.matches(".dots-item")) {
				stopSlide();
			}
		});

		dotsWrapper.addEventListener("mouseout", (event) => {
			const target = event.target;
			if (target.matches(".dots") || target.matches(".dots-item")) {
				startSlide();
			}
		});

		slides[0].classList.add("active");

		startSlide(3000);
	};

	function isSliderPage() {
		const slider = document.querySelector(".slider");
		if (slider) {
			return true;
		}

		return false;
	}
	function isTabsPage() {
		const tabsWrapper = document.querySelector(
			".home-video__tabs-control-inner"
		);
		if (tabsWrapper) {
			return true;
		}

		return false;
	}
	if (isTabsPage()) {
		toggleTabs();
	}

	if (isSliderPage()) {
		switchSlides();
	}

	const toggleInfoPopups = () => {
		const popupsBtns = document.querySelectorAll(
			".product-info__tabs-item-point-wrapper"
		);
		const tabs = document.querySelectorAll(".product-info__tabs-item");
		const slides = document.querySelectorAll(".product-hero__slide");
		const tabsControlItems = document.querySelectorAll(
			".product-info__tabs-control-item"
		);

		tabsControlItems[0].classList.add("active");
		popupsBtns[0].classList.add("active");
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

			if (target.closest(".product-info__tabs-item-point")) {
				toggleActiveClass(
					target.closest(".product-info__tabs-item-point-wrapper")
				);
			}
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
});
