function updateStandardTime() {
  now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();

  if (stnType == 12) {
    if ((hours - 12) < 0) {
      if (hours == 0) {
        hours = 12;
      }
      var amPm = "a.m.";
    } else {
      if (hours != 12) {
        hours -= 12;
      }
      var amPm = "p.m.";
    }
    document.getElementById("am-pm").innerHTML = amPm;
  }

  const newStnTime = ("00"+hours).slice(-2)+":"+("00"+minutes).slice(-2)+":"+("00"+seconds).slice(-2);
  const prevStnTime = document.getElementById("stn-clock").innerHTML;
  if (newStnTime != prevStnTime) {
    document.getElementById("stn-clock").innerHTML = newStnTime;
  }
}

function standardSecondsToDecimal() {
  stnSecs = standardTimeToSeconds(new Date());
  decSecs = stnSecs * (100000 / 86400);
  decHrs = Math.floor(decSecs / 10000);
  decSecs = decSecs - 10000 * decHrs;
  decMins = Math.floor(decSecs / 100);
  decSecs = Math.floor(decSecs - 100 * decMins);

  const dec = new Object();
    dec['decHrs'] = ("00"+decHrs).slice(-2);
    dec['decMins'] = ("00"+decMins).slice(-2);
    dec['decSecs'] = ("00"+decSecs).slice(-2);

  return dec
}

function updateDecimalTime() {
  var newDecTime = String();

  if (decType == "fraction") {  
    newDecTime = decimalTimeToFraction();
  }
  else if (decType == "percent") {
    newDecTime = decimalTimeToPercent();
  }
  else {
    dec = standardSecondsToDecimal();
    newDecTime = ("00"+dec["decHrs"]).slice(-2)+"."+("00"+dec["decMins"]).slice(-2)+"."+("00"+dec["decSecs"]).slice(-2);

  }

  const prevDecTime = document.getElementById("dec-clock").innerHTML;
  if (newDecTime != prevDecTime) {
    document.getElementById("dec-clock").innerHTML = newDecTime;
  }
}

function decimalTimeToFraction() {
  dec = standardSecondsToDecimal();
  const fracTime = '0.'+dec["decHrs"][1]+dec['decMins']+dec['decSecs']+'d';
  return fracTime;
}

function decimalTimeToPercent() {
  dec = standardSecondsToDecimal();
  const percTime = dec["decHrs"][1]+dec["decMins"][0]+"."+dec["decMins"][1]+dec["decSecs"]+"%";
  return percTime;
}

function standardTimeToSeconds(ts) {
  var hours = ts.getHours();
  var minutes = ts.getMinutes();
  var seconds = ts.getSeconds() + ts.getMilliseconds()/1000;
  return (hours * 3600) + (minutes * 60) + seconds;
}

setInterval(function () {
  updateStandardTime();
  updateDecimalTime();
}, 0);
