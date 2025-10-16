# Canvas

A Canvas a böngésző rasztergrafikus megjelenítő felülete. A Canvas API segítségével dinamikusan generálhatunk képeket, rajzolhatunk formákat, szövegeket, és kezelhetünk eseményeket.

## 1. feladat

Rajzoljunk egy egyszerű szabadtéri jelenetet! Hozzunk létre egy `600 x 400` pixeles vásznat, majd erre rajzoljuk ki a következőket:

- Égbolt (600 x 300 téglalap, világoskék színnel) - `fillRect`
- Fű (600 x 100 téglalap, zölt színnel) - `fillRect`
- Nap (Sárga kör a bal felső sarokban) - `arc`
- Ház "test" (Négyzet barna színnel) - `fillRect`
- Ház "tető" (Háromszög piros színnel) - `beginPath`, `moveTo`, `lineTo`, `closePath`, `fill`
- Ablak (Négyzet fehér színnel) - `fillRect`
- Ajtó (Négyzet barna színnel) - `fillRect`
- Szöveg (Pl. "Hello, World!" a ház felett) - `fillText`

## 2. feladat - Flappy Bird

Készítsünk el egy alap `Flappy Bird` játékot Canvas segítségével. Ehhez használjuk a mellékelt `.zip` fájl képeit!

### Vászon létrehozása

- Hozzunk létre egy `600 x 400`-as vásznat, érjük el a JavaScript kódból, hozzuk létre a rajzolási kontextust.
- Állítsuk be a vászon háttérszínét `világoskék` színűre (töltsük ki az egész vásznat egy ilyen színű téglalappal).

### Madár

- Rajzoljunk ki kezdésnek egy madarat barna téglalapként függőlegesen középre, balról 50px távolságra. Ehhez hozzunk létre egy `bird` objektumot, ami tartalmazza a madár `x`, `y`, `width`, `height`, `vy`, `ay` tulajdonságait. (30 széles, 50 magas, 0 kezdősebesség, 250 gravitációs gyorsulás)

- Hozzuk létre a `draw` metódust, ami kirajzolja a madarat a vászonra a `bird` objektum alapján.

### Madár esése

Ahhoz, hogy a madár "esni tudjon" magától, tudnunk kell mozgatni a téglalapot. Hasonló lesz a megközelítés, mint a `Maci-Laci` játékban: készítünk egy `draw` függvényt, ami mindig kirajzolja az aktuális helyzetet, lesz egy `update` függvényünk, ami frissíti a madár helyzetét, illetve egy `gameLoop`, ami ezeket hívogatja bizonyos időközönként.

> ### 💡 requestAnimationFrame()
>
> A `requestAnimationFrame` egy böngésző API, ami lehetővé teszi számunkra, hogy szép, hatékony animációkat készítsünk. Kap egy `callback`-et, olyan, mintha azt mondanánk neki, hogy "Hello, szeretnék animálni valamit, kérlek, hívd meg ezt a függvényt, amikor a böngésző készen áll a következő újrarajzolásra". Ezzel biztosítjuk, hogy nem mi manuálisan állítjuk az időzítést, hanem a böngésző optimalizálja azt. Általában 60 FPS-sel fut, de ez változhat a készülék teljesítményétől függően.
>
> Ellen a `setInterval`, ami fix intervallumokban hív meg egy függvényt, függetlenül attól, hogy a böngésző mikor van készen az újrarajzolásra. Ez néha akadozó animációkat eredményezhet, különösen, ha a készülék nem tudja tartani a tempót.

- Tároljuk el az előző időt: `performance.now()`
- A `gameLoop` mindig megkapja az aktuális időt, számolunk ez alapján eltelt időt: `const dt = currentTime - lastTime;`
- Frissítjük az előző időt
- Meghívjuk az `update(dt)` és `draw()` függvényeket
- Kérjük meg újra a `gameLoop`-ot: `requestAnimationFrame(gameLoop);`

- Írjuk meg az `update(dt)` függvényt, frissítsük a madár függőleges sebességét és helyzetét:

  - `bird.vy += bird.ay * dt;` (gyorsulás hatása)
  - `bird.y += bird.vy * dt;` (sebesség hatása)

- Hívjuk meg a `gameLoop`-ot először, hogy elinduljon a játék.

- Oldjuk meg, hogy amikor lenyomjuk a `space` gombot, a madár ugorjon felfelé, ezt oldjuk meg úgy, hogy adunk neki egy kezdősebességet felfelé, ez legyen `-200px`.

- Oldjuk meg, hogy a madár ne tudon a vászon alján és a tetején túlra menni!

### Oszlopok

Mivel több oszlopra lesz szükségünk, így tömböt fogunk létrehozni, illetve bevezetünk néhány szükséges konstanst is:

```js
const columns = [];
const GAP = 150; // px, felső és alsó oszlop közötti rés
const DISTANCE = 300; // px, egymást követő oszlopok közötti távolság
const SPEED = -200; // px, az oszlopok vízszintes sebessége
```

Az oszlopokat mindig párossával adjuk hozzá (alsó és felső oszlop).

- Használjuk az alábbi `random(min, max)` függvényt, ami véletlenszerű egész számot ad vissza a megadott tartományban:

```js
function random(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}
```

- Készítsünk egy `createColumn()` függvényt, ami létrehoz egy új oszlop párt, és hozzáadja a `columns` tömbhöz. Az oszlopok kezdeti `x` pozíciója legyen a vászon jobb szélén kívül (600px), az `y` az egyik oszlop esetén `0`, másik esetén `h + GAP`, a magasságuk pedig legyen véletlenszerű a következő tartományban: az alsó oszlop magassága legyen `random(50, 200)`, a felső oszlop magassága pedig legyen `400 - alsó_oszlop_magasság - GAP`.

- Hívjuk meg a `createColumn()` függvényt a játék elején, hogy legyen oszlopunk.
- Rajzoljuk ki az oszlopokat fehér téglalappal a `draw()` függvényben.
- Mozgassuk az oszlopokat balra az `update(dt)` függvényben: `column.x += SPEED * dt;`
- Ha az utolsó oszlop a Canvas jobb szélétől `DISTANCE` távolságra van, akkor hozzunk létre egy új oszlop párt a `createColumn()` függvény meghívásával.
- Töröljük mindig az oszlopokat, amikor már teljesen eltűntek a vászon bal szélén (`shift` - mivel a tömb első két eleme kell).

### Ütközés érzékelés

Használjuk az alábbi segédfüggvényt arra, hogy detektáljuk az ütközést a madár és az oszlopok között:

```js
function detectCollision(a, b) {
  return !(
    b.y + b.height < a.y ||
    a.x + a.width < b.x ||
    a.y + a.height < b.y ||
    b.x + b.width < a.x
  );
}
```

- vezessünk be egy `isGameOver` változót, ami kezdetben `false`.
- Az `update(dt)` függvényben ellenőrizzük minden oszlopra, hogy ütközik-e a madárral a `detectCollision(bird, column)` segítségével. Ha igen, állítsuk be az `isGameOver` változót `true`-ra.
- Ha `isGameOver`, ne kérjünk újra `gameLoop`-ot, ezzel megállítva a játékot.

### Képes használata

- A mellékelt `.zip` fájlban található képeket használjuk a madár és az oszlopok megjelenítésére, legyen egy `images` objektumunk, ahol a madárhoz, a háttérhez és az oszlophoz és példányosítunk egy `Image` objektumot, majd beállítjuk az `src`-t a megfelelő fájlra

- A `draw` függvényben a madár és az oszlopok kirajzolásához használjuk a `drawImage` metódust a megfelelő képekkel.
