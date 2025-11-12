const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

// localStorage.getItem(key);
// localStorage.setItem(key, value);

// JSON.stringify();
// JSON.parse();

const saveButton = document.querySelector("#save-button");
const loadButton = document.querySelector("#load-button");

const resultObject = {
  player: "player1",
  board: matrix,
};

saveButton.addEventListener("click", () => {
  localStorage.setItem("current-game", JSON.stringify(resultObject));
});

loadButton.addEventListener("click", () => {
  const result = JSON.parse(localStorage.getItem("current-game"));
  console.log(result);
});
