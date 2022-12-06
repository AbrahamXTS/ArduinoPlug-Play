import RB from "robotjs";
import LD from "loudness";
import JF from "johnny-five";

const { keyTap } = RB; // Librería que servirá para manejar el teclado físico.
const { setVolume } = LD; // Librería que servirá para manejar el volumen del dispositivo.
const { Board, Button, Sensor } = JF; // Librería que servirá para configurar las señales recibidas del Arduino.

const arduino = new Board();

arduino.on("ready", () => {

	// Configuramos los pines correspondientes a los botones.
	const prevButton = new Button(8);
	const pauseButton = new Button(9);
	const nextButton = new Button(10);

	// Configuramos el pin A5 para el potenciometro.
	const potentiometer = new Sensor("A5");

	// Seteamos la acción que realizarán los botones fisicos al hacer click sobre ellos.
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

	// Función que cambiará el volumen al nivel recibido por parametro.
	const changeVolume = (volumeLevel) => {
		if (volumeLevel - prevLevel !== 0) {
			setVolume(volumeLevel);
			console.log("El nivel de volumen actual es de ", volumeLevel);
		}

		// Variable auxiliar para verificar el cambio efectivo de nivel de volumen.
		prevLevel = volumeLevel;
	};

	// Seteamos que en el evento de cambio del potenciometro realizará la función dada.
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