# Fájlkezelés, adattárolás

Nativ módon, majd pedig segédosztályok használatával. 

## Nativ fájlkezelés - egyszerű példa JSON adattárolásra PHP-ban

Készítsünk két egyszerű scriptet, az egyik legyen a `save.php`, a másik pedig a `load.php`. 

### save.php
Definiáljunk egy egyszerű asszociatív tömböt, aminek például jegyzetek vannak (`title` => `messages`), konvertáljuk a tömböt JSON formátumba, majd mentsük el egy fájlba. 

### load.php
Olvassuk be a fájl tartalmát, majd dekódoljuk a JSON adatokat, és jelenítsük meg a jegyzeteket.

```php
[
  ["title" => "Shopping list", "text" => "Milk, Bread, Bananas"],
  ["title" => "Reminder", "text" => "Call mom"]
]
```

## Nativ fájlkezelés - CSV formátumú adattárolás
Készítsünk egy egyszerű alkalmazást, ami CSV formátumban menti el az URL-ben megadott adatokat: `name`, `email`, `phone`. Ehhez készítsünk két scriptet, az egyik legyen `save_contact.php`, a másik pedig `load_contact.php`. Az előbbiben végezzünk minimális validálát, mielőtt kiírjuk az adatokat a CSV fájlba. Az utóbbiban olvassuk be a CSV fájl tartalmát, és jelenítsük azt meg egy HTML táblázatban. 

## Segédosztályok használata - Storage osztály
Induljunk ki az alábbi `movies.json` fájlból, ami filmek adatait tartalmazza JSON formátumban:

```json
{
    "637e21e1c48fb": {
        "title": "Indiana Jones 5.",
        "director": "Spielberg",
        "id": "637e21e1c48fb"
    }
}
```

Hozzunk létre egy példányt a `Storage` osztályból, aminek a segítségével képesek leszünk filmeket hozzáadni, az összes filmet lekérdezni, illetve ID alapján megkeresni egy filmet, módosítani azt, majd pedig törölni.

## Segédosztályok használata - ContactStorage
Hozzunk létre egy `ContactStorage` osztályt, ami leszármazik a `Storage` osztályból, megfelelően módosítva annak a működését. Legyen egy `add.php` scriptünk, ahol egy űrlap fogad minket, itt meg tudjuk adni a felhasználónak a nevét, illetve a telefonszámát, ezeket `POST` metódussal elküldjük. Írjunk egy `validate()` metódust, amivel minimális ellenőrzést végzünk a beérkezetett adatokon, és ha minden rendben van, akkor elmentjük az adatot a `contacts.json` fájlba. Készítsünk hasonlóképpen egy `index.php` scriptet is, ahol visszaolvassuk a `contacts.json` fájl tartalmát, majd megjelenítjük azt egy HTML táblázatban. 