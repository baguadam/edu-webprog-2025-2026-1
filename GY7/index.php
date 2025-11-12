<?php

// Változók létrehozása: a PHP dinamikusan típusos nyelv, csakúgy, mint a JavaScript, így nem szükséges manuálisan megadni, hogy 
// mi legyen egy-egy változó típusa. 
$last_name = "Bagu";
$first_name = "Ádám";
$age = 23;
$is_married = false;
$height = 175.3;

// var_dump segítségével kaphatunk információt a változónkról, pl típus vagy struktúra, debughoz nagyszerű
var_dump($first_name, $age, $is_married, $height);
echo $last_name . $first_name; // string konkatenáció (NEM A "+")
echo $age + $age; 

// tömb létrehozása, vizsgálata
$fruit_array = ["banana", "orange", "lime"];
var_dump($fruit_array);
echo $fruit_array[1];

// iterálás a tömbön, elkérve az indexet és az értéket is
foreach($fruit_array as $index => $fruit) {
    echo "<h1>$index - $fruit</h1>";
}

// függvények létrehozása, összegzés tétel
function calculateSum($num_array) {
    $sum = 0;
    foreach($num_array as $num) {
        $sum += $num;
    }
    return $sum;
}

// függvény
function sumToTwenty() {
    $sum = 0;
    for ($i = 1; $i < 21; $i++) {
        $sum += $i;
    }
    return $sum;
}

// függvények meghívása, kimenetgenerálás
$nums = [1, 2, 3, 4];
$result = calculateSum($nums);
echo "<h2>$result</h2>"; // valid HTML-t hozok létre, ha azt ki"echo"-zom

$result_to_twenty = sumToTwenty();
echo "<h3>$result_to_twenty</h3>";

// if-statement
if ($age > 18) {
    echo "<p>Idősebb vagyok!</p>";
} else {
    echo "<p>Fiatalabb vagyok!</p>";
}

// referencia szerinti paraméterátadás, így nem lokális változattal dolgozom, hanem a külső változót módosítom
$num = 10;
function increment(&$num) {
    $num++;
}

increment($num);
echo "<p>$num</p>";

// asszociatív tömb, key-value mappingnek feleltethető meg
$person = [
    "name"      => "Ádám",
    "age"       => 24,
    "country"   => "Hungary"
];

var_dump($person);
echo "<p>{$person['age']}</p>";

// további szórakozás asszociatív tömbökkel
$keys = array_keys($person);
$values = array_values($person);
var_dump($keys);
var_dump($values);

foreach($person as $key => $value) {
    echo "<p>$key - $value</p>";
}

echo count($person); // elemszám lekérdezése

// generáljunk le egy listát a diákokból úgy, hogy ne jelenítsük meg a tanult tárgyaikat, csak a nevet, életkort és a jegyet!
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

foreach($students as $student) {
    echo "<ul>";
        foreach ($student as $key => $value) {
            if (!is_array($value)) {
                echo "<li>$key - $value</li>";
            }
        }
    echo "</ul>";
}

?>