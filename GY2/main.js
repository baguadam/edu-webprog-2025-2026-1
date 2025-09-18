const items = [
  { id: "A", qty: 10, price: 2.5, active: true },
  { id: "B", qty: 5, price: 3.0, active: false },
  { id: "C", qty: 8, price: 4.0, active: true },
  { id: "D", qty: 3, price: 10.0, active: true },
  { id: "E", qty: 12, price: 1.25, active: false },
];

// adjuk meg az active elemek árának összegét!
// adjuk meg a a minőségek legnagyobb értékét!
// hozzunk létre egy új tömböt, ami {id, active, revenue} formátumú objecteket tartalmaz, ahol revenue = qty * price
// hozzunk létre egy tömböt az árakból, majd rendezzük őket növekvő sorrendben!

// aktív elemek árának összege
// const actives = items.filter((e) => e.active);
// console.log(actives);
// const sum = actives.reduce((acc, curr) => (acc += curr.price), 0);
const sum = items
  .filter((e) => e.active)
  .reduce((acc, curr) => (acc += curr.price), 0);
console.log(sum);

// minőségek legnagyobb értéke
// in: collection
// out: value
const maxQuality = items.reduce(
  (acc, curr) => (curr.qty > acc ? curr.qty : acc),
  items[0].qty
);

console.log(maxQuality);

// új tömb
const newArray = items.map((elem) => ({
  id: elem.id,
  active: elem.active,
  revenue: elem.qty * elem.price,
}));

console.log(newArray);
