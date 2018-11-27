$(document).ready(function () {
  let timeChange = 5;

  function getCookingTime() {
    let currentTime = $("section.microwave input[name=time]").val();
    let minutes = 0;
    let seconds = 0;
    let error = false;

    let timeMatch = currentTime.match(/^([0-9]{0,2}):{0,1}([0-9]{0,2})$/);
    if (timeMatch) {
      $("section.microwave input[name=time]").removeClass("error");
      minutes = parseInt(timeMatch[1] || 0);
      seconds = parseInt(timeMatch[2] || 0);
    }
    else {
      $("section.microwave input[name=time]").addClass("error");
      error = true;
    }

    return {
      minutes: minutes,
      seconds: seconds,
      error: error
    };
  }

  function setCookingTime(minutes, seconds) {
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    $("section.microwave input[name=time]").val(minutes + ":" + seconds);
  }

  $("section.microwave a.modtime.add").click(function () {
    let cookingTime = getCookingTime();
    if (cookingTime.error) {
      setCookingTime(0,0);
      return;
    }
    cookingTime.minutes = cookingTime.seconds + timeChange >= 60 ? cookingTime.minutes + 1 : cookingTime.minutes;
    cookingTime.seconds = (cookingTime.seconds + timeChange) % 60;
    if (cookingTime.minutes >= 100) {
      $("section.microwave input[name=time]").addClass("error");
      cookingTime.minutes = 0;
      cookingTime.seconds = 0;
    }
    setCookingTime(cookingTime.minutes, cookingTime.seconds);
  });

  $("section.microwave a.modtime.subtract").click(function () {
    let cookingTime = getCookingTime();
    if (cookingTime.error) {
      setCookingTime(0,0);
      return;
    }
    if (cookingTime.seconds - timeChange < 0) {
      if (cookingTime.minutes > 0) {
        cookingTime.seconds = 60 - timeChange;
        --cookingTime.minutes;
      }
    }
    else
      cookingTime.seconds -= timeChange;
    setCookingTime(cookingTime.minutes, cookingTime.seconds);
  });
});
