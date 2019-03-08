//TODO: lörssiä tähän, star-wars tyyliset star wipet (fiin muotoinen star wipe), övereimmät powerpoint spinnaukset

/*
 * spin + scale + fade effect like newspaper in the Simpsons
 * options:
 *      angle: float - apply this much rotation to the element when it disappears or start from this angle when appearing
 *      scale: float - scale to this value when disappearing or start with this scale when appearing
 */
$.effects.define( "spin", "toggle", function( options, done ) {
  var show = options.mode === "show";
  var angle = options.hasOwnProperty("angle") ? options["angle"] : 360;
  var scale = options.hasOwnProperty("scale") ? options["scale"] : 0.5;

  var currentAngle = show ? angle : 0;
  var currentScale = show ? scale : 1;

  console.log("-webkit-transform: ", $(this).css("-webkit-transform"));

  // see https://stackoverflow.com/a/5463375
  $( this )
    //.css("--scale", show ? scale : 1)
    .css( {
        opacity: show ? 0 : 1,
    } )
    .each(function() { this.scale = currentScale; }) // set initial value for scale this way, https://stackoverflow.com/questions/17038511/jquery-animate-step-function-with-attribute-value-initialization
    .animate( {
      opacity: show ? 1 : 0,
      angle: show ? 0 : angle,
      scale: show ? 1 : scale,
    }, {
      queue: false,
      duration: options.duration,
      easing: options.easing,
      complete: done,
      step: function(now, fx) {
        if(fx.prop == "angle") {
          currentAngle = now;
        }
        if(fx.prop == "scale") {
          currentScale = now;
        }
        var transform = "";
        transform += "rotate(" + currentAngle + "deg)";
        transform += " scale(" + currentScale + ")";
        console.log("transform", transform);
        $(this).css("-webkit-transform", transform);
      }
    } );
} );


// list of all possible transitions
var transitionEffectsWeighted = [
    //[{effect: "blind", duration: "slow"},                       1],
    //[{effect: "bounce", distance: 100, times: 5, duration: 1000},   1],
    //[{effect: "clip", duration: "slow"},                        1],
    //[{effect: "drop", direction: "left", duration: "slow"},     0.25],
    //[{effect: "drop", direction: "right", duration: "slow"},    0.25],
    //[{effect: "drop", direction: "up",   duration: "slow"},     0.25],
    //[{effect: "drop", direction: "down", duration: "slow"},     0.25],
    ////[{effect: "explode", duration: "slow"},   1], // doesn't work with 100% scale iframes, see https://stackoverflow.com/questions/13290086/jquery-explode-effect-not-working-with-percentage-width-height
    //[{effect: "fade", duration: "slow"},                        1],
    //[{effect: "fold", size: "10%", horizFirst: true, duration: "slow"},     0.5],
    //[{effect: "fold", size: "10%", horizFirst: false, duration: "slow"},    0.5],
    ////[{effect: "highlight", duration: "slow"}, 1], // doesn't seem to work really well
    ////[{effect: "puff", percent: 200, duration: "slow"},      1], // doesn't work with 100% widths..
    //[{effect: "pulsate", times: 10, duration: 1000},   0.1], // MAXIMUM EPILEPSY, good idea?
    ////[{effect: "shake", direction: "left", distance: 100, duration: "slow"},     1], // pretty dumb
    ////[{effect: "shake", direction: "up", distance: 100, duration: "slow"},     1], // pretty dumb
    //// effect: "size" is ~the same as effect: "scale"
    //[{effect: "size", scale: "box", origin: ["top", "left"], duration: "slow"},         0.2],
    //[{effect: "size", scale: "box", origin: ["top", "right"], duration: "slow"},        0.2],
    //[{effect: "size", scale: "box", origin: ["bottom", "right"], duration: "slow"},     0.2],
    //[{effect: "size", scale: "box", origin: ["bottom", "left"], duration: "slow"},      0.2],
    //[{effect: "size", scale: "box", origin: ["middle", "center"], duration: "slow"},    0.2],
    //[{effect: "slide", direction: "left", duration: "slow"},    0.25],
    //[{effect: "slide", direction: "right", duration: "slow"},   0.25],
    //[{effect: "slide", direction: "up",   duration: "slow"},    0.25],
    //[{effect: "slide", direction: "down", duration: "slow"},    0.25],
    [{effect: "spin", angle: 270, scale: 0.1, duration: "slow"},    0.5],
    [{effect: "spin", angle: -270, scale: 0.1, duration: "slow"},    0.5],
];
