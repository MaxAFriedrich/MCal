const DAY_WRAPPER_CLASS_NAME = "day-wrapper";

const fs = require("fs");

var cal = [];
var notes = "";

function init() {
  //calGen();
  today = new Date();
  document.getElementById(START_TEXT_BOX_ID).value = getDateString(today);
  //document.getElementById("day-wrapper").innerHTML = '<div  class="event"><span contenteditable=true id=startTime placeholder=12:00PM spellcheck=false></span> <span contenteditable=true id=endTime placeholder=1:00PM spellcheck=false></span> <span onblur="pullDay()" contenteditable=true id=contents placeholder="Event Description"></span><button id="delete" onclick="delEvent(this.parentNode);">Delete</button></div>';
  getCal();
}
init();

function sortFunction(a, b) {
	if (a[1] === b[1]) {
		return 0;
	} else {
		return a[1] < b[1] ? -1 : 1;
	}
}

function getCal() {
  JSONcal = fs.readFileSync("MCal.json", "utf8");
  cal = JSON.parse(JSONcal);
  notes = fs.readFileSync("MCal.html", "utf8");
  document.getElementById("notes-wrapper").innerHTML = notes;
  date_display();
}

function putCal() {
  var JSONcal = JSON.stringify(cal);
  fs.writeFileSync("MCal.json", JSONcal, "utf-8");
}

function saveNotes() {
  notes = document.getElementById("notes-wrapper").innerHTML;
  fs.writeFileSync("MCal.html", notes, "utf-8");
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
	document.getElementById(DAY_WRAPPER_CLASS_NAME).innerHTML = html;
}

function checkDay() {
  //   if (document.getElementById("day-wrapper").lastChild.lastChild.innerText != "") {
  if (document.querySelectorAll("#contents")[document.querySelectorAll("#contents").length - 1].innerText != "") {
    document.getElementById(DAY_WRAPPER_CLASS_NAME).innerHTML += '<div  class="event"><span contenteditable=true id=startTime placeholder=12:00PM spellcheck=false></span> <span contenteditable=true id=endTime placeholder=1:00PM spellcheck=false></span> <span onblur="pullDay()" contenteditable=true id=contents placeholder="Event Description"></span><button id="delete" onclick="delEvent(this.parentNode);">Delete</button></div>';
  }
}

function pullDay() {
  document.getElementById(DAY_WRAPPER_CLASS_NAME).innerHTML=document.getElementById(DAY_WRAPPER_CLASS_NAME).innerHTML.replace(/<br>/g,"");
  let events = document.querySelectorAll(".event");
  if (events.length >= 2) {
    sortDay();
  }
  checkDay();
  var dateField = document.getElementById(START_TEXT_BOX_ID).value;
  intital = findDayIndex(dateField);
  if (intital == "false") {
    cal.push([
      dateField,
      btoa(document.getElementById(DAY_WRAPPER_CLASS_NAME).innerHTML)
    ]);
  } else {
    cal[intital][1] = btoa(document.getElementById(DAY_WRAPPER_CLASS_NAME).innerHTML);
  }
  putCal();
}

function dateDisplay() {
  document.getElementById(DAY_WRAPPER_CLASS_NAME).innerHTML = atob(findDay(document.getElementById(START_TEXT_BOX_ID).value));
}

function findDay(toFind) {
  for (var i = 0; i < cal.length; i++) {
    if (cal[i][0] == toFind) {
      return cal[i][1];
    }
  }
  return btoa('<div  class="event"><span contenteditable=true id=startTime placeholder=12:00PM spellcheck=false></span> <span contenteditable=true id=endTime placeholder=1:00PM spellcheck=false></span> <span onblur="pullDay()" contenteditable=true id=contents placeholder="Event Description"></span><button id="delete" onclick="delEvent(this.parentNode);">Delete</button></div>');
}

function findDayIndex(toFind) {
	for (var i = 0; i < cal.length; i++) {
		if (cal[i][0] == toFind) {
			return i;
		}
	}
	return "false";
}

function delEvent(node) {
  if (document.querySelectorAll("#contents").length >= 2) {
    node.remove();
    pullDay();
  }
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
