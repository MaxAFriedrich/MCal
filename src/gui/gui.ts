//* define DOM for each of the main eliments
var day = document.getElementById("day-wrapper");
var select = document.getElementById("select-wrapper");
var date = document.getElementById("start_dt");
var note = document.getElementById("notes-wrapper");
var body = document.getElementById("body-wrapper");

//* getters and setters

//day

/**
 * 
 * @returns HTML string
 */
export function getHTMLDay() {
  return day.innerHTML;
}

/**
 * 
 * @param setter HTML string
 */
export function setHTMLDay(setter : string) {
  day.innerHTML = setter;
}



//select

/**
 * 
 * @returns HTML string
 */
export function getHTMLSelect() {
  return select.innerHTML;
}

/**
 * 
 * @param setter HTML string
 */
export function setHTMLSelect(setter : string) {
  select.innerHTML = setter;
}


//date

/**
 * 
 * @returns HTML string
 */
export function getHTMLDate() {
  return date.innerText;
}

/**
 * 
 * @param setter HTML string
 */
export function setHTMLDate(setter : string) {
  date.innerText = setter;
}


//note

/**
 * 
 * @returns HTML string
 */
export function getHTMLNote() {
  return note.innerHTML;
}

/**
 * 
 * @param setter HTML string
 */
export function setHTMLNote(setter : string) {
  note.innerHTML = setter;
}



//body

/**
 * 
 * @returns HTML string
 */
export function getHTMLBody() {
  return body.innerHTML;
}

/**
 * 
 * @param setter HTML string
 */
export function setHTMLBody(setter : string) {
  body.innerHTML = setter;
}


//*change body

/**
 * change the contents of the body
 * @param newBody new body as HTML string
 * @returns the old body as HTML string
 */
export function changeBody(newBody : string) {
  var oldBody: string = body.innerHTML;
  body.innerHTML = newBody;
  return oldBody;
}
