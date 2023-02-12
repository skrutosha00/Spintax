let fs = require("fs");
let spintax = require("spintax-extended");
let deepl = require("deepl-node");

let deeplToken = "";
let translator = new deepl.Translator(deeplToken);

function textsToJson() {
  let textList = [];

  fs.readdirSync("texts").forEach((file) => {
    textList.push({
      fileName: file,
      text: fs.readFileSync("texts/" + file, "utf-8")
    });
  });

  return JSON.stringify(textList);
}

async function generateText(id, name, url, lang) {
  let file = randElem(fs.readdirSync("texts"));

  if (!file) {
    return { fileName: "Error", text: "There are no texts" };
  }

  let text = fs.readFileSync("texts/" + file, "utf-8");

  if (!spintax.isCorrect(text)) {
    return { fileName: "Error", text: "There is incorrect text in files" };
  }

  text = text.replaceAll("%Name Surname%", name);
  text = text.replaceAll("%ID%", id);
  text = text.replaceAll("%URL%", url);
  text = spintax.unspin(text);

  if (!text.length) {
    return { fileName: "Error", text: "There is empty text in files" };
  }

  if (!lang) {
    lang = "en-gb";
  }

  text = await translator.translateText(text, null, lang);

  return { fileName: file, text: text.text };
}

function randElem(arr) {
  let rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}

module.exports = { textsToJson, generateText };
