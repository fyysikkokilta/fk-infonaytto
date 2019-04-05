//TODO: lörssiä tähän, star-wars tyyliset star wipet (fiin muotoinen star wipe), övereimmät powerpoint spinnaukset
//see https://www.youtube.com/watch?v=cGqAu9gj_F0

/*
 * spin + scale + fade effect like newspaper in the Simpsons, except 3D
 * options:
 *      angle: float - apply this much rotation to the element when it disappears or start from this angle when appearing
 * options:
 *      scale: float - scale to this value when disappearing or start with this scale when appearing
 *      angleX: apply this much rotation to the element about the X axis (axis horizontal on screen) when it disappears or start from this angle when it appears
 *      angleY: same as X but rotate around Y axis (axis vertical on screen)
 *      angleZ: same as X but rotate around Z axis (axis pointing outwards from screen)
 */
$.effects.define("spin3d", "toggle", function( options, done ) {
  var show = options.mode === "show";
  var scale = options.hasOwnProperty("scale") ? options["scale"] : 0.5;
  var angleZ = options.hasOwnProperty("angleZ") ? options["angleZ"] : 360;
  var angleY = options.hasOwnProperty("angleY") ? options["angleY"] : 180;
  var angleX = options.hasOwnProperty("angleX") ? options["angleX"] : 0;

  var currentScale = show ? scale : 1;
  var currentAngleZ = show ? angleZ : 0;
  var currentAngleY = show ? angleY : 0;
  var currentAngleX = show ? angleX : 0;

  $( this )
    .css( {
        opacity: show ? 0 : 1,
    } )
    .each(function() { this.scale = currentScale; }) // set initial value for scale this way, https://stackoverflow.com/questions/17038511/jquery-animate-step-function-with-attribute-value-initialization
    .animate( {
      opacity: show ? 1 : 0,
      angleX: show ? 0 : angleX,
      angleY: show ? 0 : angleY,
      angleZ: show ? 0 : angleZ,
      scale: show ? 1 : scale,
    }, {
      queue: false,
      duration: options.duration,
      easing: options.easing,
      complete: done,
      step: function(now, fx) {
        if(fx.prop == "angleZ") {
          currentAngleZ = now;
        }
        if(fx.prop == "angleY") {
          currentAngleY = now;
        }
        if(fx.prop == "angleX") {
          currentAngleX = now;
        }
        if(fx.prop == "scale") {
          currentScale = now;
        }
        var transform = "";
        transform += "rotateZ(" + currentAngleZ + "deg)";
        transform += "rotateY(" + currentAngleY + "deg)";
        transform += "rotateX(" + currentAngleX + "deg)";
        transform += " scale(" + currentScale + ")";
        //console.log("transform", transform);
        $(this).css("-webkit-transform", transform);
        //$(this).css("transform", transform);
      }
    } );

});

/*
 * star wipe
 * no options
 */
$.effects.define( "starwipe", "toggle", function( options, done ) {
  var show = options.mode === "show";

  const pi = Math.PI;

  var origin = [this.offsetWidth / 2, this.offsetHeight /2];
  //console.log(origin);

  // the ratio of the tip of the star to the corner of the inner pentagon
  const innerRadiusRatio = Math.sin(pi/10.) / Math.sin(7. * pi / 10.);

  // the radius of the tips should be this big for the star to be completely outside
  // WTF JAVASCRIPT WHY IS MAX LIKE THIS
  const maxRadius = Math.max.apply(null, origin) / innerRadiusRatio * 1.2;

  //console.log(origin, maxRadius);

  // vertices of star
  var vertices = [];
  [0, 1, 2, 3, 4].forEach(function(i) {
    // tip points
    var x =  Math.sin(i * 2 * pi / 5.0);
    var y = -Math.cos(i * 2 * pi / 5.0);
    //return [x, y];
    vertices.push([x, y]);
    // points on inner pentagon;
    var x1 =  Math.sin(i * 2 * pi / 5.0 + pi / 5.0) * innerRadiusRatio;
    var y1 = -Math.cos(i * 2 * pi / 5.0 + pi / 5.0) * innerRadiusRatio;
    vertices.push([x1, y1]);
  });

  //console.log("starWipe:", show ? "show" : "hide");

  function get_vertices_str(radius) {
    var ret = "polygon(" + vertices.map(function(xy) {
      return (radius * xy[0] + origin[0]) + "px " + (radius * xy[1] + origin[1]) + "px";
    }).join(", ") + ")";
    return ret;
  }

  var vertices_str_start = get_vertices_str(0);
  var vertices_str_final = get_vertices_str(maxRadius);

  // reference for clip path animation: https://codepen.io/damianocel/pen/KdobyK

  const originalClipPath = $(this).css("clip-path");
  // apply initial clip path
  $(this)
    .css({
      "transition": "all " + options.duration + "ms linear",
      "clip-path": show ? vertices_str_start : vertices_str_final,
    }).css("clip-path"); // this needs to be here, otherwise doesn't work...

  // apply final clip path, CSS3 takes care of the animation
  $(this).css("clip-path", show ? vertices_str_final : vertices_str_start);

  const t = this;
  setTimeout(function() {
    // wait for the animation to finish

    $(t).css({"clip-path": originalClipPath}); // clear up clip path in the end

    //console.log("done");
    done();
  }, 1.0*options.duration);

} );

