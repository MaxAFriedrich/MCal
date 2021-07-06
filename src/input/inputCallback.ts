var callbacks: { key: string, function: () => void }[];

/**
 * Initialises the callbacks variable
 */

export function init() {
	callbacks = [];
}

// TODO: Change key to enum?
/**
 * Adds a key and callback function to list, so when key is pressed, will call the given function
 * @param key to call the function when pressed
 * @param callbackFunc to be called when the key is pressed
 */
export function addCommandKey(key: string, callbackFunc: () => void): void {
	const callback = callbacks.find(element => element.key == key);
	if (callback == null) {
		callbacks.push({ key: key, function: callbackFunc });
	} else {
		console.log("Duplicate command key, which this cannot handle!");
	}
}

/**
 * Runs the function connected to given key press
 * @param key that has been pressed
 * @returns boolean stating whether there was a function that has been called
 */
export function runCommandCallback(key: string): boolean {
	const callback = callbacks.find(element => element.key == key);
	if (callback == null) {
		return false;
	} else {
		callback.function();
	}
}