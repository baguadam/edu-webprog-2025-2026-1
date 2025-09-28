// contants
const ROW_SIZE = 20;
const COLUMN_SIZE = 20;

const container = document.querySelector("#container");

const table = document.createElement("table");
container.appendChild(table);

for (let row = 0; row < ROW_SIZE; row++) {
  const rowElem = document.createElement("tr");
  for (let column = 0; column < COLUMN_SIZE; column++) {
    const columnElem = document.createElement("td");
    rowElem.appendChild(columnElem);
  }
  table.appendChild(rowElem);
}

table.addEventListener("click", (e) => {
  if (e.target.matches("td")) {
    e.target.style.backgroundColor = "black";
  }
});
