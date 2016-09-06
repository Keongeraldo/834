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


console.log(d.getWeek());

console.log( "Today is " + weekday[d.getDay()]);



$('.todays-classes h3 #day').text(weekday[d.getDay()] + ', ' + monthName[d.getMonth()] + ' ' + d.getDate());


$('#todays-subjects').append().html(
	'<li> something </li>'


	// WRITE A SCRIPT TO TAKE DATA FROM THE JSON AND DISPLAY THEM HERE.




	);