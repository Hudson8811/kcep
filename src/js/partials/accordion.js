document.addEventListener("DOMContentLoaded", function () {
	const toggleCurrentItem = (item) => {
		const parrent = item.closest('.accordion-item');
		const accordionText = parrent.querySelector("ul");

		parrent.classList.toggle("accordion-item--active");

		if (accordionText) {
			parrent.style.maxHeight = parrent.classList.contains("accordion-item--active")
				? accordionText.scrollHeight + 140 + "px"
				: null;

		}

	};

	const toggleAccordion = () => {
		const accordion = document.querySelectorAll(".accordion");

		accordion.forEach((item) => {
			item.addEventListener("click", (event) => {
				let target = event.target;

				target = target.closest(".accordion-item-controller");

				if (target) {
					toggleCurrentItem(target);
				}
			});
		});
	};

	toggleAccordion();
});
