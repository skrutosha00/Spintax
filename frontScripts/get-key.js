let card = document.querySelector(".card");

document.querySelector(".gen-button").addEventListener("click", async () => {
  let inputId = document.querySelector(".input-id").value;
  let id = inputId ? inputId : "Default Id";

  let inputName = document.querySelector(".input-name").value;
  let name = inputName ? inputName : "Default Name";

  let inputURL = document.querySelector(".input-url").value;
  let url = inputURL ? inputURL : "Default URL";

  let inputLang = document.querySelector(".input-lang").value;
  let lang = inputLang ? inputLang.toLowerCase() : "en-gb";

  if (lang == "en") {
    lang = "en-gb";
  } else if (lang == "pt") {
    lang = "pt-pt";
  }

  if (
    ![
      "bg",
      "cs",
      "da",
      "de",
      "el",
      "en-us",
      "en-gb",
      "es",
      "et",
      "fi",
      "fr",
      "hu",
      "id",
      "it",
      "ja",
      "lt",
      "lv",
      "nl",
      "pl",
      "pt",
      "pt-br",
      "pt-pt",
      "ro",
      "ru",
      "sk",
      "sl",
      "sv",
      "tr",
      "uk",
      "zh"
    ].includes(lang)
  ) {
    lang = "en-gb";
  }

  let res = await fetch("/gen-text/", {
    method: "POST",
    body: JSON.stringify([id, name, url, lang])
  });

  if (!res.ok) {
    console.log(`Response status is ${res.status}`);
    return;
  }

  let textObj = await res.json();
  card.querySelector(".card-header").innerHTML = textObj.fileName;
  card.querySelector(".card-body").innerHTML = textObj.text;
});

card.addEventListener("click", () => {
  let body = document.querySelector("body");
  let innerText = document.querySelector(".card-body");
  let area = document.createElement("textarea");
  body.appendChild(area);

  area.value = innerText.innerText;
  area.select();
  document.execCommand("copy");

  body.removeChild(area);
});
