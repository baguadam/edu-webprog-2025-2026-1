<?php
include("storage.php");
class MusicStorage extends Storage {
    public function __construct() {
        parent::__construct(new JsonIO("music.json"));
    }
}