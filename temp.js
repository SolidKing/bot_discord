//test
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var hh = today.getHours();
var mmm = today.getMinutes();
var fs = require("fs")
var test = "1+1"

try {
  console.log(eval(test)); 
} catch (e) {
  console.log("Error");
}


console.log(Date.now());


var yyyy = today.getFullYear();
if(dd<10){
    dd='0'+dd;
} 
if(mm<10){
    mm='0'+mm;
} 
if(hh<10){
  hh='0'+hh;
} 
if(mmm<10){
  mmm='0'+mmm;
} 
var today = dd+'/'+mm+'/'+yyyy+' '+hh+':'+mmm;
console.log(today);

var tmpText="05/09/2018 11:10"
var date1 = new Date("08/09/2017");
var date2 = new Date(tmpText);

var diffDays = parseInt((date2 - Date.now()) / (1000 * 60 * 60 * 24)); //gives day difference 
var diffHours = parseInt((date2 - Date.now()) / (1000 * 60 * 60)); //gives hour difference 
var diffMinutes = parseInt((date2 - Date.now()) / (1000 * 60)); //gives minute difference 
//console.log(days+" days "+hours+" hours "+minutes+" minutes "+seconds+" seconds ")

//one_day means 1000*60*60*24
//one_hour means 1000*60*60
//one_minute means 1000*60
//one_second means 1000
var tmp = diffMinutes;
for(var i = 0;tmp-(24*60)>=0;i++){
  tmp -= (24*60); //calculate Day left
}
var tmp2 = tmp //mintues value
for(var j = 0;tmp2-60>=0;j++){
  tmp2 -= 60; //calculate Hour left
}

console.log(i+" days "+ j +" hours " + tmp2 + " minutes")
console.log(diffDays+" days "+ diffHours+" hours")

var testCal="1*2/8*0"
console.log(testCal+" = "+eval(testCal));

var mhw_event = JSON.parse(fs.readFileSync('./mhw_event.json', (err, data) => {  
  if (err) throw err;
  //console.log(data);
}));
var tmpData=[];
i=0;

/*
*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    │
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)
*/
var tmpVal =0;
var schedule = require('node-schedule');
var testSchedule = schedule.scheduleJob('*/1 * * * *', function(){
console.log(Date.now()+'test ' + (tmpVal++))});

for(var obj in mhw_event){
  if(mhw_event.hasOwnProperty(obj)){
    for(var prop in mhw_event[obj]){
      if(mhw_event[obj].hasOwnProperty(prop)){
        //console.log(prop + ': ' + mhw_event[obj][prop]);
        tmpData[i]=mhw_event[obj][prop];
        i++;
      }
    }
    var startDate = new Date(tmpData[2]);
    var endDate = new Date(tmpData[3]);
    var stDiffMinutes = parseInt((startDate - Date.now()) / (1000 * 60));; 
    var edDiffMinutes = parseInt((endDate - Date.now()) / (1000 * 60)); //gives minute difference
    //one_day means 1000*60*60*24
    //one_hour means 1000*60*60
    //one_minute means 1000*60
    //one_second means 1000

    if(Date.now()<startDate){
      var tmpDiffdate = calDiffdate(stDiffMinutes);
      console.log(tmpData[1] + " start in "+ tmpDiffdate[0] + " days " + tmpDiffdate[1] +" hours " + tmpDiffdate[2] + " minutes");
    }
    else if(Date.now()<endDate){
      var tmpDiffdate = calDiffdate(edDiffMinutes);
      console.log(tmpData[1] + " left in "+ tmpDiffdate[0] + " days " + tmpDiffdate[1] +" hours " + tmpDiffdate[2] + " minutes");
    }
    i=0;
  }
}

function calDiffdate(DiffMinutes){
  var tmp = DiffMinutes-120; //-120 minute(2 hour) JPLT to IST
    for(var i = 0;tmp-(24*60)>=0;i++){
      tmp -= (24*60); //calculate Day left
    }
    var tmp2 = tmp //mintues value
    for(var j = 0;tmp2-60>=0;j++){
      tmp2 -= 60; //calculate Hour left
    }
  var tmpArray = [i,j,tmp2];
  return tmpArray;
}