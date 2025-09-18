# 2. gyakorlat

1. Néhány apróság előző alkalomról, amikre kevesebb idő jutott
2. DOM alapok + alap eseményvezérlés

## Apróságok

> ### 💡 FONTOS
>
> A `+` operátor két dolgot tud tenni: vagy `number` típusokon összeadást végez vagy pedig `string` típusokat _konkatenál_, miután mindkét értéket primít típussá konvertálta.
>
> A `-`, `*`, `/`, `%` műveletek mindig `number` típusokon hajtódnak végre, ha nem tud numberré konvertálni, akkor `NaN` lesz.
>
> A precedencia nyilván itt is szerepet játszik!

1. Mi lesz a végeredmény az alábbi esetekben?

```js
"7" + 2 * 3;
10 - "4" + "5" + 5;
"100" / "10" + 5;
"5" + (3 - 1);
```

2. Oldjuk meg az alábbi feladatokat tömbsüggvények segítségével!

```js
const items = [
  { id: "A", qty: 10, price: 2.5, active: true },
  { id: "B", qty: 5, price: 3.0, active: false },
  { id: "C", qty: 8, price: 4.0, active: true },
  { id: "D", qty: 3, price: 10.0, active: true },
  { id: "E", qty: 12, price: 1.25, active: false },
];
```

- adjuk meg az `active` elemek árának összegét!
- adjuk meg a a minőségek legnagyobb értékét!
- hozzunk létre egy új tömböt, ami `{id, active, revenue}` formátumú objecteket tartalmaz, ahol `revenue = qty * price`
- hozzunk létre egy tömböt az árakból, majd rendezzük őket növekvő sorrendben!

## DOM alapok és alap eseményvezérlés

- Mi is az a DOM? (`Document Node`, `Element Nodes`, `Attribute Nodes`, `Text Nodes`)
- Elemek kiválasztás - interraktálás a DOM-mal

### Interaktálás a DOM-mal, első eseménykezelőnk!

1. Hozzunk létre egy `Kattints Rám` gombot a HTML-ben. Lássuk el id-val, vegyük be a gombot querySelector segítségével, nézzük meg, hogy milyen attribútumokkal rendelkezik.
2. Adjunk a gombnak egy `class`-t is, majd vegyük be azt használva is!
3. Hozzunk létre még egy gombot, ami ugyanazzal a `class`-szal rendelkezik.
4. Érjük el, hogy az első gombra kattintva megjelnik egy felugró üzenet az oldalon!
5. Érjük el, hogy mindkét gombra kattintva megjelenlen egy felugró üzenet!
6. Tároljunk a gombok `data` attribútumában egy-egy értéket, jelenítsük meg azokat a felugró üzenetben! (`dataset`)

### Bemenet beolvasása, stílus változtatása

1. Hozzunk létre egy `number` beviteli mezőt, és egy `Generálás`! gombot, lássuk el őket megfelelő `id`-val!
2. Vegyük be az elemeket JS-be a mutatott módszer(ek) segítségével!
3. Tegyünk egy eseménykezelőt a gomb `click` eventjére.
4. A gombra kattintáskor olvassuk ki a beviteli mező értéket, hozzunk létre a megadott értékkel megegyező darabszámú `div` elemet, mindegyik szövege legyen egy tetszőleges szöveg. A betűméret növekedjen.
5. Mit kell még tenni ahhoz, hogy megjelenjenek a létrehozott `div`-ek?
6. Mi a különbség az `innerText` és az `innerHTML` között?

### Kör kerületének kiszámítása

1. Hozzunk létre a felületen egy bemeneti mezőt a kör sugarának, egy gombot a számolásra, illetve készítsünk elő egy `div`-et, amiben az eredményt meg fogjuk jeleníteni. A `div`-en belül helyezzünk el egy `h2`-t a következő szöveggel: `Az eredmény:`
2. Vegyük be az elemeket JS-be!
3. Adjunk eseménykezelőt a gomb `click` eventjéhez, végezzük el a számolást.
4. Hozzunk létre egy `<p>` elemet, ebbe írjuk bele a kiszámolt értéket. Jelenjen meg az elem a `<div>`-en belül. Érjük ezt el `createElement` haszálatával és az `innerHTML` módosításával is!

### Leánykori név

Induljunk ki az alábbi HTML-ből:

```HTML
<input type="radio" name="sex" value="man" checked> férfi
<input type="radio" name="sex" value="woman"> nő
Leánykori név: <input id="maidenName">
```

1. Érjük el, hogy csak akkor tudjunk megadni leánykori nevet, ha a `woman` értékkel rendelkező `radio button` van bepipálva. Milyen selectort alkalmaznátok? Hogy érjük el, hogy ne látszódjon az input mező?

### Stílusosság!

1. Hozzunk létre egy `p` taget, ami a következő szöveget tartalmazza: `Stílusos bekezdés`! Legyen egy gombunk: `Kiemelés változtatás`
2. Hozzuk létre a következő stílusosztályt:

```css
.highlight {
  background-color: yellow;
  font-weight: bold;
}
```

3. A gombra kattintva változzon, hogy a `p` tag rendelkezik-e a `highlight` stílusosztállyal vagy sem!

### Kobucizás

Induljunk ki az alábbi, ismert magyar zenekarokat tartalmazó tömbből!

```js
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
```

1. Készítsünk egy konténer `<div>`-et az oldal HTML-jében (pl. `id="bandContainer"`).
2. Vegyük be JS-be a `bands` tömböt és a konténer elemet
3. Iteráljunk végig a `bands` tömbön és minden zenekarhoz hozzunk létre egy új `div`-et. A div tartalmazza `h3` tagben a banda nevét, `p` tagekben a várost és az alapítás évét.
4. Ha a banda még aktív, a háttérszín legyen `lightgreen`, ha már nem aktív, legyen `lightgray`.
5. Adjuk hozzá `style` tagek között az alábbi stílusosztály, majd rendeljük hozzá minden kártyához:

```css
.card {
  border: 1px solid #ccc;
  padding: 1rem;
  margin: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
}
```

6. Minden kártyához állítsuk be `data-name` attribútomként a banda nevét.
7. Fűzzünk be minden elemet a konténerbe!
