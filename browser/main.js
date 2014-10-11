/* global actualSize, fullSize */
"use strict";

var domready = require("domready");
var screenfull = require("screenfull");
var through = require("through");
var reconnect = require("reconnect/shoe");

reconnect(function (stream) {
  stream.pipe(through(function (data) {
    data = JSON.parse(data);

    movePlanchette(scalePosition(data.position, fullSize, actualSize));
    $("#numClients").text("Others: " + data.numClients);
  }));

  window.addEventListener("deviceorientation", function(e) {
    // Motion assumes device is rotated landscape counter-clockwise,
    // otherwise known as  "landscape-primary" in the Screen Orientation API
    var gyroX = Math.round( e.beta );
    var gyroY = Math.round( e.gamma );

    stream.write(JSON.stringify({
      x: gyroX,
      y: gyroY
    }));
  });
}).connect("/sock");

var scalePosition = function (position, fullSize, actualSize) {
  return {
    x: position.x / (fullSize.w / actualSize.w),
    y: position.y / (fullSize.h / actualSize.h),
  };
};

var movePlanchette = function (pos) {
  $("#planchette").animate({
    left: pos.x + "px",
    top: pos.y + "px",
  }, 245);
};

var exitFullscreen = function () {
  screenfull.exit();

  document.removeEventListener("click", exitFullscreen);
  document.addEventListener("click", goFullscreen);
};

var goFullscreen = function () {
  if(screenfull.enabled) {
    var handleFullscreen = function () {
      document.removeEventListener(screenfull.raw.fullscreenchange, handleFullscreen);

      document.removeEventListener("click", goFullscreen);
      document.addEventListener("click", exitFullscreen);

      screen.orientation.lock("landscape-primary");
    };
    document.addEventListener(screenfull.raw.fullscreenchange, handleFullscreen);

    screenfull.request();
  }
};

domready(function () {
  var resizePlanchette = function (fullSize, actualSize) {
    $("#planchette img").width(1 / (fullSize.w / actualSize.w) * 100 + "%");
  };

  var sizer = function () {
    actualSize = { w: $("#board").width(), h: $("#board").height() };
    resizePlanchette(fullSize, actualSize);
  };

  // Bind to events and run once for initialization
  $("#board").on("load", sizer);
  $(window).resize(sizer);
  sizer();

  // Handle device orientation
  var handleOrientation = function () {
    if (screen.orientation && screen.orientation.type !== "landscape-primary") {
      $("#rotate-notice").show();
    } else {
      $("#rotate-notice").hide();
    }
  };

  if(screen.orientation) {
    screen.orientation.addEventListener("change", handleOrientation);
  }

  handleOrientation();

  // Listen for clicks to go fullscreen and lock orientation
  document.addEventListener("click", goFullscreen);
});
