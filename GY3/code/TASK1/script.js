const paragraph = document.querySelector("p");

// event handlers
const handleParagraphClick = (e, name) => {
  e.preventDefault();
  console.log(e);
  console.log("Típus", e.type);
  console.log("Egérgomb: ", e.button === 0 ? "Bal" : "Másik");
  console.log("Katttinás: ", e.clientX, "; ", e.clientY);
  console.log("Forrás: ", e.target);

  if (e.target.matches("a")) {
    e.preventDefault();
    console.log("log");
  }

  if (e.target.matches("span")) {
    console.log(e.target.innerText);
  }
};

const handleSimpleClick = () => {
  console.log("Simple");
};

paragraph.addEventListener("click", (e) => handleParagraphClick(e, "sanyi"));
