const table = document.querySelector("#grades");

const handleTableClick = (e) => {
  if (e.target.matches("button")) {
    const row = e.target.closest("tr");
    row.remove();
  }
  if (e.target.matches("td.grade")) {
    const isHighlighted = e.target.classList.contains("highlight");
    e.target.classList.toggle("highlight", !isHighlighted);
    // e.target.classList.add("highlight");
  }
};

table.addEventListener("click", handleTableClick);
