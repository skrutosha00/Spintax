let active = true;
let textsLoaded = false;

let textArea = document.querySelector(".textarea");
let allTexts = document.querySelector(".all-texts");

document.querySelector(".add-button").addEventListener("click", async () => {
  if (textArea.value && active) {
    await fetch("/add-text/", {
      method: "POST",
      body: textArea.value
    });

    textsLoaded = false;
    allTexts.innerHTML = "";
    textArea.value = "";
  }
});

document.querySelector(".show-button").addEventListener("click", async () => {
  if (textsLoaded) {
    allTexts.classList.toggle("none");
  } else {
    await showTexts();
    textsLoaded = true;

    activateEditButtons();
    activateDeleteButtons();
  }
});

async function showTexts() {
  let res = await fetch("/get-texts/");

  if (!res.ok) {
    console.log(`Response status is ${res.status}`);
    return;
  }

  let textList = await res.json();

  textList.forEach((textData) => {
    document
      .querySelector(".all-texts")
      .append(createTextBlock(textData.fileName, textData.text));
  });
}

function createTextBlock(header, text) {
  let textBlock = document.createElement("div");
  textBlock.classList.add("text-block", "col-8");

  let textBlockHeader = document.createElement("div");
  textBlockHeader.classList.add("text-block_header");
  textBlockHeader.innerHTML = header;

  let editButton = document.createElement("button");
  editButton.classList.add("btn", "btn-outline-primary", "edit-button");
  editButton.innerHTML = "Edit";

  let deleteButton = document.createElement("button");
  deleteButton.classList.add("btn", "btn-outline-danger", "delete-button");
  deleteButton.innerHTML = "Delete";

  let textBlockBody = document.createElement("div");
  textBlockBody.classList.add("text-block_body");
  textBlockBody.innerHTML = text;

  textBlock.append(textBlockHeader, textBlockBody, editButton, deleteButton);
  return textBlock;
}

function activateEditButtons() {
  document.querySelectorAll(".edit-button").forEach((editButton) => {
    editButton.addEventListener("click", async () => {
      let textBlockBody =
        editButton.parentElement.querySelector(".text-block_body");
      let prevText = textBlockBody.innerHTML;

      let mode = editButton.innerHTML;

      if (mode == "Edit") {
        let innerTextArea = document.createElement("textarea");
        innerTextArea.classList.add("inner-textarea");
        innerTextArea.style.height = textBlockBody.offsetHeight + "px";
        innerTextArea.value = prevText;

        textBlockBody.innerHTML = "";
        textBlockBody.append(innerTextArea);

        editButton.innerHTML = "Confirm";
      } else {
        let innerTextArea =
          editButton.parentElement.querySelector(".inner-textarea");
        newText = innerTextArea.value;

        let textName =
          editButton.parentElement.querySelector(
            ".text-block_header"
          ).innerHTML;

        await fetch("/edit-text/", {
          method: "POST",
          body: JSON.stringify({ textName, newText })
        });

        innerTextArea.remove();
        textBlockBody.innerHTML = newText;

        editButton.innerHTML = "Edit";
      }
    });
  });
}

function activateDeleteButtons() {
  document.querySelectorAll(".delete-button").forEach((deleteButton) => {
    deleteButton.addEventListener("click", async () => {
      let textName =
        deleteButton.parentElement.querySelector(
          ".text-block_header"
        ).innerHTML;

      await fetch("/remove-text/", {
        method: "POST",
        body: textName
      });

      deleteButton.parentElement.remove();
    });
  });
}
