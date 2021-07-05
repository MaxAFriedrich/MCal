import {setContEdit} from '../gui/gui'

//*global vars
//toggle for preview
var previewMDState:boolean=true


/**
 * function that runs on button click which converts to makrkdown to html and back on toggle
 * @param currentDisplayText the text of the notepad as plain text string
 * @param currentDisplayHTML the text of the current notepad as html string
 * @param currentWrite the current contents of the notepad file
 * @returns [text to write to file, text to display] strings
 */
export function previewMDClick(currentDisplayText:string,currentDisplayHTML:string,currentWrite:string){
  var toWrite:string, toDisplay:string, value:string;

  if (previewMDState){
    // show html
    setContEdit(false,"note");
    toDisplay=markdownParser(currentDisplayText);
    toWrite=currentDisplayHTML;
    value="Edit";
  }else{
    //show code
    setContEdit(true,"note");
    toDisplay=currentWrite;
    toWrite=currentWrite;
    value="Preview";
  }
  previewMDState=!previewMDState
  return [toWrite,toDisplay,value]
}

//!NOTE: This is not completed code and has been pulled directily from https://github.com/MaxAFriedrich/markdown-parser
//TODO tables and footnotes
function markdownParser(input : string) {
  return input.replace(/^###### (.*)\{#(.*)\}$/gim, '<h6 id="$2">$1</h6>')
  .replace(/^###### (.*$)/gim, "<h6>$1</h6>")
  .replace(/^##### (.*)\{#(.*)\}$/gim, '<h5 id="$2">$1</h5>')
  .replace(/^##### (.*$)/gim, "<h5>$1</h5>")
  .replace(/^#### (.*)\{#(.*)\}$/gim, '<h4 id="$2">$1</h4>')
  .replace(/^#### (.*$)/gim, "<h4>$1</h4>")
  .replace(/^### (.*)\{#(.*)\}$/gim, '<h3 id="$2">$1</h3>')
  .replace(/^### (.*$)/gim, "<h3>$1</h3>")
  .replace(/^## (.*)\{#(.*)\}$/gim, '<h2 id="$2">$1</h2>')
  .replace(/^## (.*$)/gim, "<h2>$1</h2>")
  .replace(/^# (.*)\{#(.*)\}$/gim, '<h1 id="$2">$1</h1>')
  .replace(/^# (.*$)/gim, "<h1>$1</h1>")
  .replace(/^\> (.*$)/gim, "<blockquote>$1</blockquote>")
  .replace(/\*\*\*(.*)\*\*\*/gim, "<i><b>$1</b></i>")
  .replace(/\*\*(.*)\*\*/gim, "<b>$1</b>")
  .replace(/__(.*)__/gim, "<b>$1</b>")
  .replace(/\*(.*)\*/gim, "<i>$1</i>")
  .replace(/_(.*)_/gim, "<i>$1</i>")
  .replace(/~~(.*)~~/gim, "<s>$1</s>")
  .replace(/^- \[\x\](\s*)(.*)/gim, '<ul style="list-style-type: none;"><li><input type="checkbox"checked="true">$2</li></ul>')
  .replace(/^- \[ \](\s*)(.*)/gim, '<ul style="list-style-type: none;"><li><input type="checkbox">$2</li></ul>')
  .replace(/^(\*|- )(\s*)(.*)/gim, "<ul><li>$3</li></ul>")
  .replace(/(^1\.\s*(.|\n)*\d\.\s*.*)/gim, "<ol>$1</ol>")
  .replace(/\d\.\s*(.*)/gim, "<li>$1</li>")
  .replace(/\=\=(.*)\=\=/gim, "<mark>$1</mark>")
  .replace(/\`\`\`(.*)([\s\S]*)\`\`\`/gim, "<pre>$2</pre>")
  .replace(/^(.*)\n: (.*)/gim, "<p><dfn>$1</dfn> $2</p>")
  .replace(/\`(.*)\`/gim, "<code>$1</code>")
  .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
  .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
  .replace(/^---/gim, "<hr>")
  .replace(/\n$/gim, "<br />");
}
