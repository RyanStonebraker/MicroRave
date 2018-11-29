<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="utf-8">
        <title>MicroRave | For all your IOT/Blockchain microwave needs</title>
        <link rel="stylesheet" href="css/master.css">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Black+Han+Sans" rel="stylesheet">
        <script src="js/microwave-controls.js" charset="utf-8"></script>
        <script src="js/queue_watch.js" charset="utf-8"></script>
    </head>
    <body>
        <header>
            <h1><img src="img/rave_logo.png"></h1>
            <h4>The world's first IOT, Blockchain Microwave.</h4>
        </header>
        <main>
            <section class="microwave">
                <figure>
                    <img class="raveMode" src="img/rave.gif">
                    <img src="img/microwave.png">
                </figure>
                <section class="controls">
                    <iframe width="0" height="0" border="0" name="nullframe" id="nullframe"></iframe>
                    <form action="http://localhost:5000/post" target="nullframe" method="post">
                        <a class="modtime add unselectable">+</a>
                        <a class="modtime subtract unselectable">&minus;</a>
                        <input type="text" name="time" value="00:00">
                        <select name="song">
                          <?php
                            $songs = scandir("songs");
                            foreach($songs as $song) {
                              if ($song[0] != ".") {
                                $song_name = substr($song, 0, -4);
                                echo "<option value='${song}'>${song_name}</option>";
                              }
                            }
                          ?>
                        </select>
                        <input type="submit" name="cook" value="Cook">
                    </form>
                </section>
            </section>
            <section class="right-side">
              <table class="queue">
                  <tbody class="header">
                      <tr>
                          <th>Cooking Time</th>
                          <th>Song</th>
                      </tr>
                  </tbody>
                  <tbody class="body">
                      <tr>
                          <td>---</td>
                          <td>---</td>
                      </tr>
                  </tbody>
              </table>
              <form id="uploader" action="uploadSong.php" method="post" enctype="multipart/form-data">
                  <input type="file" name="songFile" id="songFile">
                  <input type="submit" value="Upload Song" name="submit">
              </form>
            </section>
        </main>
        <footer>
            2018 &copy; MicroRave, LLC
        </footer>
    </body>
</html>
