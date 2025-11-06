# 7. gyakorlat

JavaScript ismétlés, PHP alapok

## JavaScript ismétlés

Hozzunk létre egy 4\*4-es mátrixot, ami random értékeket tartalmaz 1 és 100 között. Adjunk a felülethez egy mentés és betöltése gombot. Ha a betöltése kattintunk, a localStorage-ból töltsük be a mátrix értékeit (ha vannak), ha a mentésre, akkor mentsük el a localStorage-ba az értékeket.

## PHP alapok

1. Környezet beállítása, telepítés, stb.
2. Előadás diák
3. PHP szintaxis alapok

### Feladatok

1. Hozzunk létre különböző típusú változókat, kezdetben a primítívekkel (integer, float, string, boolean). Írjuk ki ezeket!
2. Hozzunk létre két stringet, fűzzük őket össze, majd írjuk ki a hosszúságukat!
3. Hozzunk létre egy tömböt, ami gyümölcsöket tartalmaz. Írjuk ki a tömb második elemét! Iteráljunk végig a tömbön, majd írjuk ki az összes elemet
4. Írjunk egy `calculateSum` nevű függvényt, ami paraméterül egy tömböt kap, majd visszaadja a tömb elemeinek összegét!
5. Írjunk egy `while` ciklust, ami kiírja a számokat 1-től 10-ig!
6. Hozzunk létre egy asszociatív tömböt, ami egy személy adatait tartalmazza (név, életkor, város). Írjuk ki a személy nevét és városát!
7. Hozzunk létre egy hasonló asszociatív tömböt, majd iteráljunk végig rajta, és írjuk ki az összes kulcs-érték párt!
8. Induljunk ki az alábbi rekordok tömbjéből, szórakozzunk vele egy kicsit:

```php
$students = [
    [
        "name" => "Alice Johnson",
        "age" => 20,
        "grade" => "A",
        "subjects" => ["Math", "English", "Programming"]
    ],
    [
        "name" => "Brian Smith",
        "age" => 22,
        "grade" => "B",
        "subjects" => ["Physics", "Chemistry"]
    ],
    [
        "name" => "Carla Brown",
        "age" => 19,
        "grade" => "A+",
        "subjects" => ["Biology", "Math", "Art"]
    ]
];
```

9. Nézzünk meg néhány beépített függvényt: `var_dump()`, `is_array()`, `count()`, `array_keys()`, `array_values()`, `in_array()`, `empty()`, `array_push()`, `array_pop()`
10. Induljunk ki az alábbi, hibaüzeneteket tartalmazó tömbből. Jelenítsük meg az üzeneteket felsorolásként!

```php
$errors = [
    "Username is required",
    "Password must be at least 8 characters",
    "Email address is invalid"
];
```

11. Egy filmeket listázó oldalon szeretnénk legördülő mezőből kiválasztani a film kategóriáját. A háttérrendszernek azonban a kategória azonosítójára van szüksége. Például: 5 - Akció, 4 - Dráma, 8 - Vígjáték. Találjuk ki az adatokat tároló adatszerkezetet, majd az alapján állítsuk elő az oldalon a legördülő mezőt! Ehhez használjunk <select> és <option> HTML elemeket!
