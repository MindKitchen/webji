"use strict";

var path = require("path");

var Webji = require("./lib/webji");
var webji = new Webji();

var Hapi = require("hapi");
var Joi = require("joi");

var shoe = require("shoe");
var through = require("through");

// Websocket handling
var sock = shoe(function (stream) {
  var pulse = setInterval(function () {
    stream.write(JSON.stringify(webji.offsetPosition()));
  }, 250);

  stream.on("end", function () {
    clearInterval(pulse);
  });

  stream.pipe(through(function (p) {
    var newPosition = JSON.parse(p);
    webji.updatePosition(newPosition, clients.length);
  }))
});

// Client tracking
var clients = [];

sock.on("connection", function (connection) {
  clients.push(connection);
  console.log("Clients connected: ", clients.length, "\tScale factor: ", webji.scale * clients.length);

  connection.on("close", function () {
    clients.splice(clients.indexOf(connection), 1);
    console.log("Clients connected: ", clients.length);
  });
});

// Setup hapi
var server = new Hapi.Server(process.env.PORT || 4567,
  {
    views: {
      engines: {
        hbs: require("handlebars"),
      },
      path: path.join(__dirname, "/views"),
    }
  }
);

server.route([
  { method: "GET", path: "/{path*}", handler: { directory: { path: "./public", listing: false, index: true } } },
  {
    method: "GET",
    path: "/",
    handler: function (request, reply) {
      reply.view("index", {
        position: webji.offsetPosition(),
        board: webji.board
      });
    },
  },
  {
    method: "GET",
    path: "/pos",
    handler: function (request, reply) {
      reply(webji.offsetPosition());
    },
  },
  {
    method: "GET",
    path: "/input",
    handler: function (request, reply) {
      webji.updatePosition(request.query, clients.length);
      reply(request.query);
    },
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

// Start the show!
if (!module.parent) {
  server.start(function () {
    sock.install(server.listener, "/sock")

    console.log("webji started at %s", server.info.uri);
  });
}

module.exports = server;
