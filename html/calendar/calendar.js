// HUOM! Kalenteria vastaava markup pitää laittaa
//TODO: split across multiple HTML pages, doesn't fit on one page
// calendar.html-tiedostoon, jos määrä muuttuu.
var cids = [
    'u6eju2k63ond2fs7fqvjbna50c@group.calendar.google.com',
    '0p9orculc8m8ocnfec11mb6ksk@group.calendar.google.com',
    'guqva296aoq695aqgq68ak7lkc@group.calendar.google.com',
    'hjhvblcv9n1ue3tf29j3loqqi4@group.calendar.google.com',
    '0orqvov2gidl3m24cnsq4ml1ao@group.calendar.google.com',
    'ahe0vjbi6j16p25rcftgfou5eg@group.calendar.google.com',
    'ji339ebgiaauv5nk07g41o65q8@group.calendar.google.com',
];
var keys = [
    'AIzaSyAwPCF5apsMfeIHQpYyteYnh9C5ltBT960',
    'AIzaSyAwPCF5apsMfeIHQpYyteYnh9C5ltBT960',
    'AIzaSyAwPCF5apsMfeIHQpYyteYnh9C5ltBT960',
    'AIzaSyAwPCF5apsMfeIHQpYyteYnh9C5ltBT960',
    'AIzaSyAwPCF5apsMfeIHQpYyteYnh9C5ltBT960',
    'AIzaSyAwPCF5apsMfeIHQpYyteYnh9C5ltBT960',
    'AIzaSyAwPCF5apsMfeIHQpYyteYnh9C5ltBT960',
];
var titles = [
    'Fuksit',
    'Isojutut',
    'Kokoukset',
    'Fk kulttuuri',
    'Liikunta',
    'Tapahtumat',
    'Ura ja opinnot',
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
      upcomingTopN: 3,
      recurringEvents: true,
      itemsTagName: 'li',
      upcomingSelector: '#calendar' + index,
      upcomingHeading: '<h2>' + title + '</h2>',
      format: ['*date*', ':&nbsp', '*summary*'/*, ' — ', '*description*', ' @ ', '*location*'*/],
      timeMin: '2016-06-03T10:00:00-07:00',
      timeMax: '2020-06-03T10:00:00-07:00'
    });
}
var i;
for (i = 0; i < cids.length; i++) {
    printCalendar(cids[i], keys[i], titles[i], i);
}

leftpos = 0;
function direction() {

}

rightEvents = document.getElementById('sec1');
leftEvents = document.getElementById('sec0');

timerInterval = 10;
waitTime = 3000;

rightpos = 0;
rightMax = -50;
rightStep = 1;
rightWaiting = false;
function move_right() {
    notVisible = $(window).height() - rightEvents.offsetHeight;
    if (notVisible < 0) {
        rightMax = notVisible;
    }
    else return

    if (rightWaiting) return

    if (rightpos == rightMax || rightpos == 0) {
        rightStep = -rightStep;
        rightWaiting = true;
        setTimeout(function(){rightWaiting = false;}, waitTime);
    }
    rightpos += rightStep;
    rightEvents.style.top = rightpos + 'px';
}

leftpos = 0;
leftMax = -50;
leftStep = 1;
leftWaiting = false;
function move_left() {
    notVisible = $(window).height() - leftEvents.offsetHeight;
    if (notVisible < 0) {
        leftMax = notVisible;
    }
    else return

    if (leftWaiting) return

    if (leftpos == leftMax || leftpos == 0) {
        leftStep = -leftStep;
        leftWaiting = true;
        setTimeout(function(){leftWaiting = false;}, waitTime);
    }
    leftpos += leftStep;
    leftEvents.style.top = leftpos + 'px';
}

// Move if overflowing
setInterval(move_left, timerInterval);
setInterval(move_right, timerInterval);
