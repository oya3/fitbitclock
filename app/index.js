import clock from "clock";
import * as document from "document";

// Tick every second
clock.granularity = "seconds";

let clockLabel = document.getElementById("clock-label");
let hourHand = document.getElementById("hours");
let minHand = document.getElementById("mins");
let secHand = document.getElementById("secs");
// let info = document.getElementById("informations");

// Returns an angle (0-360) for the current hour in the day, including minutes
function hoursToAngle(hours, minutes) {
  let hourAngle = (360 / 12) * hours;
  let minAngle = (360 / 12 / 60) * minutes;
  return hourAngle + minAngle;
}

// Returns an angle (0-360) for minutes
function minutesToAngle(minutes) {
  return (360 / 60) * minutes;
}

// Returns an angle (0-360) for seconds
function secondsToAngle(seconds) {
  return (360 / 60) * seconds;
}

// Rotate the hands every tick
function updateClock() {
  let today = new Date();
  let hours = today.getHours() % 12;
  let mins = today.getMinutes();
  let secs = today.getSeconds();

  hourHand.groupTransform.rotate.angle = hoursToAngle(hours, mins);
  minHand.groupTransform.rotate.angle = minutesToAngle(mins);
  secHand.groupTransform.rotate.angle = secondsToAngle(secs);
  clockLabel.text = today.toTimeString().slice(0, -4);;
}

// デフォルトで情報は隠す
// info.style.display = "none";
// info.style.display = "inline"
// 画面切り替え関数
function toggle(ele){
    ele.style.display = (ele.style.display === "inline") ? "none" : "inline";                 
  }
// Update the clock every tick event
clock.addEventListener("tick", updateClock);