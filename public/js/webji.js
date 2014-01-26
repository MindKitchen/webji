"use strict";

var updatePosition = function () {
  $.getJSON("/pos", function (newPos) {
    pos = newPos;
  });
};

var scalePosition = function (position, fullSize, actualSize) {
  return {
    x: position.x / (fullSize.w / actualSize.w),
    y: position.y / (fullSize.h / actualSize.h),
  };
};

var resizePlanchette = function (fullSize, actualSize) {
  $("#planchette img").width(1 / (fullSize.w / actualSize.w) * 100 + "%");
};

var updateDOM = function (pos) {
  $("#planchette").animate({
    left: pos.x + "px",
    top: pos.y + "px",
  }, 245);
};

$(function () {
  $("#board").on("load", function () {
    actualSize = { w: $("#board").width(), h: $("#board").height() };
    resizePlanchette(fullSize, actualSize);
  });

  $(window).resize(function () {
    actualSize = { w: $("#board").width(), h: $("#board").height() };
    resizePlanchette(fullSize, actualSize);
  });

  setInterval(function () {
    updatePosition();
    updateDOM(scalePosition(pos, fullSize, actualSize));
  }, 250);

});
