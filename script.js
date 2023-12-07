const wordelement = document.getElementById("word");
const message = document.getElementById("successmessage");
const popup = document.getElementById("popupcontainer");
const items = document.querySelectorAll(".item");

const messagee = document.getElementById("message");

const playagainbtn = document.getElementById("playagain");

const wronglettersel = document.getElementById("wrongletters");
const wrongletters = [];
const correctletters = [];
let selectedword = getrandomword();

function getrandomword() {
  const words = [
    "javascript",
    "java",
    "python",
    "css",
    "html",
    "react",
    "boostrap",
  ];

  return words[Math.floor(Math.random() * words.length)];
}

function displayword() {
  wordelement.innerHTML = `

${selectedword
  .split("")
  .map(
    (letter) =>
      `
    <div class ="letter">
${correctletters.includes(letter) ? letter : ""}
    </div>
    
    
    `
  )
  .join("")}
`;

  const w = wordelement.innerText.replace(/\n/g, "");

  if (w === selectedword) {
    popup.style.display = "flex";
    message.innerText = "Tebrikler kazandiniz.";
  }
}

function updatewrongletters() {
  wronglettersel.innerHTML = `
    
    ${wrongletters.length > 0 ? "<h3>Hatali Harfler</h3>" : ""}
    ${wrongletters.map((letter) => `<span>${letter}<span/>`)}
    
    `;
  items.forEach((item, index) => {
    const errorcount = wrongletters.length;

    if (index < errorcount) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });

  if (wrongletters.length === items.length) {
    popup.style.display = "flex";
    playagainbtn.style.backgroundColor = "red";
    message.style.color ="red";
    message.innerText = "Maalesef Kaybettiniz";
  }
}

function displaymessage() {
  message.classList.remove("show");

  setTimeout(function () {
    messagee.classList.remove("show");
  }, 2000);
}
playagainbtn.addEventListener("click", function () {
  correctletters.splice(0);
  wrongletters.splice(0);
  selectedword = getrandomword();

  displayword();
  updatewrongletters();
  popup.style.display = "none";
});

window.addEventListener("keydown", function (e) {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    if (selectedword.includes(letter)) {
      if (!correctletters.includes(letter)) {
        correctletters.push(letter);

        displayword();
      } else {
        displaymessage();
        messagee.classList.add("show");
      }
    } else {
      if (!wrongletters.includes(letter)) {
        wrongletters.push(letter);
        updatewrongletters();
      } else {
        displaymessage();
      }
    }
  }
});

displayword();
