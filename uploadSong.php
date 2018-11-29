<?php
$song_directory = "songs/";
$song_path = $song_directory . basename($_FILES["songFile"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($song_path,PATHINFO_EXTENSION));
if(isset($_POST["submit"])) {
  if (move_uploaded_file($_FILES["songFile"]["tmp_name"], $song_path)) {
      echo "The song ". basename( $_FILES["songFile"]["name"]). " has been uploaded.";
  }
}
?>
