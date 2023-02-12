let express = require("express");
let path = require("path");
let bodyParser = require("body-parser");

let { textsToJson, generateText } = require("./backScripts/sendTexts");
let { addText, removeText, editText } = require("./backScripts/updateText");

let app = express();

app.use(express.static(path.resolve(`./`)));

app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.redirect("./get-key");
});

app.get("/edit-key/", (req, res) => {
  res.sendFile(path.resolve("layouts/edit-key.html"));
});

app.get("/get-texts/", (req, res) => {
  res.send(textsToJson());
});

app.post("/add-text/", (req, res) => {
  addText(req.body);
  res.send("ok");
});

app.post("/remove-text/", (req, res) => {
  removeText(req.body);
  res.send("ok");
});

app.post("/edit-text/", (req, res) => {
  editText(JSON.parse(req.body));
  res.send("ok");
});

app.get("/get-key/", (req, res) => {
  res.sendFile(path.resolve("layouts/get-key.html"));
});

app.post("/gen-text/", async (req, res) => {
  res.send(await generateText(...JSON.parse(req.body)));
});

app.listen(4000, () => {
  console.log("spintax running");
});
