import RB from "robotjs";
import LD from "loudness";
import JF from "johnny-five";

const { keyTap } = RB;
const { setVolume } = LD;
const { Board, Button, Sensor } = JF;

const arduino = new Board();

arduino.on("ready", () => {

	const prevButton = new Button(8);
	const pauseButton = new Button(9);
	const nextButton = new Button(10);

	const potentiometer = new Sensor("A5");

	prevButton.on("down", () => {
		keyTap("1");
	});

	pauseButton.on("down", () => {
		keyTap("audio_pause");
	});

	nextButton.on("down", () => {
		keyTap("2");
	});

	let level;
	let prevLevel = 0;

	const changeVolume = (volumeLevel) => {
		if (volumeLevel - prevLevel !== 0) {
			console.log("El nivel de volumen actual es de ", volumeLevel);
			setVolume(volumeLevel);
		}

		prevLevel = volumeLevel;
	};

	potentiometer.on("change", () => {

		const { value } = potentiometer;

		if (value >= 0 && value <= 5) {

			level = 0;
			changeVolume(level);
		}

		if (value >= 6 && value <= 255) {

			level = 25;
			changeVolume(level);
		}

		if (value >= 256 && value <= 511) {

			level = 50;
			changeVolume(level);
		}

		if (value >= 512 && value <= 767) {

			level = 75;
			changeVolume(level);
		}

		if (value >= 768 && value <= 1023) {

			level = 100;
			changeVolume(level);
		}
	});
});