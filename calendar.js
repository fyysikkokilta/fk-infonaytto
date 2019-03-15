// HUOM! Kalenteria vastaava markup pitää laittaa
// calendar.html-tiedostoon, jos määrä muuttuu.
var cids = [
    'milan.kacurak@gmail.com',
    'milan.kacurak@gmail.com',
];
var keys = [
    'AIzaSyCR3-ptjHE-_douJsn8o20oRwkxt-zHStY',
    'AIzaSyCR3-ptjHE-_douJsn8o20oRwkxt-zHStY',
];
var titles = [
    'Test',
    'Test2',
];

//calendarUrl: 'https://www.googleapis.com/calendar/v3/calendars/milan.kacurak@gmail.com/events?key=AIzaSyCR3-ptjHE-_douJsn8o20oRwkxt-zHStY',
function printCalendar(cid, key, title, index) {
    formatGoogleCalendar.init({
      calendarUrl: 'https://www.googleapis.com/calendar/v3/calendars/' + cid + '/events?key=' + key,
      past: false,
      upcoming: true,
      sameDayTimes: true,
      dayNames: true,
      pastTopN: -1,
      upcomingTopN: 10,
      recurringEvents: true,
      itemsTagName: 'li',
      upcomingSelector: '#calendar' + index,
      pastSelector: '#events-past',
      upcomingHeading: '<h2>' + title + '</h2>',
      format: ['*date*', ': ', '*summary*', ' — ', '*description*', ' in ', '*location*'],
      timeMin: '2016-06-03T10:00:00-07:00',
      timeMax: '2020-06-03T10:00:00-07:00'
    });
}
var i;
for (i = 0; i < cids.length; i++) {
    printCalendar(cids[i], keys[i], titles[i], i);
}
