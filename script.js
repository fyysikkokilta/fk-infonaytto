var index = 0;
var urls = ["https://fyysikkokilta.fi", "https://www.example.com"];

//function newSite() {
//    $('#myIframe').fadeOut(1500, changeSite).fadeIn();
//        //function() {
//        //alert("lors!");
//        //changeSite;
//        //$('#myIframe').
//        //src = urls[index];
//        //index = (index + 1) % urls.length;
//        //$('#myIframe').src = "https://fyysikkokilta.fi";
//    //}).fadeIn(1500);
//}

function newSite() {
    //$('#myIframe').fadeToggle(1000);
    $('#myIframe').src = urls[index];
    //$('#myIframe').fadeToggle(1000);
    index = (index + 1) % urls.length;
}

//function changeSite() {
//    $('#myIframe').src = urls[index];
//    index = (index + 1) % urls.length;
//    alert("vittufak!");
//}

//$(document).ready(function () {
//    $('#myIframe').fadeIn(1000);
//});

setInterval ( newSite, 5000);

//$(function() {
//    $('body').removeClass('fade-out');
//});

//window.alert("Jee toimin!")
//
//var urls = ["https://fyysikkokilta.fi", "https://www.example.com"];
//var index = 0;
//
//for (j = 0; j < 5; j++) {
//    setTimeout(function() {
//        window.alert(j);
//        //window.location.href = "https://www.example.com";
//    }, 3000);
//};
    //setTimeout(function() {
    //    window.alert(i);
    //    //window.location.href = "https://www.example.com";
    //}, 3000);
//}
//setTimeout(function() {
//    window.location.href = "https://www.example.com";
//}, 3000);

// jotenkin kokoaa joukon urleja
// loopaa niiden läpi
// ajan x jälkeen vaihtaa sivua
// feidaa sivun sillain nätisti




// Sets the new location of the current window.
//window.location = "https://www.example.com";
 
// Sets the new href (URL) for the current window.
// window.location.href = "https://www.example.com";
 
// Assigns a new URL to the current window.
//window.location.assign("https://www.example.com");
// 
//// Replaces the location of the current window with the new one.
//window.location.replace("https://www.example.com");
// 
//// Sets the location of the current window itself.
//self.location = "https://www.example.com";
// 
//// Sets the location of the topmost window of the current window.
//top.location = "https://www.example.com";

