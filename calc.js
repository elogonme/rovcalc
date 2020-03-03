/****************************************************
* ROV (Remotley Operated Vehicle - Underwater robot)
* Dive Time Calculator
* This app calculates Dive Time - Duration of ROV
* underwater based on Start Date/Time (ROV off deck) and
* End Date/Time (ROV on deck). Shows Dive Time in
* total Days, Hours and Minutes. Also shows how many 
* full hours or total minutes was the duration of dive.
* Checks done on correct input. And on first openning
* today's date is inserted.
* Tested on Chrome 100% zoom
* by ROVEL Ltd - Eldar Humbatov
*/

var data = {
    dateSt: '',
    dateEn: '',
    timeSt: '',
    timeEn: '',
    sDays: 0,
    eDays: 0,
    sHrs: 0,
    eHrs: 0,
    sMins: 0,
    eMins: 0,
    tMins: 0,
    tHrs: 0,
    tDays: 0,
    totHrs: 0,
    totMins: 0,
    err: 0,
} 

//////////////////////////////////
//Total Dive Time Calculator 

// UI data get Input, check and calc

function calcDiveTime (){

    //get Data from Start/End date and Start/End time of UI
    data.dateSt = document.getElementById('sday').value;
    data.dateEn = document.getElementById('eday').value;
    data.timeSt = document.getElementById('sttime').value;
    data.timeEn = document.getElementById('entime').value;

    var start = new Date(data.dateSt + 'T' + data.timeSt);
    var end = new Date(data.dateEn + 'T' + data.timeEn);

    var totalDiveTime = end - start;

    data.tDays = Math.floor(totalDiveTime / 86400000);
    data.tHrs = Math.floor((totalDiveTime - data.tDays * 86400000) / 3600000);
    data.tMins = Math.floor((totalDiveTime - data.tDays * 86400000 - data.tHrs * 3600000) / 60000)

    data.totHrs = data.tDays*24 + data.tHrs;
    data.totMins = data.totHrs*60 + data.tMins;

    if (totalDiveTime < 0) {
         alert('Wrong input! End date/time is less than start date/time');
        return; }
    updateUIresult();
};

function updateUIresult() {
    //Updated calculated total times on UI
    var tds, ths, tmin;
    
    tmin = ('0' + data.tMins).slice(-2);
    ths = ('0' + data.tHrs).slice(-2);
    tds = ('0' + data.tDays).slice(-2);
    
    document.querySelector("#calcd").textContent = tds;
    document.querySelector("#calch").textContent = ths;
    document.querySelector("#calcm").textContent = tmin;
    document.querySelector("#tothrs").textContent = data.totHrs;
    document.querySelector("#totmins").textContent = data.totMins;
    
    document.getElementById("calcdata").classList.add('fadeIn');
    document.getElementById("submitrovel").classList.remove('pulse');
    document.getElementById("submitrovel").classList.add('invisible');
    
    switchTotalData('flex'); 

};

// hide or display Total dive times
function switchTotalData(disp) {
    var x = document.getElementsByClassName("tdata");
    var i;
    for (i = 0; i < x.length; i++) {
      x[i].style.display = disp;
    }
}

// Get Initialize all feilds on start
function init() {
    // Set today's date in input dates
    var d = new Date(), mm = (d.getMonth() + 1), dd = d.getDate();
    
    if (dd <=9) {
        dd='0' + dd;
    } else {};
    
    if (mm <=9) {
        mm='0' + mm;
    };
date = d.getFullYear() + '-' + mm + '-' + dd;
data.dateSt = data.dateEn = date;
document.querySelector("#sday").value = data.dateSt;
document.querySelector("#eday").value = data.dateEn;

// hide display of Total dive times in the beginning
switchTotalData('none');
}

// BEGIN app
init();