/*
 * clock wipe, using jQuery.Keyframes library
 * options:
 *      duration: duration in ms
 *      clockwise: boolean indicating wipe direction (false for counterclockwise) (default true)
 *      initialAngle: angle in degrees from where the clock wipe starts (0 for 12 o'clock, 180 for 6 o'clock)
 */
$.effects.define( "clockwipe", "toggle", function( options, done ) {
  var show = options.mode === "show";
  var clockwise = options.hasOwnProperty("clockwise") ? options["clockwise"] : true;
  var initialAngle = options.hasOwnProperty("initialAngle") ? options["initialAngle"] : 0;

  var origin = [this.offsetWidth / 2, this.offsetHeight /2];
  //console.log(origin);

  const maxRadius = Math.max.apply(null, origin) * 2;

  // vertices of circle surrounding object to be wiped
  var vertices = [];
  const n_vertices = 32;
  for(var i = 0; i <= n_vertices; i++) {
    var a = i * 1.0 / n_vertices;
    var x =  Math.sin((a + initialAngle / 360.0) * 2 * Math.PI);
    var y = -Math.cos((a + initialAngle / 360.0) * 2 * Math.PI);
    vertices.push([x, y]);
  }

  if(clockwise != show) {
    vertices.reverse();
  }

  vertices_keyframes = vertices.map(function(x, i) {
    return vertices.map(function(y, j) {
      return i < j ? x : y;
    });
  });

  if(!show) {
    vertices_keyframes.reverse();
  }

  function get_keyframe_obj(verts) {
    return {
      "clip-path": "polygon(" + origin[0] + "px " + origin[1] + "px, " + verts.map(function(xy) {
        return (xy[0] * maxRadius + origin[0]) + "px " + (xy[1] * maxRadius + origin[1]) + "px";
      }).join(", ") + ")"
    }
  }

  //console.log("vertices_keyframes", vertices_keyframes);

  var keyframes_obj = {name: "clockwipe"};
  vertices_keyframes.forEach(function(v, i) {
    var key = (i * 1.0 / (vertices_keyframes.length - 1) * 100) + "%";
    keyframes_obj[key] = get_keyframe_obj(v);
  });
  $.keyframe.define([keyframes_obj]);


  //TODO: undefine keyframe after finished? (is it even possible?)

  //console.log("clockWipe:", show ? "show" : "hide");

  const originalClipPath = $(this).css("clip-path");

  const t = this;

  $(this).playKeyframe({
    name: "clockwipe",
    duration: options.duration + "ms",
    timingFunction: "linear",
    complete: function() {
      $(t).css({"clip-path": originalClipPath}); // reset original clip path
      //console.log("done");
      return done();
    }
  });

});

