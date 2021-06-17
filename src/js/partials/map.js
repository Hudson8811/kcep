document.addEventListener("DOMContentLoaded", function () {
	const mapInitial = () => {
		const mapInit = () => {
			const myMap = new ymaps.Map("map", {
				center: [49.792456, 72.823896],
				zoom: 16,
				controls: [],
			});

			const myPlacemark = new ymaps.Placemark(
				myMap.getCenter(),
				{},
				{
					iconLayout: "default#image",
					iconImageHref: "./img/placemark.svg",
					iconImageSize: [39, 54],
					iconImageOffset: [-19, -56],
				}
			);

			myMap.geoObjects.add(myPlacemark);

			myMap.behaviors.disable("scrollZoom");

			if (
				/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
					navigator.userAgent
				)
			) {
				myMap.behaviors.disable("drag");
			}
		};

		const loadScript = (url, callback) => {
			const script = document.createElement("script");

			script.src = url;
			document.head.append(script);

			script.onload = () => {
				callback();
			};
		};

		const API_KEY = "5c3915e7-87f9-4735-baab-356540a1a337";
		const URL = `https://api-maps.yandex.ru/2.1/?apikey=${API_KEY}&lang=ru_RU`;

		loadScript(URL, () => {
			ymaps.load(mapInit);
		});
	};

	if (document.getElementById("map")) {
		mapInitial();
	}
});
