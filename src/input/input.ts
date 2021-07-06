import * as Callback from "./inputCallback";

/**
 * Initialises the input, adding the event listener needed
 */
export function init() {
	Callback.init();
  document.addEventListener("keydown", keyPressed);
}

/**
 * Callback function for the event listener, and runs the functions needed
 * @param e Keyboard event that is called
 */
function keyPressed(e: KeyboardEvent) {
	if (e.ctrlKey) {
		Callback.runCommandCallback(e.key);
	} else {

	}
}