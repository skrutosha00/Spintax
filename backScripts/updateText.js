let fs = require("fs");
let path = require("path");
let spintax = require("spintax-extended");

function addText(text) {
  if (!spintax.isCorrect(text)) {
    return;
  }

  fs.writeFileSync(path.resolve(`texts/${randName("text")}.txt`), text);
}

function removeText(textName) {
  fs.unlinkSync(path.resolve(`texts/${textName}`));
}

function editText({ textName, newText }) {
  if (
    fs.existsSync(path.resolve(`texts/${textName}`)) &&
    spintax.isCorrect(newText)
  ) {
    fs.writeFileSync(path.resolve(`texts/${textName}`), newText);
  }
}

function randName(type) {
  let name = type + "_";

  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < 5; i++) {
    name += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return name;
}

module.exports = { addText, removeText, editText };