// list of all possible transitions
var transitionEffectsWeighted = [
    [{effect: "blind", duration: "slow"},                       1],
    [{effect: "bounce", distance: 100, times: 5, duration: 1000},   1],
    [{effect: "clip", duration: "slow"},                        1],
    [{effect: "drop", direction: "left", duration: "slow"},     0.25],
    [{effect: "drop", direction: "right", duration: "slow"},    0.25],
    [{effect: "drop", direction: "up",   duration: "slow"},     0.25],
    [{effect: "drop", direction: "down", duration: "slow"},     0.25],
    //[{effect: "explode", duration: "slow"},   1], // doesn't work with 100% scale iframes, see https://stackoverflow.com/questions/13290086/jquery-explode-effect-not-working-with-percentage-width-height
    [{effect: "fade", duration: "slow"},                        1],
    [{effect: "fold", size: "10%", horizFirst: true, duration: "slow"},     0.5],
    [{effect: "fold", size: "10%", horizFirst: false, duration: "slow"},    0.5],
    //[{effect: "highlight", duration: "slow"}, 1], // doesn't seem to work really well
    //[{effect: "puff", percent: 200, duration: "slow"},      1], // doesn't work with 100% widths..
    [{effect: "pulsate", times: 10, duration: 1000},   0.05], // MAXIMUM EPILEPSY, good idea?
    //[{effect: "shake", direction: "left", distance: 100, duration: "slow"},     1], // pretty dumb
    //[{effect: "shake", direction: "up", distance: 100, duration: "slow"},     1], // pretty dumb
    // effect: "size" is ~the same as effect: "scale"
    [{effect: "size", scale: "box", origin: ["top", "left"], duration: "slow"},         0.2],
    [{effect: "size", scale: "box", origin: ["top", "right"], duration: "slow"},        0.2],
    [{effect: "size", scale: "box", origin: ["bottom", "right"], duration: "slow"},     0.2],
    [{effect: "size", scale: "box", origin: ["bottom", "left"], duration: "slow"},      0.2],
    [{effect: "spin3d", scale: 0., angleX : 0, angleY: 0, angleZ: 0, duration: "slow"}, 0.2], // this is better than 'size' with [middle, center].
    [{effect: "slide", direction: "left", duration: "slow"},    0.25],
    [{effect: "slide", direction: "right", duration: "slow"},   0.25],
    [{effect: "slide", direction: "up",   duration: "slow"},    0.25],
    [{effect: "slide", direction: "down", duration: "slow"},    0.25],

    [{effect: "spin3d", scale: 0, angleX : 0, angleY: 0 , angleZ :  360, duration : "slow"}, 0.5],
    [{effect: "spin3d", scale: 0, angleX : 0, angleY: 0 , angleZ : -360, duration : "slow"}, 0.5],
    [{effect: "spin3d", scale: 0, angleX : 180, angleY: 360, angleZ : 180, duration : 800},  0.2],
    [{effect: "spin3d", scale: 0.5, angleX : 0, angleY: 180, angleZ :  180, duration : 800}, 0.1],
    [{effect: "spin3d", scale: 0.5, angleX : 0, angleY: 180, angleZ : -180, duration : 800}, 0.1],
    [{effect: "spin3d", scale: 1.0, angleX : 0, angleY: 90, angleZ : 90, duration : 800},    0.2],
    [{effect: "spin3d", scale: 1.0, angleX : 90, angleY: 0, angleZ : -90, duration : 800},   0.1],
    [{effect: "spin3d", scale: 1.0, angleX : 90, angleY: 0, angleZ :  90, duration : 800},   0.1],
    [{effect: "spin3d", scale: 0, angleX : 180, angleY:  270, angleZ :  0, duration : 800},  0.2],
    [{effect: "spin3d", scale: 0, angleX : 180, angleY: -270, angleZ :  0, duration : 800},  0.2],

    [{effect: "starwipe", duration: 1000},    1],

    [{effect: "clockwipe", duration: 1500, clockwise: true},  0.45],
    [{effect: "clockwipe", duration: 1500, clockwise: false}, 0.15],
    [{effect: "clockwipe", duration: 1500, clockwise: true, initialAngle:  180}, 0.2],
    [{effect: "clockwipe", duration: 1500, clockwise: false, initialAngle: 180}, 0.2],
];
