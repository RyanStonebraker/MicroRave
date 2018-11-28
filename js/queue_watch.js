function createTableEntry (executed=false, ...commands) {
  let entry = "<tr" + (executed ? " class='executed'>" : ">");
  commands.forEach(function (command) {
    entry += "<td>";
    entry += command;
    entry += "</td>";
  });
  entry += "</tr>";
  console.log(entry);
  return entry;
}

function updateTime () {

}

function watchAPI () {
  $.ajax({
      type: 'GET',
      url: '/api/api.txt',
      success: function(data){
        if (!data)
          return;
        let microwaveQueue = JSON.parse(data);
        let commandRunning = false;
        $('table.queue tbody.body').html("");
        microwaveQueue.forEach(function (command) {
          if(command.executed) {
            $("section.microwave figure img.raveMode").addClass("rave");
            commandRunning = true;
          }
          $('table.queue tbody.body').append(
            createTableEntry(command.executed, command.time, command.song)
          );
        });
        if (!commandRunning)
          $("section.microwave figure img.raveMode").removeClass("rave");
      }
  });
  setTimeout(watchAPI, 1000);
}

$(document).ready(function () {
  watchAPI();
});
