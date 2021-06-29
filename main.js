const DAY_WRAPPER_CLASS_NAME = "day-wrapper";

var cal = [];

function init() {
	//calGen();
	today = new Date();
	document.getElementById(START_TEXT_BOX_ID).value = get_date_string(today);
	//document.getElementById("day-wrapper").innerHTML = '<div class=event><span contenteditable=true id=startTime placeholder=12:00PM spellcheck=false></span> <span contenteditable=true id=endTime placeholder=1:00PM spellcheck=false></span> <span onblur="pullDay()" contenteditable=true id=contents placeholder="Event Description"></span><button id="delete" onclick="return this.parentNode.remove();pullDay();">Delete</button></div>';
	getCal();
	setInterval(function () {
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "SERVER.SCRIPT");
		csv = "";
		for (var i = 0; i < cal.length; i++) {
			csv += cal[i][0] + "," + cal[i][1] + ":";
		}
		xhr.send(csv);
	}, 10000);
}
init();

function sortFunction(a, b) {
	if (a[1] === b[1]) {
		return 0;
	} else {
		return a[1] < b[1] ? -1 : 1;
	}
}
async function getCal() {
	var result = null;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", "/MCal.dat", false);
	xmlhttp.send();
	if (xmlhttp.status == 200) {
		result = xmlhttp.responseText;
	}
	//   console.log(result);
	result = result.split(":");
	for (var i = 0; i < result.length; i++) {
		result[i] = result[i].split(",");
	}
	//   console.log(result);
	cal = result;
	date_display();
}

function sortDay() {
	var events = [];
	document.querySelectorAll(".event").forEach((elm) => {
		try {
			eventA = elm.firstElementChild.innerText.split(":");
			intA = parseInt(eventA[0]);
			if (eventA[1].includes("PM") || (eventA[1].includes("pm") && eventA[0] != "12")) {
				intA += 12;
			}
			intA += parseInt(eventA[1]) / 60;
		} catch {
			intA = 999;
		}

		events.push([elm, intA]);
	});
	events.sort(sortFunction);
	html = "";
	events.forEach((elm) => {
		html += '<div class="event">' + elm[0].innerHTML + "</div>";
	});
	document.getElementById("day-wrapper").innerHTML = html;
}

function checkDay() {
	//   if (document.getElementById("day-wrapper").lastChild.lastChild.innerText != "") {
	if (
		document.querySelectorAll("#contents")[document.querySelectorAll("#contents").length - 1]
			.innerText != ""
	) {
		document.getElementById("day-wrapper").innerHTML +=
			'<div class=event><span contenteditable=true id=startTime placeholder=12:00PM spellcheck=false></span> <span contenteditable=true id=endTime placeholder=1:00PM spellcheck=false></span> <span onblur="pullDay()" contenteditable=true id=contents placeholder="Event Description"></span><button id="delete" onclick="return this.parentNode.remove();pullDay();">Delete</button></div>';
	}
}

function pullDay() {
	let events = document.querySelectorAll(".event");
	if (events.length >= 2) {
		sortDay();
	}
	checkDay();
	var dateField = document.getElementById(START_TEXT_BOX_ID).value;
	intital = findDayIndex(dateField);
	if (intital == "false") {
		cal.push([dateField, btoa(document.getElementById("day-wrapper").innerHTML)]);
	} else {
		cal[intital][1] = btoa(document.getElementById("day-wrapper").innerHTML);
	}
}

function findDay(toFind) {
	for (var i = 0; i < cal.length; i++) {
		if (cal[i][0] == toFind) {
			return cal[i][1];
		}
	}
	return btoa(
		'<div class=event><span contenteditable=true id=startTime placeholder=12:00PM spellcheck=false></span> <span contenteditable=true id=endTime placeholder=1:00PM spellcheck=false></span> <span onblur="pullDay()" contenteditable=true id=contents placeholder="Event Description"></span><button id="delete" onclick="return this.parentNode.remove();pullDay();">Delete</button></div>'
	);
}

function findDayIndex(toFind) {
	for (var i = 0; i < cal.length; i++) {
		if (cal[i][0] == toFind) {
			return i;
		}
	}
	return "false";
}

function calGen() {
	startDate = new Date("01/01/2000");
	for (var i = 0; i < 36500; i++) {
		formatted_date =
			startDate.getDate() + "/" + (startDate.getMonth() + 1) + "/" + startDate.getFullYear();
		cal.push([formatted_date, ""]);
		startDate.setDate(startDate.getDate() + 1);
	}
}

// Keyboard shortcuts
var eventSelect = 0;
document.addEventListener("keydown", key_pressed);

function key_pressed(e) {
	if (e.ctrlKey) {
		switch (e.key) {
			case "ArrowRight":
				next_day();
				break;
			case "ArrowLeft":
				previous_day();
				break;
			case "ArrowUp":
				console.log("Up item");
				break;
			case "ArrowDown":
				console.log("Down item");
				break;
			default:
		}
	}
}
