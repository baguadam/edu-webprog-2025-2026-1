<?php 
include("storage.php");

$ms = new Storage(new JsonIO("movies.json"));

// create
// $ms->add([
//     "title" => "Interstellar",
//     "director" => "Christopher Nolan"
// ]);

// queries
// $all_movies = $ms->findAll();
// print_r($all_movies);
// $all_spielberg = $ms->findAll(["director" => "Spielberg"]);
// print_r($all_spielberg); 
// $by_id = $ms->findById("6921f3ac9b167");
// print_r($by_id);   

// // update
// $by_id['title'] = "The Lord of the Rings";
// $ms->update($by_id["id"], $by_id);

// // delete
// $ms->delete("6921f3ac9b167");