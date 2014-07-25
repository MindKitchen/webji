"use strict";

var domready = require("domready");
var through = require("through");
var reconnect = require("reconnect/shoe");

reconnect(function (stream) {
  stream.pipe(through(function (data) {
    var data = JSON.parse(data);

    movePlanchette(scalePosition(data.position, fullSize, actualSize));
    $("#numClients").text("Others: " + data.numClients);
  }));

  window.addEventListener("deviceorientation", function(e) {
    var gyroX = Math.round( e.gamma );
    var gyroY = Math.round( -e.beta );

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
});
