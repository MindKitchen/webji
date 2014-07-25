"use strict";

var Lab = require("lab");

var server = require("../");

var Webji = require("../lib/webji");

Lab.experiment("Webji", function () {
  Lab.test("knows where the planchette is", function (done) {
    var webji = new Webji();
    Lab.expect(webji.position).to.exist;
    done();
  });

  Lab.test("knows how much to offset the planchette position", function (done) {
    var webji = new Webji();
    Lab.expect(webji.offset).to.exist;
    done();
  });

  Lab.test("knows how big the board is (in pixels)", function (done) {
    var webji = new Webji();
    Lab.expect(webji.board).to.exist;
    done();
  });

  Lab.test("knows how much to scale input values by", function (done) {
    var webji = new Webji();
    Lab.expect(webji.scale).to.exist;
    done();
  });

  Lab.test("knows how to update the planchette position", function (done) {
    var webji = new Webji();
    var initialPosition = require("util")._extend({}, webji.position);
    var inputPosition = { x: 50, y: 50 };
    var numClients = 5;
    webji.updatePosition(inputPosition, numClients);
    Lab.expect(webji.position.x).to.equal(initialPosition.x + inputPosition.x / (webji.scale * numClients));
    Lab.expect(webji.position.y).to.equal(initialPosition.y - inputPosition.y / (webji.scale * numClients));
    done();
  });

  Lab.test("knows how to offset the planchette position", function (done) {
    var webji = new Webji();
    var offsetPosition = webji.offsetPosition();
    Lab.expect(offsetPosition.x).to.equal(webji.position.x - webji.offset.x);
    Lab.expect(offsetPosition.y).to.equal(webji.position.y - webji.offset.y);
    done();
  });

  Lab.test("knows how to update the position with no clients attached (bots)", function (done) {
    var webji = new Webji();
    var initialPosition = require("util")._extend({}, webji.position);
    var inputPosition = { x: 50, y: 50 };
    var numClients = 1; // Detected and set inside the function
    webji.updatePosition(inputPosition, 0);
    Lab.expect(webji.position.x).to.equal(initialPosition.x + inputPosition.x / (webji.scale * numClients));
    Lab.expect(webji.position.y).to.equal(initialPosition.y - inputPosition.y / (webji.scale * numClients));
    done();
  });

});
