document.addEventListener("DOMContentLoaded", function () {
	const toggleCurrentItem = (item) => {
		const accordionText = item.querySelector("ul");

		item.classList.toggle("accordion-item--active");

		item.style.maxHeight = item.classList.contains("accordion-item--active")
			? accordionText.scrollHeight + 140 + "px"
			: null;
	};

	const toggleAccordion = () => {
		const accordion = document.querySelectorAll(".accordion");

		accordion.forEach((item) => {
			item.addEventListener("click", (event) => {
				let target = event.target;

				target = target.closest(".accordion-item");

				if (target) {
					toggleCurrentItem(target);
				}
			});
		});
	};

	toggleAccordion();
});
