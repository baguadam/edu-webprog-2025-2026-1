// getElementById
// querySelector
// querySelectorAll

// const clickButton = document.querySelector(".warning-button");
// clickButton.addEventListener("click", () => {
//   alert("KATTINTOTTAM!");
// });

const clickButtons = document.querySelectorAll(".warning-button");
const clickButtonsArray = [...clickButtons];

clickButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    alert(`Szia ${name}`);
  });
});

console.log(clickButtonsArray);
console.log(clickButtons);

// ######################################################################
const generateButton = document.querySelector("#generate-button");
const numberInput = document.querySelector("#header-count");
const textContainer = document.querySelector("#text-container");
generateButton.addEventListener("click", () => {
  const inputValue = numberInput.value;
  for (let i = 0; i < inputValue; i++) {
    const div = document.createElement("div");
    div.innerText = "HALO!";
    div.style.fontSize = `${i + 10}px`; // font-size -> fontSize
    div.style.backgroundColor = "gray";
    textContainer.appendChild(div); // document.body.appendChild()
    // append()
  }
});
// console.log(clickButton);

// ######################################################################
const womanRadio = document.querySelector("[value=woman]");
const manRadio = document.querySelector("[value=man]");
const maidenInput = document.querySelector("#maiden-name");
womanRadio.addEventListener("change", () => {
  maidenInput.hidden = false;
});
manRadio.addEventListener("change", () => {
  maidenInput.hidden = true;
});

// ######################################################################
const bands = [
  {
    name: "Quimby",
    city: "Budapest",
    formed: 1991,
    active: true,
    members: 6,
    albums: [
      { title: "Morze", year: 1995 },
      { title: "Kicsi ország", year: 2010 },
      { title: "Parazita", year: 2016 },
    ],
  },
  {
    name: "Kispál és a Borz",
    city: "Pécs",
    formed: 1987,
    active: false,
    members: 4,
    albums: [
      { title: "Föld kaland ilyesmi", year: 1993 },
      { title: "Sika, kasza, léc", year: 1995 },
      { title: "Turisták bárhol", year: 2003 },
    ],
  },
  {
    name: "30Y",
    city: "Pécs",
    formed: 2000,
    active: true,
    members: 5,
    albums: [
      { title: "Csészényi tér", year: 2004 },
      { title: "Semmi szédítő magasság", year: 2006 },
      { title: "Dicsőség", year: 2010 },
    ],
  },
  {
    name: "hiperkarma",
    city: "Budapest",
    formed: 2000,
    active: true,
    members: 4,
    albums: [
      { title: "hiperkarma", year: 2000 },
      { title: "konyharegény", year: 2014 },
      { title: "amondó", year: 2019 },
    ],
  },
];

const bandContainerDiv = document.querySelector(".band-container");
bands.forEach((band) => {
  const div = document.createElement("div");
  const bandDetails = `
    <h3>${band.name}</h3>
    <p>${band.city}</p>
    <p>${band.formed}</p>
  `;
  div.innerHTML = bandDetails;
  bandContainerDiv.appendChild(div);
});
