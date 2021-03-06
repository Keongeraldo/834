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


var d = new Date();

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


$(document).ready(function(){
  //Populate the classes fields
  $.getJSON( "UniSem07Timetable.json", function( data ) {
    var items = [];
    var weekNumber;

    if (d.getDay() != 0) {
      if (d.getWeek()%2 == 0){
        weekNumber = "SecondWeek";
      }else if (d.getWeek()%2 == 1){
        weekNumber = "FirstWeek";
      }     
    }else{
      if (d.getWeek()%2 == 0){
        weekNumber = "FirstWeek";
      }else if (d.getWeek()%2 == 1){
        weekNumber = "SecondWeek";
      }
    }



    for (var dayOfTheWeek = 1; dayOfTheWeek < 7; dayOfTheWeek++) {

      function addDoubleDiv () {
        var theMonday = new Date(d.getTime() - (d.getDay() - 1) * 24 * 60 * 60 * 1000);
        var currentDate = new Date(theMonday.getTime() + (dayOfTheWeek-1) * 24 * 60 * 60 * 1000);
        $('#timetable-app').append('<div class="row todays-classes"><div class="col-md-10 col-md-offset-1 todays-classes-2">' +
                  '<h3>This is a <span class="day">' + weekday[dayOfTheWeek] + '</span>' + ' of the ' + weekNumber + ' </h3>' +
                  '<h3>' + monthName[currentDate.getMonth()] + ', ' + currentDate.getDate() + '</h3>' +
                '</div> </div>');
      }

      TodaysSubjects = data[weekNumber][weekday[dayOfTheWeek]];

      if (TodaysSubjects.length > 0) {
        //if it is not a free day then write out the classes we are having
        for (var i = 0; i < TodaysSubjects.length; i++) {
          var Subject = TodaysSubjects[i];
          var SubjectName = TodaysSubjects[i][0];
          var SubjectTeacher = TodaysSubjects[i][1];
          var SubjectClassroom = TodaysSubjects[i][2];

          if (SubjectTeacher == "") {SubjectTeacher = "Нейзвестный";}
          if (SubjectClassroom == "") {SubjectClassroom = "Нейзвестный";}

          if (!SubjectName == "") { 
            if(i===0){items[dayOfTheWeek] = [];}       
            items[dayOfTheWeek].push(
              "<li class='somo-la-leo'>"+
                // " Subject: " + TodaysSubjects[i][0] + ", " +
                "<p class='kuhusu-somo'>" + " Предмет: "+"<span class='bolder somo'>" + SubjectName +"</span>" + ", " + "</p>" + 
                // " Teacher: " + TodaysSubjects[i][1] + ", " +
                "<p class='kuhusu-somo'>" + " Преподаватель: "+"<span class='bolder mwalimu'>" + SubjectTeacher +"</span>" + ", " + "</p>" +
                // " Where: " + TodaysSubjects[i][2] + "." +
                "<p class='kuhusu-somo'>" + " Аудитория: "+"<span class='bolder darasa'>" + SubjectClassroom +"</span>" + "." + "</p>" +
              "</li>"
              ); 
          }else{ 
            items[dayOfTheWeek].push("<li class='somo-la-leo free-para'> Free to Party !!! </li>");
          }        
        }

          //Append the html and class details for similar stylings like in the wiki
          addDoubleDiv ();
          $("div.todays-classes div.todays-classes-2:last").append('<h4>This day'+ "'" + 's classes are: </h4>')

        $( "<ol/>", {
            "class": "todays-subjects",
            html: items[dayOfTheWeek].join( "" ),
          }).appendTo( "div.todays-classes div.todays-classes-2:last" );
      }
      else{
        if(weekday[dayOfTheWeek] == "Saturday"){
          //if the day is a free one and it is a saturday
          addDoubleDiv ();
          $( "<h4/>", {
              "class": "rest-saturday",
              text: "Supercool that there are no classes today. Enjoy resposibly."
            }).appendTo( "div.todays-classes div.todays-classes-2:last" );
          $('div.row.todays-classes:last').addClass("saturday");

        }
        else{
          addDoubleDiv ();
          $( "<h4/>", {
            "class": "rest-weekday",
             text: "Today is a day to sleep."  
          }).appendTo( "div.todays-classes div.todays-classes-2:last" );
          $('div .row.todays-classes:last').addClass("freeday");
        }
      }
    }

        //special case for sunday

        //FIX BUG

        var theMonday = new Date(d.getTime() - (d.getDay() - 1) * 24 * 60 * 60 * 1000);
        var currentDate = new Date(theMonday.getTime() + (7-1) * 24 * 60 * 60 * 1000);
        $('#timetable-app').append('<div class="row todays-classes"><div class="col-md-10 col-md-offset-1 todays-classes-2">' +
                  '<h3>This is a <span class="day">' + weekday[0] + '</span>' + ' of the ' + weekNumber + ' </h3>' +
                  '<h3>' + monthName[currentDate.getMonth()] + ', ' + currentDate.getDate() + '</h3>' +
                '</div> </div>');
        $( "<h4/>", {
            "class": "rest-sunday",
            text: "You just need to relax and take it easy."
          }).appendTo( "div.todays-classes div.todays-classes-2:last" );
          $('div .row.todays-classes:last').addClass("sunday");


  });

      
      $('.input-group.date').datepicker({
        format: "dd/mm/yyyy",
        startDate: "01-09-2016",
        endDate: "31-12-2016",
          maxViewMode: 1,
          clearBtn: true,
          autoclose: true,
          todayHighlight: true
      });

      $( "#go-to-date" ).click(function() {
        var gtd = $( "#go-to-date" );
          if (gtd.val() != "") {
            gtdDateArray = gtd.val().split('/');
            var dd = gtdDateArray[0];
            var mm = gtdDateArray[1] - 1;
            var yy = gtdDateArray[2];
            gtdDate = new Date(yy, mm, dd);

            $('#go-to-date-div').append('<h1>Today is ' + gtdDate + ' </h1>');
          console.log( gtdDate );
          }
      });  

});
