export function boldText(text) {
  var bold = /\*(.*?)\*/gm;
  var html = text.replace(bold, "<strong>$1</strong>");
  return html;
}
