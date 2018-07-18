module.exports = function(tmpCmd,Discord,msg,fs) {
  var mhw_monster_data = require('./mhw_monster_data.json');
  var count = Object.keys(mhw_monster_data).length;

  if(tmpCmd[1] === 'info' && 0){
    for(var i=0; i < count; i++){
      if((mhw_monster_data[i].names.EN).toLowerCase() === (tmpCmd[2]).toLowerCase()){
      
        const embed = new Discord.RichEmbed()
          .setTitle("[link]")
          .setAuthor(mhw_monster_data[i].names.EN+" ("+mhw_monster_data[i].names.JP+")")
          /*
          * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
          */
          .setColor(0x00AE86)
          //.setDescription("This is the main body of text, it can hold 2048 characters.")
          //.setFooter("This is the footer text, it can hold 2048 characters", "http://i.imgur.com/w1vhFSR.png")
          //.setImage("http://i.imgur.com/yVpymuV.png")
          .setThumbnail("https://vignette.wikia.nocookie.net/monsterhunter/images/5/58/MHW-"+mhw_monster_data[i].names.EN+"_Icon.png")
          /*
          * Takes a Date object, defaults to current date.
          */
          //.setTimestamp()
          .setURL("https://mhworld.kiranico.com/monster/"+(mhw_monster_data[i].names.EN).toLowerCase())
          .addField("__Weak__",
          'Fire: '+ mhw_monster_data[i].weak.fire+"\n"+
          'Water: '+ mhw_monster_data[i].weak.water+"\n"+
          'Thunder: '+ mhw_monster_data[i].weak.thunder+"\n"+
          'Ice: '+ mhw_monster_data[i].weak.ice+"\n"+
          'Dragon: '+ mhw_monster_data[i].weak.dragon)
          .addField("__Materials__",
          '**Low Rank**\n')
          /*
          * Inline fields may not display as inline if the thumbnail and/or image is too big.
          */
          //.addField("Inline Field", "They can also be inline.", true)
          /*
          * Blank field, useful to create some space.
          */
          //.addBlankField(true)
          //.addField("Inline Field 3", "You can have a maximum of 25 fields.", true);

        msg.channel.send({embed});
        break;
      };
    }
  }
  else if(tmpCmd[1] === 'event'){
    var mhw_event = JSON.parse(fs.readFileSync('./mhw_event.json', (err, data) => {  
      if (err) throw err;
    }));
    var tmpData=[];
    i=0;
    for(var obj in mhw_event){
      if(mhw_event.hasOwnProperty(obj)){
        for(var prop in mhw_event[obj]){
          if(mhw_event[obj].hasOwnProperty(prop)){
            //console.log(prop + ': ' + mhw_event[obj][prop]);
            tmpData[i]=mhw_event[obj][prop];
            i++;
          }
        }
        var tmpDiffdate;
        var startDate = new Date(tmpData[2]);
        var endDate = new Date(tmpData[3]);
        var stDiffMinutes = parseInt((startDate - Date.now()) / (1000 * 60));; 
        var edDiffMinutes = parseInt((endDate - Date.now()) / (1000 * 60)); //gives minute difference
        //one_day means 1000*60*60*24
        //one_hour means 1000*60*60
        //one_minute means 1000*60
        //one_second means 1000
        
        if(Date.now()<startDate){
          tmpDiffdate = calDiffdate(stDiffMinutes);
          msgEvents(tmpData,tmpDiffdate,139617,"Start in",msg); 
        }
        else if(Date.now()<endDate){
          tmpDiffdate = calDiffdate(edDiffMinutes);
          msgEvents(tmpData,tmpDiffdate,1146678,"Left in",msg);
        }
        i=0;
      }
    }
  }
};

/************/
/* FUNCTION */
/************/

function calDiffdate(DiffMinutes){ //calculate Different Date
  var tmp = DiffMinutes-120; //-120 minute(2 hour) JPT to IST
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

function msgEvents(tmpData,tmpDiffdate,colorVal,startOrLeft,msg){ //send embed card discord format
  if(tmpDiffdate[0]<=1&&colorVal!=139617){
    colorVal = 16711680; 
    /* Color Decimal
    139617 blue mean event start soon
    1146678 green mean event current active
    16711680 red mean event near end
    */
  }

  msg.channel.send({embed: {
    color: colorVal,
    title: tmpData[1],
    url: tmpData[5],
    description: tmpData[4],
    thumbnail: {
      url: tmpData[6]
    },
    fields: [{
        name: "Start Date",
        value: tmpData[2] + " JPT"
      },
      {
        name: "End Date",
        value: tmpData[3] + " JPT"
      },
      {
        name: "Time",
        value: startOrLeft + " "+ tmpDiffdate[0] + " days " + tmpDiffdate[1] +" hours " + tmpDiffdate[2] + " minutes"
      },
      {
        name: "Check All Event Schedule(ENG)",
        value: "[[here]](http://monsterhunterworld.com/eventquest/MHW_EventQuest_EN.pdf)"
      }
    ],
  }});
  return;
}