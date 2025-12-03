# Munkamenet, hitelesítés - elmélet

Cél, hogy több kérés között meg tudjuk tartani az állapotot. Erre eddig láttuk azt, hogyha perzisztensen tárolunk valamit, például egy adatbázisban, akkor onnan el tudjuk érni az adatokat. De ez nem mindig elég számunkra, ugyanis így mindenki ugyanazon az adaton osztozik. A cél az lenne, hogy képesek legyünk kliensenkénti adattárolra. Erre ad majd megoldást a `munkamenet-kezelés`

Erre van kliensoldali és szerveroldali megközelítés is. A kliensoldali megközelítésnél a kliens tárolja az adatokat, például sütik (cookies) segítségével, azonban fontos itt óvatosnak lenni, hiszen ez a megoldás egyrész könnyen manipulálható, másrészt fölöslegesen sok adat megy oda-vissza a kliens és a szerver között. Emiatt a szerveroldali munkamenet-kezelés a gyakoribb, ahol a szerver tárolja az adatokat, és a kliens csak egy azonosítót kap, amivel eléri ezeket az adatokat.

## Munnkamenet-kezelés PHP-ban
A munkamenethez tartozó adatokat a PHP a `$_SESSION` szuperglobális tömbben tárolja. Kapunk munkamenet-kezelő függvényeket is, ezek segítségével tudjuk elindítani (`session_start()`) vagy akár megszüntetni (`session_destroy()`) a munkamenetet.

## Hitelesítés
A hitelesítés nagyon fontos folyamat egy webalkalmazásban, hiszen ennek a segítségével biztosíthatjuk például, hogy csak azonosított felhasználók, illetve jogosultsággal rendelkező felhasználók férjenek hozzá bizonyos erőforrásokhoz. 

> ### 💡 Authentication vs. Authorization
>
> Fontos különbséget tenni az azonosítás (`authentication`) és a jogosultságkezelés (`authorization`) között. Az azonosítás során arra vagyunk kíváncsiak, hogy kik azokat, akik használhatják az alkalmazást (például felhasználónév/jelszó párossal). A jogosultságkezelés során pedig azt határozzuk meg, hogy az adott felhasználó milyen műveleteket hajthat végre az alkalmazásban (például adminisztrátori jogosultságok).

PHP-ban el tudjuk végezni mindkettőt munkamenet-kezeléssel, erre fogunk egyszerű példákat nézni.

# Hitelesítés - feladat

Írjunk egy `Auth` osztályt, ami két adattaggal rendelkezik: 
- `user_storage`: egy `Storage` osztály példány
- `user`: a jelenlegi felhasználó, kezdetben `NULL`

Írjunk hozzá egy konstruktort, ami kap paraméterül egy `IStorage` példányt, beállítja a `user_storage` adattagot, majd ellenőrzi, hogy van-e bejelentkezett felhasználó a munkamenetben (`$_SESSION`), ha igen, beállítja azt. 

Rendelkezik az alábbi metódusokkal: 
- `register($data)`: létrehoz egy asszociatív tömböt: `username`, `password` (a jelszót `password_hash` segítségével tárolja), `fullname`, `roles`, majd elmenti a `user_storage` segítségével. Visszatérési érték: sikeres regisztráció esetén `TRUE`, sikertelen esetén `FALSE` (például ha már létezik ilyen felhasználónév), de ezt ugye kezeli az `add`.
- `user_exists($username)`: ellenőrzi, hogy létezik-e a megadott felhasználónév a `user_storage`-ban. Visszatérési érték: `TRUE`, ha létezik, különben `FALSE`.
- `login($user)`: beállítja a `user` adattagot, valamint elmenti a felhasználó nevét a munkamenetbe (`$_SESSION`).
- `logout()`: nullázza a `user` adattagot, valamint eltávolítja a felhasználó nevét a munkamenetből.
- `user_exists($username)`: ellenőrzi, hogy létezik-e a megadott felhasználónév a `user_storage`-ban. Visszatérési érték: `TRUE`, ha létezik, különben `FALSE`.
- `authenticate($username, $password)`: ellenőrzi, hogy a megadott felhasználónév és jelszó helyes-e. Visszatérési érték: `TRUE`, ha helyes, különben `FALSE`.
- `is_authenticated()`: visszatérési érték: `TRUE`, ha van bejelentkezett felhasználó, különben `FALSE`.
- `authorize($roles = [])`: visszatérési érték: `TRUE`, ha a bejelentkezett felhasználó rendelkezik a megadott szerepkörök egyikével, különben `FALSE`. Ha nincs bejelentkezett felhasználó, akkor mindig `FALSE`-t ad vissza.
- `authenticated_user()`: visszatérési érték: a bejelentkezett felhasználó adatai. 

