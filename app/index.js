import clock from "clock";
import * as document from "document";
import { preferences } from "user-settings";

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
  clockLabel.text = date2str(today, 'YYYY/MM/DD(WW) hh:mm:ss', preferences.clockDisplay === "12h")//hours + ':' + mins + ':' + secs; // today.toTimeString().slice(0, -4);;
}

// Date型から指定文字列に変換
function date2str (date, format, is12hours) {
  let week = ['日', '月', '火', '水', '木', '金', '土']
  if (!format) {
    format = 'YYYY/MM/DD(WW) hh:mm:ss'
  }
  let year = date.getFullYear()
  let month = (date.getMonth() + 1)
  let day = date.getDate()
  let weekday = week[date.getDay()]
  let hours = date.getHours()
  let minutes = date.getMinutes()
  let secounds = date.getSeconds()
  let ampm = hours < 12 ? 'AM' : 'PM'
  if (is12hours) {
    hours = hours % 12
    hours = (hours !== 0) ? hours : 12 // 0時は12時と表示する
  }
  let replaceStrArray =
      {
        'YYYY': year,
        'Y': year,
        'MM': ('0' + (month)).slice(-2),
        'M': month,
        'DD': ('0' + (day)).slice(-2),
        'D': day,
        'WW': weekday,
        'hh': ('0' + hours).slice(-2),
        'h': hours,
        'mm': ('0' + minutes).slice(-2),
        'm': minutes,
        'ss': ('0' + secounds).slice(-2),
        's': secounds,
        'AP': ampm
      }
  let replaceStr = '(' + Object.keys(replaceStrArray).join('|') + ')'
  let regex = new RegExp(replaceStr, 'g')
  let ret = format.replace(regex, function (str) {
    return replaceStrArray[str]
  })
  return ret
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