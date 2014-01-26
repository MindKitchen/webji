Webji
=====

A multiplayer "Ouija/spirit/talking board" game implemented using Sinatra.


Background
----------

From the day I learned phones with HDMI ports were going to be a reality, I've been intrigued by the concept of using them as a sort of mobile console. Unfortunately, such a device wasn't out yet, and I still don't have one now that they are, so I took another route: Create a webapp that serves up a "console view" appropriate for display via an HTPC (or anything with a decent browser, obviously) and use individual phones as controllers to create an ad hoc gaming experience.

In this case, Webji uses accelerometer data which is passed to the server from a native app running on an Android or webOS device. Since the data is persistent on the server, every client "console" gets the same view and every "controller" just blindly sends accelerometer data. The more "controllers" are connected, the more wild it gets; a scalar of some sort would need to be implemented to handle a large number of clients.

But my goal was to show how dead simple it really is to do this, in hopes that others might build off the concept. Hence, the bare bones example that is Webji! There's only just over 30 lines of necessary code for the server, not even that for the client and controller apps depending how you count. Getting a little more creative, this could be expanded into a card game where the "console" view is the dealer's table and each "controller" app allows players to privately view their hand and determine their next action. And the only reason this required native apps was for accelerometer access--and Google has demoed hardware access via the Android browser, so eventually Webji could be 100% web app.

Plus, the way the AJAX calls work could stand be cleaned up. The current state evolved out of earlier testing of just sending all the raw accelerometer data from my Pre and dumping it to another client.

Links
-----

Live demo:

[http://webji.heroku.com/](http://webji.heroku.com/)

Optimally, try loading the site on a TV as a display and then controlling it from a phone or tablet. The orientation data does not take screen rotation orientation into account, so it is currently assumed that you're viewing it in portrait mode on the controlling device.

Note, I've only tried this in Android Chrome and there may be variences in how some browsers return the orientation data.
