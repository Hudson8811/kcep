document.addEventListener("DOMContentLoaded", function () {
	const toggleVideoPopup = () => {
		const videoPlayer = document.querySelector(".about-popup__player");
		const playBtn = document.querySelector(".about-hero__button");
		const popup = document.querySelector(".about-popup");

		const appendVideo = () => {
			if (popup.classList.contains("video-appended")) {
				return;
			}

			const URL = videoPlayer.dataset.link;
			const video = `<iframe src="${URL}?enablejsapi=1&version=3&playerapiid=ytplayer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

			videoPlayer.innerHTML = video;
			popup.classList.add("video-appended");
		};

		playBtn.addEventListener("click", (e) => {
			e.preventDefault();
			popup.classList.add("active");
			appendVideo();
		});

		popup.addEventListener("click", (event) => {
			const target = event.target;

			if (
				target.closest(".about-popup__close") ||
				target.matches(".about-popup")
			) {
				popup.classList.remove("active");
				videoPlayer
					.querySelector("iframe")
					.contentWindow.postMessage(
						'{"event":"command","func":"' + "pauseVideo" + '","args":""}',
						"*"
					);
			}
		});

		document.addEventListener("keydown", (event) => {
			if (event.key === "Escape" && popup.classList.contains("active")) {
				popup.classList.remove("active");
			}
		});
	};

	function isVideoPlayerPage() {
		const videoPlayer = document.querySelector(".about-popup__player");

		if (videoPlayer) {
			return true;
		}

		return false;
	}

	if (isVideoPlayerPage()) {
		toggleVideoPopup();
	}
});
