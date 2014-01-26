$(function() {
  var hasOrientation = false;
  var gyroX = gyroY = 0;

  window.addEventListener( "deviceorientation", function(e) {
    hasOrientation = true;
    gyroX = Math.round( e.gamma ),
    gyroY = Math.round( -e.beta );

    var output = "<h3>Orientation</h3>" +
                 "<p>Gamma: " + Math.round( e.gamma ) + "</p>" +
                 "<p>Beta: "  + Math.round( e.beta  ) + "</p>";

    var outputEl = document.getElementById( "output" )
    if( outputEl ) { outputEl.innerHTML = output; }
  });

  setInterval(function () {
    if (hasOrientation) {
      $.get( "/input?x=" + gyroX + "&y=" + gyroY );
    }
  }, 250); // Update every 250ms
});
