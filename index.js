"use strict";

var path = require("path");

var Webji = require("./lib/webji");
var webji = new Webji();

var Hapi = require("hapi");
var Joi = require("joi");

var server = new Hapi.Server(8080,
  {
    views: {
      engines: {
        hbs: require("handlebars"),
      },
      path: path.join(__dirname, "/views"),
    }
  }
);

var handleInput = function (request, reply) {
  webji.updatePosition(request.query);
  reply(request.query);
};

server.route([
  { method: "GET", path: "/{path*}", handler: { directory: { path: "./public", listing: false, index: true } } },
  {
    method: "GET",
    path: "/",
    handler: function (request, reply) {
      reply.view("index", {
        position: webji.position,
        board: webji.board
      });
    },
  },
  {
    method: "GET",
    path: "/pos",
    handler: function (request, reply) {
      reply(webji.position);
    },
  },
  {
    method: "GET",
    path: "/input",
    handler: handleInput,
    config: {
      validate: {
        query: {
          x: Joi.number(),
          y: Joi.number()
        }
      }
    },
  }
]);

if (!module.parent) {
  server.start(function () {
    console.log("webji started at %s", server.info.uri);
  });
}

module.exports = server;
