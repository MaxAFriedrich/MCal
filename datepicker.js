const DATE_PICKER_DIV_CLASS_NAME = "date_picker";
const DATE_PICKER_TEXT_BOX_CLASS_NAME = "date_picker_textbox";
const MONTH_DISPLAY_CLASS_NAME = "month_display";

const SELECTED_DATE_CLASS_NAME = "selected";
const CURRENT_DATE_CLASS_NAME = "today";
const OTHER_MONTH_DATES_CLASS_NAME = "other_month";
const DAYS_ROW_CLASS_NAME = "days_row"

const START_TEXT_BOX_ID = "start_dt"


function date_display() {
    document.getElementById(DAY_WRAPPER_CLASS_NAME).innerHTML = atob(
		find_day(document.getElementById(START_TEXT_BOX_ID).value)
	);
}


function find_day(toFind) {
	for (var i = 0; i < cal.length; i++) {
		if (cal[i][0] == toFind) {
			return cal[i][1];
		}
	}
	return btoa(
		'<div  class="event"><span contenteditable=true id=startTime placeholder=12:00PM spellcheck=false></span> <span contenteditable=true id=endTime placeholder=1:00PM spellcheck=false></span> <span onblur="pullDay()" contenteditable=true id=contents placeholder="Event Description"></span><button id="delete" onclick="delEvent(this.parentNode);">Delete</button></div>'
	);
}


function get_selected_date() {
	return document.getElementById(START_TEXT_BOX_ID).value;
}

function set_textbox_date(string_date) {
	document.getElementById(START_TEXT_BOX_ID).value = string_date;
}

// Converts a date into '12/6/1984' format
function get_date_string(date) {
    return date.getDate() + '/' + index_to_month(date.getMonth()) + '/' + date.getFullYear();
}

function index_to_month(index) {
    return index + 1;
}

function get_months() {
    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
}

function get_month_name(index) {
    return get_months()[index];
}

// Converts a date into 'July 2010' format
function get_month_year_string(date) {
    return get_month_name(date.getMonth()) + ' ' + date.getFullYear();
}

// Crossbrowser way to find the target (http://www.quirksmode.org/js/events_properties.html)
function get_target_of_event(e) {
    var targ;
    if (e.target) targ = e.target;
    else if (e.srcElement) targ = e.srcElement;

    if (targ.nodeType == 3) targ = targ.parentNode; // defeat Safari bug

    return targ;
}

// This is the function called when the user clicks any button
function choose_date(e) {
    function get_div_from(target) {
        return target.parentNode.parentNode.parentNode.parentNode.parentNode;
    }

    function value_is_month_or_year_button(value) {
        return value == '<' || value == '>' || value == "<<" || value == ">>";
    }

    if (!e) var e = window.event;

    var targ = get_target_of_event(e);
    var div = get_div_from(targ);

    if (value_is_month_or_year_button(targ.value)) {
        create_calendar(div, new Date(targ.getAttribute("date")));
    } else {
        var string_date = targ.getAttribute("date");
		set_textbox_date(string_date);

		create_calendar(div, parse_digit_date(string_date));
        date_display();
    }
}

// Parse a date in dd/mm/yyyy format
function parse_digit_date(date_string) {
    if (date_string == "") return new Date('NotADate'); // For Safari

    var a = date_string.split('/');
    if (a.length != 3) return new Date(date_string); // Missing 2 dashes

    return new Date(a[2], a[1] - 1, a[0], 0, 0, 0, 0);
}

function create_calendar_top_row(tbl, month) {
    function create_button(label, month_change) {
        b = document.createElement("input");
        b.type = "button"; // Have to immediately set the type due to IE
        b.value = label;
        b.onclick = choose_date;
        b.setAttribute("date", new Date(month.getFullYear(), month.getMonth() + month_change, 1, 0, 0, 0, 0).toString());

        return b;
    }

    function create_button_tuple(index, label, change) {
        return { index: index, label: label, change: change };
    }

    function add_month_text(td) {
        td.colSpan = 3;

        text = document.createElement("input");
        text.type = "text";
        text.value = get_month_year_string(month);
        text.size = 15;
        text.disabled = "disabled";
        text.className = MONTH_DISPLAY_CLASS_NAME;

        td.appendChild(text);
    }

    var top_row = tbl.insertRow(-1);
    var top_slots = Array(5).fill().map(() => top_row.insertCell(-1))

    const buttons = [ create_button_tuple(0, "<<", -12)
                    , create_button_tuple(1, "<", -1)
                    , create_button_tuple(3, ">", 1)
                    , create_button_tuple(4, ">>", 12)
                    ];

    buttons.forEach((bn) => {
        var td = top_slots[bn.index];
        td.appendChild(create_button(bn.label, bn.change));
    });

    add_month_text(top_slots[2]);
}


function create_calendar_days_row(tbl) {
    var days_row = tbl.insertRow(-1);

    ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].forEach((day) => days_row.insertCell(-1).innerHTML = day)
    days_row.className = DAYS_ROW_CLASS_NAME;
}

