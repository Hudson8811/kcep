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
		const slides = document.querySelectorAll(".home-hero__slide");
		const dotsList = document.querySelector(".home-hero__dots");
		const dotsWrapper = document.querySelector(".home-hero__dots-wrapper");

		let currentSlide = 0;
		let interval;

		const addDots = () => {
			slides.forEach(() => {
				const dot = document.createElement("li");
				dot.classList.add("home-hero__dots-item");
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

		const dots = document.querySelectorAll(".home-hero__dots-item");

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

			target = target.closest(".home-hero__dots-item");

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
			if (
				target.matches(".home-hero__dots") ||
				target.matches(".home-hero__dots-item")
			) {
				stopSlide();
			}
		});

		dotsWrapper.addEventListener("mouseout", (event) => {
			const target = event.target;
			if (
				target.matches(".home-hero__dots") ||
				target.matches(".home-hero__dots-item")
			) {
				startSlide();
			}
		});

		slides[0].classList.add("active");

		startSlide(3000);
	};

	function isSliderPage() {
		const slider = document.querySelector(".home-hero__slider");
		if (slider) {
			return true;
		}

		return false;
	}

	if (isSliderPage()) {
		toggleTabs();
		switchSlides();
	}
});
