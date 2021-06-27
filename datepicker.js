
function date_display() {
  document.getElementById("day-wrapper").innerHTML = atob(findDay(document.getElementById("start_dt").value));
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

// Returns the textbox from a div
function get_textbox(div) {
    var id_of_textbox = div.getAttribute('datepickertextbox'); // Get the textbox id which was saved in the div
    var textbox = document.getElementById(id_of_textbox); // Find the textbox now

    return textbox;
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
        // create_calendar(div, );
        var textbox = get_textbox(div);
        textbox.value = targ.getAttribute("date"); // Set the selected date
        create_calendar(div, parse_digit_date(textbox.value));
        date_display();
        //div.parentNode.removeChild(div); // Remove the dropdown box now
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
        text.className = "monthDsp"

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
    days_row.className = "daysRow";
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
                if (inp.className) inp.className += ' ';
                inp.className += name;
            }

            if (date.getMonth() != month.getMonth()) {
                add_class_name(day, "othermonth");
            }

            if (date.toDateString() === today.toDateString()) {
                add_class_name(day, "today");
            }

            if (!isNaN(selected) && date.toDateString() === selected.toDateString()) {
                add_class_name(day, "selected");
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

    var textbox = get_textbox(div); // Find the textbox now
    var tbl = document.createElement('table');

    create_calendar_top_row(tbl, month);
    create_calendar_days_row(tbl);

    // Make the calendar
    var selected = parse_digit_date(textbox.value); // Try parsing the date
    var today = new Date();
    var date = get_start_date();

    do { // Loop for each week
        var tr = tbl.insertRow(-1);
        for (i = 0; i < 7; i++) { // Loop each day of this week
            var td = tr.insertCell(-1);

            var day = create_day_button(date, today, selected);
            td.appendChild(day);

            date.setDate(date.getDate() + 1); // Increment a day
        }
    } while (date.getMonth() == month.getMonth())

    // At the end, we do a quick insert of the newly made table, hopefully to remove any chance of screen flicker
    if (div.hasChildNodes()) { // For flicking between months
        div.replaceChild(tbl, div.childNodes[0]);
    } else { // For creating the calendar when they first click the icon
        div.appendChild(tbl);
    }
}

// This is called when they click the icon next to the date input box
function showDatePicker(idOfTextbox) {
    var textbox = document.getElementById(idOfTextbox);

    // See if the date picker is already there, if so, remove it
    divs = textbox.parentNode.getElementsByTagName('div');
    for (i = 0; i < divs.length; i++) {
        if (divs[i].getAttribute('class') == 'datepickerdropdown') {
            textbox.parentNode.removeChild(divs[i]);
            return false;
        }
    }

    // Grab the date, or use the current date if not valid
    var date = parse_digit_date(textbox.value);
    if (isNaN(date)) date = new Date();

    // Create the box
    var div = document.createElement('div');
    div.className = 'datepickerdropdown';
    div.setAttribute('datepickertextbox', idOfTextbox); // Remember the textbox id in the div

    create_calendar(div, date); // Create the calendar
    insertAfter(div, textbox); // Add the box to screen just after the textbox

    return false;
}

// Adds an item after an existing one
function insertAfter(newItem, existingItem) {
    if (existingItem.nextSibling) { // Find the next sibling, and add newItem before it
        existingItem.parentNode.insertBefore(newItem, existingItem.nextSibling);
    } else { // In case the existingItem has no sibling after itself, append it
        existingItem.parentNode.appendChild(newItem);
    }
}
/*
 * onDOMReady
 * Copyright (c) 2009 Ryan Morr (ryanmorr.com)
 * Licensed under the MIT license.
 */
function onDOMReady(fn, ctx) {
    var ready, timer;
    var onStateChange = (e) => {
        if (e && e.type == "DOMContentLoaded") {
            fireDOMReady()
        } else if (e && e.type == "load") {
            fireDOMReady()
        } else if (document.readyState) {
            if ((/loaded|complete/).test(document.readyState)) {
                fireDOMReady();
            } else if (!!document.documentElement.doScroll) {
                try {
                    ready || document.documentElement.doScroll('left')
                } catch (e) {
                    return
                }
                fireDOMReady();
            }
        }
    };
    var fireDOMReady = () => {
        if (!ready) {
            ready = true;
            fn.call(ctx || window);
            if (document.removeEventListener) document.removeEventListener("DOMContentLoaded", onStateChange, false);
            document.onreadystatechange = null;
            window.onload = null;
            clearInterval(timer);
            timer = null;
        }
    };
    if (document.addEventListener) document.addEventListener("DOMContentLoaded", onStateChange, false);
    document.onreadystatechange = onStateChange;
    timer = setInterval(onStateChange, 5);
    window.onload = onStateChange;
}
//
//// This is called when the page loads, it searches for inputs where the class is 'datepicker'
onDOMReady(function () {
    showDatePicker("start_dt");
    //  // Search for elements by class
    //  var allElements = document.getElementsByTagName("*");
    //  for (i = 0; i < allElements.length; i++) {
    //    var className = allElements[i].className;
    //    if (className == 'datepicker' || className.indexOf('datepicker ') != -1 || className.indexOf(' datepicker') != -1) {
    //      // Found one! Now lets add a datepicker next to it
    //      var a = document.createElement('a');
    //      a.href = '#';
    //      a.className = "datepickershow";
    //      a.setAttribute('onclick', 'return showDatePicker("' + allElements[i].id + '")');
    //      var img = document.createElement('img');
    //      img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABGdBTUEAAK/INwWK6QAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAdtJREFUOE+Vj+9PUnEUxvPvar3xja96Q1hGEKG0ubZqbfHCNqIVA4eYLAwFp0LYD4iIJEdeRGGZwDAEcUOn9oNIvPcGgjBQfHE69/YFihe1zs59du7d83nOuR0AcOq/CgEqWbaHDqaD+clF1rLAmija6MsZ5vb0s9nB1xm168s9x67y6Y7q2TaXjo8tVKjUTv7Zt61pAkwt/UA3zFwFuxysV2BKAuYeMAnBcBaGukDdCaozaLg5sUGAiQDLA3IIDIBfAfO34N118PaDRwYvRfBcCMrTaLg2liTAOEW3NjzpBZsMpqUwKQaLCMYvwGMhjArQIDfGCTDqy3EAX47lfVTnCo3qCnOzJ8IpW6pJR2IEGHn7/bBaR5MLO8y8CtPuKO2J0nMfGdKr+5uZ4kVdhAD6N99K1bo7ynB5vHpj3AZ0NxWBbs0KAbTur8VKfTbGeFcbkc1sfnBHuA1CzTIB7js/H5SPffFW3q9sau2PDdLhxkl3X+wiQCVYf4Jt3h1Itmb8iBvEusZJd2a2CuXjxXUWU5dSnAZ5/b0QkOobgMKWzh8eMcXaXr6aYSqfcuXtbAkdbS3RfSD/MGDfvGFO9ZuSfY/ilx/GLumi57Vhgfp9W597ECJA2/a/v/4ENLpYKsDo3kgAAAAASUVORK5CYII=';
    //      img.title = 'Show calendar';
    //      a.appendChild(img);
    //      insertAfter(a, allElements[i]);
    //    }
    //  }
});
