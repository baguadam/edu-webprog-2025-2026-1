# 3. gyakorlat

1. Komplexebb eseménykezelés
2. Delegálás

## Komplexebb eseménykezelés

### 1. feladat

Adott egy paragrafusbeli szöveg, amelyben néhány szó `span` elembe van foglalva vagy hivatkozásként van megadva. A paragrafusra kattintáskor írd ki a konzolra:

- az eseményt jelző objektumot;
- az esemény típusát;
- a kattintás közben lenyomott egérgombot;
- az egér kattintáskori pozícióját;
- az eseményt eredetileg jelző objektumot;
- `span` elemre kattintva a `span` elem szövegét.
- ha a hivatkozás szövege "libero", akkor ne kövesse a hivatkozást.
- módosítsuk az implementációt úgy, hogy `dupla kattintással`, majd pedig `jobb egérgombbal` működjön

### 2. feladat (Jegyzetkészítő alkalmazás)

Induljunk ki az alábbi HTML-ből:

```HTML
<h2 id="title">Jegyzeteim</h2>
<input type="text" id="titleInput" placeholder="Type a new title..." />
<label> <input type="checkbox" id="highlight" /> Cím kiemelése </label>
<button id="lockBtn">Cím lezárása</button>

<style>
    .highlight {
     background-color: yellow;
    }
</style>
```

1. Minden egyes alkalommal, amikor a felhasználó a szövegmezőbe gépel, a `h2` elem szövege változzon meg a beírt értékre (ha üres az szövegmező, adjunk egy `default` értéket a `h2`-nek)!
2. A checkbox bejelölésekor a `h2` elem kapja meg a `highlight` osztályt, a jelölés megszüntetésekor pedig tűnjön el az osztály!
3. A gombra kattintáskor a szövegmező legyen letiltva, a gomb felirata pedig változzon `Cím feloldása`-ra. Ekkor a szövegmező ismét legyen használható, a gomb felirata pedig vissza `Cím lezárása`-ra változzon! (`readonly` attribútum használata)

### 3. feladat (Kedvenc filmeim keresése)

Készítsünk egy alkalmazás, ami segíségével kedvenc filmjeinkre tudunk keresni! Az alkalmazás mindig csak azokat a filmeket jelenítse meg, amelyek címében szerepel a keresett kifejezés! A keresés legyen `case insensitive`! Induljunk ki az alábbi HTML-ből:

```HTML
<div class="wrap">
  <h1>Filmlista</h1>

  <label for="filter">Szűrés cím szerint</label>
  <input id="filter" type="text" placeholder="Kezdj el gépelni…" autocomplete="off" />

  <p class="muted"><span id="count">0</span> találat</p>

  <ul id="movieList" aria-label="Film címek"></ul>
</div>
```

És az alábbi filmekből:

```JS
  const movies = [
    { title: "The Matrix", year: 1999, length: 136, director: "Lana & Lilly Wachowski" },
    { title: "Inception", year: 2010, length: 148, director: "Christopher Nolan" },
    { title: "Interstellar", year: 2014, length: 169, director: "Christopher Nolan" },
    { title: "Parasite", year: 2019, length: 132, director: "Bong Joon-ho" },
    { title: "Spirited Away", year: 2001, length: 125, director: "Hayao Miyazaki" },
    { title: "Amélie", year: 2001, length: 122, director: "Jean-Pierre Jeunet" },
    { title: "The Godfather", year: 1972, length: 175, director: "Francis Ford Coppola" },
    { title: "Casablanca", year: 1942, length: 102, director: "Michael Curtiz" },
    { title: "Eternal Sunshine of the Spotless Mind", year: 2004, length: 108, director: "Michel Gondry" },
    { title: "Whiplash", year: 2014, length: 106, director: "Damien Chazelle" },
  ];
```

1. A keresőmezőbe gépeléskor a `movieList` elemet töltsük fel a keresett kifejezésnek megfelelő filmekkel! Ha nincs találat, akkor jelenítsük meg a `Nincs találat` üzenetet!
2. A találatok számát jelenítsük meg a `count` span elemben!

## Delegálás

> ### 💡 EVENT BUBBLING
>
> Amikor egy esemény, például egy `kattintás` bekövetkezik egy elementen, az esemény "buborékol" fel a DOM fa szerkezetén keresztül, elérve a szülő elemeket. Ez azt jelenti, hogy ha egy gyermek elemre kattintunk, az esemény először a gyermek elemre hat, majd tovább terjed a szülő elemekre egészen a `document` gyökér elemig.
>
> Ez a viselkedés lehetővé teszi, hogy egyetlen eseménykezelőt alkalmazzunk egy szülő elemre, amely kezeli az összes gyermek elem eseményeit. Ez különösen hasznos dinamikusan létrehozott elemek esetén, ahol nem tudjuk előre, hány gyermek elem lesz jelen a DOM-ban.

> ### 💡 DELEGATION
>
> Az esemény delegálás egy olyan technika, amely kihasználja az esemény buborékolását a DOM-ban. Ahelyett, hogy minden egyes gyermek elemhez külön eseménykezelőt adnánk hozzá, egyetlen eseménykezelőt helyezünk el a szülő elemre. Amikor egy gyermek elemre kattintanak, az esemény "buborékol" fel a szülő elemhez, ahol az eseménykezelő meghívódik.

### 1. feladat

Induljunk ki az alábbi HTML-ből:

```HTML
<table id="grades" cellspacing="0" cellpadding="6">
  <thead>
    <tr>
      <th>Name</th>
      <th>Subject</th>
      <th>Grade</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Alice</td>
      <td>Math</td>
      <td class="grade">5</td>
      <td><button class="delete">×</button></td>
    </tr>
    <tr>
      <td>Bob</td>
      <td>History</td>
      <td class="grade">4</td>
      <td><button class="delete">×</button></td>
    </tr>
    <tr>
      <td>Charlie</td>
      <td>Science</td>
      <td class="grade">3</td>
      <td><button class="delete">×</button></td>
    </tr>
  </tbody>
</table>

<style>
  .highlight { background: #fffb91; }
  button.delete {
    background: #ef4444; color: white; border: none; border-radius: 4px;
    cursor: pointer; padding: 0.3em 0.6em;
  }
</style>
```

1. A `delete` gombra kattintva töröljük a megfelelő sort a táblázatból!
2. A `grade` osztályú cellára kattintva a cella kapja meg a `highlight` osztályt. Kattintáskor minden másik celláról el kell távolítani az osztályt!

### 2. feladat (Színező)

Készítsünk egy színező alkalmazást, amelyben egy 20x20-as rács és egy színválasztó látható. A rács elemeire kattintva a kiválasztott színnel kitölthetjük az adott elemet. Oldjuk meg azt is, hogy `jobbklikkel` egy elem színét törölni tudjuk! A teljes tartalmat (így beleértve a színválasztót és a táblázatot) teljesen dinamikusan hozzuk létre JavaScript segítségével! Használjuk az alábbi CSS-t:

```css
table {
  margin: 0px auto;
  border-collapse: collapse;
}
td {
  border: 1px solid black;
  width: 25px;
  height: 25px;
}
input {
  margin: 0px auto;
  display: block;
}
```
