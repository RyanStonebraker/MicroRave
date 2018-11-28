function createTableEntry (...commands) {
  entry = "<tr>";
  commands.forEach(function (command) {
    entry += "<td>";
    entry += command;
    entry += "</td>";
  });
  entry += "</tr>";

  return entry;
}
function watchAPI () {
  $.ajax({
      type: 'GET',
      url: '/api/api.txt',
      success: function(data){
        let microwaveQueue = JSON.parse(data);
        $('table.queue tbody.body').html("");
        microwaveQueue.forEach(function (command) {
          $('table.queue tbody.body').prepend(
            createTableEntry(command.time, command.song)
          );
        });
      }
  });
  setTimeout(watchAPI, 1000);
}
$(document).ready(function () {
  watchAPI();
});
