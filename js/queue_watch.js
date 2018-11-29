function createTableEntry (command) {
  let uuid = command.uuid;
  let executed = command.executed;
  delete command.uuid;
  delete command.executed;

  let entry = "<tr id='" + uuid + "'" + (executed ? " class='executed'>" : ">");
  Object.keys(command).forEach(function (key) {
    let info = command[key];
    entry += "<td class='" + key + "'>";
    entry += info;
    entry += "</td>";
  });
  entry += "</tr>";
  return entry;
}

function updateTableEntry (command) {
  let uuid = command.uuid;
  let executed = command.executed;
  delete command.uuid;
  delete command.executed;

  Object.keys(command).forEach(function (key) {
    let currentInfo = $("#" + uuid + " td." + key);
    if (currentInfo != command[key])
      $("#" + uuid + " td." + key).text(command[key]);
  });
}

var aliveUUIDs = 0;
function watchAPI () {
  let currentAliveUUIds = 0;
  $.ajax({
      type: 'GET',
      url: '/api/api.txt',
      success: function(data){
        if (!data)
          return;
        let microwaveQueue = JSON.parse(data);
        let commandRunning = false;
        microwaveQueue.forEach(function (command) {
          if(command.executed) {
            $("section.microwave figure img.raveMode").addClass("rave");
            commandRunning = true;
          }
          if ($('#' + command.uuid).length) {
            updateTableEntry(command);
            ++currentAliveUUIds;
          }
          else
            $('table.queue tbody.body').append(createTableEntry(command));
        });
        if (!commandRunning)
          $("section.microwave figure img.raveMode").removeClass("rave");
        if (currentAliveUUIds < aliveUUIDs) {
          $('table.queue tbody.body').html("");
          watchAPI();
        }
        aliveUUIDs = currentAliveUUIds;
      }
  });
  setTimeout(watchAPI, 200);
}

$(document).ready(function () {
  $('table.queue tbody.body').html("");
  watchAPI();
});
