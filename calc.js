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
    dateSt: '2020-02-20',
    dateEn: '2020-02-21',
    timeSt: '10:00',
    timeEn: '12:00',
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
function calcTDT (dta){
    // Calculate Days
    if ((dta.eDays - dta.sDays) < 0) {
        dta.tDays = 0;
        dta.err = 1; // return error if total days negative
        return 
    } else {
        dta.tDays = dta.eDays - dta.sDays;
    }
    //Calculate hours
    if ((dta.eHrs - dta.sHrs) < 0) {
        dta.tDays -= 1;
        if (dta.tDays < 0) {
            dta.err = 1; // return error if total days negative
            return;
        } else {
            dta.tHrs = 24 + dta.eHrs - dta.sHrs;
        }
    } else {
        dta.tHrs = dta.eHrs - dta.sHrs;
    }
    //Calculate minutes
    if ((dta.eMins - dta.sMins) < 0) {
        if (dta.tHrs === 0){
            dta.tDays -= 1;
            if (dta.tDays < 0) {
            dta.err = 1; // return error if total days negative
            return;
            } else {
             dta.tMins = 60 + dta.eMins - dta.sMins;   
            }  
            } else {
            dta.tHrs -= 1;
            dta.tMins = 60 + dta.eMins - dta.sMins;
        }  
    } else {
        dta.tMins = dta.eMins - dta.sMins;
    };
   // console.log(dta.tDays + ' days: ' + dta.tHrs + ':' + dta.tMins);
    dta.totHrs = dta.tDays*24 + dta.tHrs;
    dta.totMins = dta.totHrs*60 + dta.tMins;
  //  console.log(data.totHrs,data.totMins);
}
/////////////////////////////////////
// UI data get Input, check and calc

function getUIData (dta){
    //get Data from Start/End date and Start/End time of UI
    dta.dateSt = document.getElementById('sday').value;
    dta.dateEn = document.getElementById('eday').value;
    dta.timeSt = document.getElementById('sttime').value;
    dta.timeEn = document.getElementById('entime').value;
    
    //extract start end end days
    dta.sDays = parseInt(dta.dateSt.slice(8));
    dta.eDays = parseInt(dta.dateEn.slice(8));
    
    //extract start and end hours and minutes
    dta.sHrs = parseInt(dta.timeSt); 
    dta.eHrs = parseInt(dta.timeEn);
    dta.sMins = parseInt(dta.timeSt.slice(3));
    dta.eMins = parseInt(dta.timeEn.slice(3));
    calcTDT(data);
    if (data.err === 1) {
    console.log('Wrong input!');
        data.err = 0;
        alert('Wrong input! End date/time is less than start date/time');
        return;
    } else {
    //   console.log(data);
        updateUIresult();
    }
};



////////////////////////////////////
// Global app Controller

var controller = function() {
   
   //get input from page button
 //   document.querySelector('.prop').addEventListener('click', getUIData(data)); 
    function getAndCalc(){
        getUIData(data);
    }
    
    document.getElementById('calc-btn').addEventListener("click", getAndCalc); 
    
    document.getElementById('submitprop').addEventListener("click", getAndCalc); 
    
    // get keyboard press event
    document.addEventListener('keypress',function(event){
        // if ENTER is pressed
        if (event.keyCode === 13 || event.which === 13) {
                getAndCalc;
                }
    }) 
    
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
    
    document.querySelector('.rovel').style.display = 'none'; //Hide logo
    
    document.querySelector('.tdt').style.display = 'block'; // Display Total Dive time
    document.querySelector('.total-hours').style.display = 'block';
    document.querySelector('.total-minutes').style.display = 'block';
}

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

// BEGIN app
// Set today's date in input dates
todaysDate();
document.querySelector("#sday").value = data.dateSt;
document.querySelector("#eday").value = data.dateEn;
document.querySelector('.tdt').style.display = 'none'; // hide display of Total dive times in the beginning

document.querySelector('.total-hours').style.display = 'none';
document.querySelector('.total-minutes').style.display = 'none';
//console.log(data);
controller();

