$(document).ready(function () {
    $("section.microwave a.modtime.add").click(function () {
        let currentTime = $("section.microwave input[name=time]").val();
        let minutes = 0;
        let seconds = 0;
        let timeMatch = currentTime.match(/^([0-9]{0,2}):{0,1}([0-9]{0,2})$/);
        if (timeMatch) {
            minutes = parseInt(timeMatch[1] || 0);
            seconds = parseInt(timeMatch[2] || 0);
        }
        else {
            console.log("No match");
        }
    });
});
