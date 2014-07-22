"use strict";

function Webji() {
  this.position = {
    x: 960,
    y: 540
  };

  this.offset = {
    x: 100,
    y: 122
  };

  this.board = {
    w: 1920,
    h: 1080
  };

  this.scale = 10;
}

Webji.prototype.updatePosition = function(newPosition) {
  this.position.x += newPosition.x / this.scale;
  this.position.y -= newPosition.y / this.scale;

  if (this.position.x > this.board.w) {
    this.position.x = this.board.w;
  }

  if (this.position.x < 0) {
    this.position.x = 0;
  }

  if (this.position.y > this.board.h) {
    this.position.y = this.board.h;
  }

  if (this.position.y < 0) {
    this.position.y = 0;
  }
};

Webji.prototype.offsetPosition = function () {
  return {
    x: this.position.x - this.offset.x,
    y: this.position.y - this.offset.y
  }
};

module.exports = Webji;