## Regisztráció 

Írjunk egy register.php-t, ahol a felhasználó meg tudja adni a felhasználó nevét, jelszavát, teljes nevét. Ezeket validáljuk, ellenőrízzük, hogy létezik-e már ilyen felhasználó. Ha nem, akkor hívjuk meg a regisztrációt, és irányítsuk át a felhasználót a login.php oldalra. 

## Bejelentkezés

Írjunk egy login.php-t, ahol a felhasználó meg tudja adni a felhasználónevét, jelszavát. Ezeket validáljuk, majd hívjuk meg az `authenticate` metódust. Ha sikeres a bejelentkezés (tehát a visszatérési érték a bejelentkeztetett felhasználó), akkor hívjuk meg a `login` metódust, majd irányítsuk át a felhasználót az index.php oldalra. 

## Kijelentkezés

Írjunk egy logout.php-t, ahol meghívjuk az `Auth` osztály `logout` metódusát, majd irányítsuk át a felhasználót az `index.php` oldalra. 

# Adattárolás - feladatok
Készítsünk egy CRUD alkalmazást PHP-ban, amely segítségével lehetőségünk van `előadó`, `zeneszám` és `év` hozzáadására, megtekintésére, módosítására és törlésére. Használjuk a már megismert `Storage` osztályt az adatok perzisztens tárolására fájlban. 

## musicsctoage.php
Származtassunk le a `Storage` osztályból egy `MusicStorage` osztályt, amelyet megfelelően felparaméterezünk, hogy az adatokat a `musics.json` fájlban tárolja. 

## add.php
Készítsünk egy egyszerű űrlapot, ahol lehetőség van két szöveges és egy szám adat megadására, az űrlapot el tudjuk küldeni `POST` metódussal. Végezzünk az adatokon validálást: ellenőrízzük, hogy érkezett-e előadó, zeneszám és év, illetve nem üresek-e. Továbbá évszám esetén ellenőrizzük (`FILTERVAR_VALIDATE_INT`), hogy számot adtunk-e meg, illetve, hogy az adott szám (`int`-té konvertálva) `1900` és `2025`között van-e. Ha minden rendben, akkor mentsük el az adatokat a `MusicStorage` osztály segítségével.
Oldjuk meg, hogy az oldal állapottartó legyen, jelezzük ki a hibaüzeneteket! 
Sikeres hozzáadás esetén irányítsuk át a felhasználót az `index.php` oldalra:
```php
header('Location: index.php');
exit();
```

## index.php
Kérjük le az összes zeneszámot, majd ezeket jelenítsük meg egy listában:
```HTML
<ul>
  <li>Előadó - Zeneszám (Év)</li>
</ul>
```

## modify.php
Készítsük el a `modify.php` oldalt, ahol lehetőségünk lesz meglévő zeneszámok módosítására. Az oldal URL-jében kapjuk meg a módosítandó szám `ID`-ját (`$_GET`-ben, ezt oldjuk meg úgy, hogy az `index.php`-t kiegészítjük egy linkkel minden zeneszámhoz, ami  `modify.php?id=XYZ` formátumú lesz, ahol az `XYZ` a zeneszám azonosítója). Kérjük le az adott zeneszám adatait, állítsuk be az űrlap mezőinek az értékét, majd módosítás esetén (elvégezve a megfelelő validációt), legyen lehetőségünk elmenteni a módosított adatokat. Sikeres módosítás esetén ismételten irányítsuk át a felhasználót az `index.php` oldalra. Vigyázzunk arra, hogy amikor az értékeket beállítjuk, ha érkezett `$_POST` kérés, akkor azzal állítsuk be, különben az eredeti értékkel, majd csak ezután essünk vissza az üresre

## delete.php
Készítsük el a `delete.php` oldalt, ahol törölni tudunk egy zeneszámot. Sikeres törlés után irányítsuk át a felhasználót az `index.php` oldalra.