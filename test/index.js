"use strict";

var Lab = require("lab");

var server = require("../");

Lab.experiment("Stuff", function() {
  Lab.test("Things are thingy", function (done) {
    var options = {
      method: "GET",
      url: "/",
    };

    server.inject(options, function (response) {
      var result = response.result;

      Lab.expect(response.statusCode).to.equal(200);

      done();
    });
  });
});
