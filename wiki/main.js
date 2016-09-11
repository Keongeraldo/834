$('.grid').masonry({
  itemSelector: '.grid-item',
  columnWidth: 300,
  stagger: 30,
  gutter: 8,
  isFitWidth: true
});


Date.prototype.getWeek = function () {
    var target  = new Date(this.valueOf());
    var dayNr   = (this.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    var firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() != 4) {
        target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }
    return 1 + Math.ceil((firstThursday - target) / 604800000);
}

var d= new Date();

var weekday = new Array(7);
weekday[0]=  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";


var monthName = new Array(12);
monthName[0]=  "January";
monthName[1] = "February";
monthName[2] = "March";
monthName[3] = "April";
monthName[4] = "May";
monthName[5] = "June";
monthName[6] = "July";
monthName[7] = "August";
monthName[8] = "September";
monthName[9] = "October";
monthName[10] = "November";
monthName[11] = "December";

    // COMMENTS TO LATER DELETE
    // console.log(d.getWeek());

    // console.log( "Today is " + weekday[d.getDay()]);



$('.todays-classes h3 #day').text(weekday[d.getDay()] + ', ' + monthName[d.getMonth()] + ' ' + d.getDate());


$(document).ready(function(){

  $.getJSON( "UniSem07Timetable.json", function( data ) {
    var items = [];
    var weekNumber;

    if (d.getWeek()%2 == 0){
      weekNumber = "SecondWeek";
    }else if (d.getWeek()%2 == 1){
      weekNumber = "FirstWeek";
    }



    // COMMENTS TO LATER DELETE

    // console.log("Today is a day in the " + weekNumber );
    // var mabina;
    // mabina = data;

    // console.log(mabina[weekNumber]);

    TodaysSubjects = data[weekNumber][weekday[d.getDay()]];

    for (var i = 0; i < TodaysSubjects.length; i++) {
      items.push(
        "<li class='somo-la-leo'>"+
          // " Subject: " + TodaysSubjects[i][0] + ", " +
          "<p class='kuhusu-somo'>" + " Предмет: "+"<span class='bolder somo'>" + TodaysSubjects[i][0] +"</span>" + ", " + "</p>" + 
          // " Teacher: " + TodaysSubjects[i][1] + ", " +
          "<p class='kuhusu-somo'>" + " Преподаватель: "+"<span class='bolder mwalimu'>" + TodaysSubjects[i][1] +"</span>" + ", " + "</p>" +
          // " Where: " + TodaysSubjects[i][2] + "." +
          "<p class='kuhusu-somo'>" + " Аудитория: "+"<span class='bolder darasa'>" + TodaysSubjects[i][2] +"</span>" + "." + "</p>" +
        "</li>"
        );
      // console.log(" Subject: " + TodaysSubjects[i][0] );
      // console.log(" Teacher: " + TodaysSubjects[i][1] );
      // console.log(" Where: " + TodaysSubjects[i][2] );
    }

    // COMMENTS TO LATER DELETE
    // data[weekNumber][weekday[d.getDay()]][0], function( val ) {
    //   // items.push( "<li id='" + key + "'>" + val + "</li>" );
    //   console.log(val);
    //   items.push("<li> " + val[0] + " </li>");
    // }
   
    $( "<ol/>", {
      "class": "todays-subjects",
      html: items.join( "" )
    }).appendTo( "div.todays-classes div" );


  });


});