// This creates the calendar for a given month
function create_calendar(div, month) {
	function get_start_date() {
		var date = new Date(month.getFullYear(), month.getMonth(), 1, 0, 0, 0, 0); // Starting at the 1st of the month

		var extras = (date.getDay() + 6) % 7; // How many days of the last month do we need to include?
		date.setDate(date.getDate() - extras); // Skip back to the previous monday

		return date;
	}

	function create_day_button(date, today, selected) {
		function add_class_names_to_day(day, date, today, selected) {
			function add_class_name(inp, name) {
				if (inp.className) inp.className += " ";
				inp.className += name;
			}

			if (date.getMonth() != month.getMonth()) {
				add_class_name(day, OTHER_MONTH_DATES_CLASS_NAME);
			}

			if (!isNaN(selected) && date.toDateString() === selected.toDateString()) {
				add_class_name(day, SELECTED_DATE_CLASS_NAME);
			}

			if (date.toDateString() === today.toDateString()) {
				add_class_name(day, CURRENT_DATE_CLASS_NAME);
			}
		}

		var inp = document.createElement("input");
		inp.type = "button";
		inp.value = date.getDate();
		inp.onclick = choose_date;
		inp.setAttribute("date", get_date_string(date));

		add_class_names_to_day(inp, date, today, selected);

		return inp;
	}

	var tbl = document.createElement("table");

	create_calendar_top_row(tbl, month);
	create_calendar_days_row(tbl);

	// Make the calendar
	var selected = parse_digit_date(get_selected_date()); // Try parsing the date
	var today = new Date();
	var date = get_start_date();

	do {
		// Loop for each week
		var tr = tbl.insertRow(-1);
		for (i = 0; i < 7; i++) {
			// Loop each day of this week
			var td = tr.insertCell(-1);

			var day = create_day_button(date, today, selected);
			td.appendChild(day);

			date.setDate(date.getDate() + 1); // Increment a day
		}
	} while (date.getMonth() == month.getMonth());

	// At the end, we do a quick insert of the newly made table, hopefully to remove any chance of screen flicker
	if (div.hasChildNodes()) {
		// For flicking between months
		div.replaceChild(tbl, div.childNodes[0]);
	} else {
		// For creating the calendar when they first click the icon
		div.appendChild(tbl);
	}
}

// This is called at the start to create the calendar
function show_date_picker(idOfTextbox) {
    var textbox = document.getElementById(idOfTextbox);

    // Grab the date, or use the current date if not valid
    var date = parse_digit_date(textbox.value);
    if (isNaN(date)) date = new Date();

    // Create the box
    var div = document.createElement("div");
    div.className = DATE_PICKER_DIV_CLASS_NAME;
    div.setAttribute(DATE_PICKER_TEXT_BOX_CLASS_NAME, idOfTextbox); // Remember the textbox id in the div

    create_calendar(div, date); // Create the calendar
    insert_after(div, textbox); // Add the box to screen just after the textbox
}

// Adds an item after an existing one
function insert_after(newItem, existingItem) {
    if (existingItem.nextSibling) { // Find the next sibling, and add newItem before it
        existingItem.parentNode.insertBefore(newItem, existingItem.nextSibling);
    } else { // In case the existingItem has no sibling after itself, append it
        existingItem.parentNode.appendChild(newItem);
    }
}

function update_date_pickers(month) {
	var pickers = document.getElementsByClassName(DATE_PICKER_DIV_CLASS_NAME);

	console.log("Updating " + pickers.length + " date pickers");

	for (i = 0; i < pickers.length; i++) {
		create_calendar(pickers[i], month);
	}
    date_display();
}

function change_day(change) {
	var display_date = get_selected_date();
	var date = parse_digit_date(display_date);
	date.setDate(date.getDate() + change); // Increment a day
	set_textbox_date(get_date_string(date));

	update_date_pickers(date);
}

function next_day() {
	change_day(1);
}
function previous_day() {
    change_day(-1);
}

/**
 * Determines if the document has finished loading and has been parsed.
 * @param {Function|undefined} opt_callback
 *     Optional.  If given as a function it will be called once the DOM is
 *     ready.  The first parameter passed to it will be the event object in the
 *     case that the callback is delayed, otherwise it will be null.  The "this"
 *     keyword will refer to the document.
 * @param {HTMLDocument|undefined} opt_document
 *     Optional.  Defaults to the current document.  If given as a document this
 *     will be the document tested against.
 * @returns {boolean}
 *     Value indicating if the document is finished loading and has been parsed.
 * @license Copyright 2020 - Chris West - MIT Licensed
 */
function domReady(opt_callback, opt_document) {
  var doc = opt_document || document;
  var isReady = /^(loaded|complete|interactive)$/.test(doc.readyState);
  if (opt_callback) {
    if (isReady) {
      opt_callback.call(doc);
    }
    else {
      // https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event#Browser_compatibility
      doc.addEventListener('DOMContentLoaded', function() {
        opt_callback.apply(doc, arguments);
      }, false);
    }
  }
  return isReady;
}

// This is called when the page loads, it searches for inputs where the class is 'datepicker'
domReady(function () {
    show_date_picker(START_TEXT_BOX_ID);
});
