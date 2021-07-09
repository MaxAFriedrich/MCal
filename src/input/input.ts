var keyDownCallbacks: { commandKeys: CommandKey[], key: string, function: () => void }[];
var keyUpCallbacks: { commandKeys: CommandKey[], key: string, function: () => void }[];

export enum CommandKey {
	ctrl,
	alt,
	shift
}
export enum PressType {
	down,
	up
}

/**
 * Initialises the callbacks variable
 */

export function init() {
	keyDownCallbacks = [];
	keyUpCallbacks = [];
  document.addEventListener("keydown", keyPressedDown);
  document.addEventListener("keyup", keyPressedUp);
}

/**
 * Adds a key and callback function to list, so when key is pressed, will call the given function
 * @param commandKeys command keys that need to be pressed in conjunction
 * @param key to call the function when pressed
 * @param callbackFunc to be called when the key is pressed
 */
export function addCommandKey(commandKeys: CommandKey[], key: string, callbackFunc: () => void, type: PressType = PressType.down): void {
	const callback = keyDownCallbacks.find(element => element.key == key);
	if (callback == null) {
		if (type == PressType.down) {
			keyDownCallbacks.push({ commandKeys: commandKeys, key: key, function: callbackFunc });
		} else {
			keyUpCallbacks.push({ commandKeys: commandKeys, key: key, function: callbackFunc });
		}
	} else {
		console.log("Duplicate command key, which this cannot handle!");
	}
}

//* Private
/**
 * Checks if all the command keys have been pressed in a keyboard event
 * @param e keyboard event to check
 * @param commandKeys
 * @returns boolean saying if all the command keys are pressed or not
 */
export function areCommandKeysPressed(e: KeyboardEvent, commandKeys: CommandKey[]): boolean {
	for (const key of commandKeys) {
		switch (key) {
			case CommandKey.ctrl: {
				if (!e.ctrlKey) {
					return false;
				}
				break;
			}
			case CommandKey.alt: {
				if (!e.altKey) {
					return false;
				}
				break;
			}
			case CommandKey.shift: {
				if (!e.shiftKey) {
					return false;
				}
				break;
			}
			default: {
				console.log("Unknown command key");
				return false;
			}
		}
	}

	return true;
}

//* Private
/**
 * Runs callback linked to keyboard event from given list
 * @param e keyboard event
 * @param callbacks list of the callback objects to be searched through
 */
function runCommandFromKey(e: KeyboardEvent, callbacks: { commandKeys: CommandKey[], key: string, function: () => void }[]): void {
	const callback = callbacks.find(element => element.key == e.key);
	if (callback != null && areCommandKeysPressed(e, callback.commandKeys)) {
		callback.function();
	}
}

/**
 * Callback function for the event listener, and runs the functions needed
 * @param e Keyboard event that is called
 */
function keyPressedDown(e: KeyboardEvent): void {
	runCommandFromKey(e, keyDownCallbacks);
}

/**
 * Callback function for the event listener, and runs the functions needed
 * @param e Keyboard event that is called
 */
function keyPressedUp(e: KeyboardEvent): void {
	runCommandFromKey(e, keyUpCallbacks);
}