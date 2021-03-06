document.addEventListener("DOMContentLoaded", function () {
	const togglePopup = () => {
		const policyPopup = document.getElementById("policyPopup");
		const policyPopupBtn = document.querySelectorAll(".footer__policy");
		const policyDialog = document.querySelector(".footer-policy__content");

		const showPopup = () => {
			policyPopup.classList.add("active");
			document.body.classList.add("scroll-stoped");

			policyDialog.style.maxHeight = `${Math.floor(document.documentElement.clientHeight * 0.92)}px`;
		};

		const hidePopup = () => {
			policyPopup.classList.remove("active");
			document.body.classList.remove("scroll-stoped");
		};
		policyPopupBtn.forEach(btn => {
			btn.addEventListener("click", (event) => {
				event.preventDefault();
				showPopup();
			});
		})


		policyPopup.addEventListener("click", (event) => {
			const target = event.target;

			if (
				target.closest("button.footer-policy__close") ||
				target.matches(".footer-policy")
			) {
				hidePopup();
			}
		});

		document.addEventListener("keydown", (event) => {
			if (event.key === "Escape") {
				hidePopup();
			}
		});
	};

	togglePopup();
});
