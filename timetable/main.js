$('.grid').masonry({
  itemSelector: '.grid-item',
  columnWidth: 275,
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





$(document).ready(function(){



  //Populate the classes fields
  $.getJSON( "UniSem07Timetable.json", function( data ) {
    var items = [];
    var weekNumber;

    if (d.getWeek()%2 == 0){
      weekNumber = "SecondWeek";
    }else if (d.getWeek()%2 == 1){
      weekNumber = "FirstWeek";
    }


    for (var dayOfTheWeek = 1; dayOfTheWeek < 6; dayOfTheWeek++) {

      console.log(dayOfTheWeek);
      TodaysSubjects = data[weekNumber][weekday[dayOfTheWeek]];

      for (var i = 0; i < TodaysSubjects.length; i++) {
        if(i===0){items[dayOfTheWeek] = [];}
        items[dayOfTheWeek].push(
          "<li class='somo-la-leo'>"+
            // " Subject: " + TodaysSubjects[i][0] + ", " +
            "<p class='kuhusu-somo'>" + " Предмет: "+"<span class='bolder somo'>" + TodaysSubjects[i][0] +"</span>" + ", " + "</p>" + 
            // " Teacher: " + TodaysSubjects[i][1] + ", " +
            "<p class='kuhusu-somo'>" + " Преподаватель: "+"<span class='bolder mwalimu'>" + TodaysSubjects[i][1] +"</span>" + ", " + "</p>" +
            // " Where: " + TodaysSubjects[i][2] + "." +
            "<p class='kuhusu-somo'>" + " Аудитория: "+"<span class='bolder darasa'>" + TodaysSubjects[i][2] +"</span>" + "." + "</p>" +
          "</li>"
          );
      }

          //Append the html and class details for similar stylings like in the wiki
          $('#timetable-app').append('<div class="row todays-classes"><div class="col-md-10 col-md-offset-1">' +
                    '<h3>This is a <span class="day"></span></h3>' +
                    '<h4>Today'+ "'" + 's classes are: </h4>' +

                  '</div> </div>');
        
          //Write today's full date
          $('.todays-classes h3 .day:last').text(weekday[dayOfTheWeek] + ' of ' + weekNumber);


          //Add the subject and lecture details
          $( "<ol/>", {
              "class": "todays-subjects",
              html: items[dayOfTheWeek].join( "" )
            }).appendTo( "div.todays-classes div:last" );

    }


  });


});

