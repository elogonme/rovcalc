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
    sDays: 1,
    eDays: 2,
    sHrs: 22,
    eHrs: 22,
    sMins: 20,
    eMins: 10,
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

function getUIData (dta=data){

    //get Data from Start/End date and Start/End time of UI
    dta.dateSt = document.getElementById('sday').value;
    dta.dateEn = document.getElementById('eday').value;
    dta.timeSt = document.getElementById('sttime').value;
    dta.timeEn = document.getElementById('entime').value;

    var start = new Date(dta.dateSt + 'T' + dta.timeSt);
    var end = new Date(dta.dateEn + 'T' + dta.timeEn);

    var totalDiveTime = end - start;

    dta.tDays = Math.floor(totalDiveTime / 86400000);
    dta.tHrs = Math.floor((totalDiveTime - dta.tDays * 86400000) / 3600000);
    dta.tMins = Math.floor((totalDiveTime - dta.tDays * 86400000 - dta.tHrs * 3600000) / 60000)

    dta.totHrs = dta.tDays*24 + dta.tHrs;
    dta.totMins = dta.totHrs*60 + dta.tMins;

    if (totalDiveTime < 0) {
         alert('Wrong input! End date/time is less than start date/time');
        return; }
    updateUIresult();
};

var updateUIresult = function (){
    //Updated calculated total times on UI
    var tds, ths, tmin;
    // Check if days, hours, mins are single digit and add second zero
    if (data.tMins <= 9){
        tmin = '0' + data.tMins;
    } else tmin = data.tMins;
    
    if (data.tHrs <= 9){
        ths = '0' + data.tHrs;
    } else ths = data.tHrs;
    
    if (data.tDays <= 9){
        tds = '0' + data.tDays;
    } else tds = data.tDays;
    
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

// Get today's day function
function todaysDate () {
    var d = new Date(), mm = (d.getMonth() + 1), dd = d.getDate();
    
    if (dd <=9) {
        dd='0' + dd;
    } else {};
    
    if (mm <=9) {
        mm='0' + mm;
    };
date = d.getFullYear() + '-' + mm + '-' + dd;
    data.dateSt = data.dateEn = date;
}

// hide or display Total dive times
function switchTotalData(disp) {
    var x = document.getElementsByClassName("tdata");
    var i;
    for (i = 0; i < x.length; i++) {
      x[i].style.display = disp;
    }
}

// BEGIN app
// Set today's date in input dates
todaysDate();
document.querySelector("#sday").value = data.dateSt;
document.querySelector("#eday").value = data.dateEn;

/// hide display of Total dive times in the beginning
switchTotalData('none');
