$(function() {
  var gyroX = gyroY = 0;

  window.addEventListener( "deviceorientation", function(e) {
    dox = Math.round( e.gamma ),
    doy = Math.round( -e.beta );

    var output = "<h3>Orientation</h3>" +
                 "<p>Gamma: " + Math.round( e.gamma ) + "</p>" +
                 "<p>Beta: "  + Math.round( e.beta  ) + "</p>";

    var outputEl = document.getElementById( "output" )
    if( outputEl ) { outputEl.innerHTML = output; }
  });

  setInterval(function () {
    $.get( "/input?x=" + gyroX + "&y=" + gyroY );
  }, 250); // Update every 250ms
});
