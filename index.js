import RB from "robotjs";
import LD from "loudness";
import JF from "johnny-five";

const { keyTap } = RB;
const { setMuted, setVolume } = LD;
const { Board, Button, Sensor } = JF;

const arduino = new Board();

arduino.on("ready", () => {

	const prevButton = new Button(8);
	const pauseButton = new Button(9);
	const nextButton = new Button(10);

	prevButton.on("down", () => {
		keyTap("audio_prev");
	});

	pauseButton.on("down", () => {
		keyTap("audio_pause");
	});

	nextButton.on("down", () => {
		keyTap("audio_next");
	});

	let level;
	let prevLevel = 0;

	const potentiometer = new Sensor("A5");

	potentiometer.on("change", () => {

		const { value } = potentiometer;
		console.log({value});

		if (value === 0) {

			level = 0;

			if (level - prevLevel !== 0) {
				setVolume(0);
				console.log(0);
			}

			prevLevel = level;
		}

		if (value >= 1 && value <= 255) {

			level = 25;
			
			if (level - prevLevel !== 0) {
				setVolume(25);
				console.log(25);
			}

			prevLevel = level;
		}

		if (value >= 256 && value <= 511) {

			level = 50;
			
			if (level - prevLevel !== 0) {
				setVolume(50);
				console.log(50);
			}

			prevLevel = level;
		}

		if (value >= 512 && value <= 767) {

			level = 75;
			
			if (level - prevLevel !== 0) {
				setVolume(75);
				console.log(75);
			}
			
			prevLevel = level;
		}

		if (value >= 768 && value <= 1023) {

			level = 100;
			
			if (level - prevLevel !== 0) {
				setVolume(100);
				console.log(100);
			}
			
			prevLevel = level;
		}
	});
});