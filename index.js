import RB from "robotjs";
import JF from "johnny-five";
import { volume } from "node-audio-windows";

const { keyTap } = RB;
const { Board, Button, Sensor } = JF;
const { getVolume, setVolume, isMuted, setMute } = volume;

const arduino = new Board();

arduino.on("ready", () => {

	const prevButton = new Button(8);
	const pauseButton = new Button(9);
	const nextButton = new Button(10);

	const potentiometer = new Sensor("A5");

	potentiometer.on("change", () => {

		const { value } = potentiometer;

		if (value === 0) {
			console.log(0);
			setMute(true);
		} 

		if (value >= 1 && value <= 255) {
			console.log(25);
			setVolume(0.25);
		} 

		if (value >= 256 && value <= 511) {
			console.log(50);
			setVolume(0.50);
		} 

		if (value >= 512 && value <= 767) {
			console.log(75);
			setVolume(0.75);
		} 

		if (value >= 768 && value <= 1023) {
			console.log(100);
			setVolume(1);
		}
	});

	// volDownButton.on("press", () => {
	// 	keyTap("audio_vol_down");
	// });

	// volDownButton.on("hold", () => {
	// 	keyTap("audio_vol_down");
	// });

	// volUpButton.on("press", () => {
	// 	keyTap("audio_vol_up");
	// });

	// volUpButton.on("hold", () => {
	// 	keyTap("audio_vol_up");
	// });

	prevButton.on("down", () => {
		keyTap("audio_prev");
	});

	pauseButton.on("down", () => {
		keyTap("audio_pause");
	});

	nextButton.on("down", () => {
		keyTap("audio_next");
	});
});