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

To give it a go here are links to the Android and webOS phone apps, respectively:

[http://mindkitchenmedia.com/apps/webji/webji.apk](http://mindkitchenmedia.com/apps/webji/webji.apk)  
[http://mindkitchenmedia.com/apps/webji/webji.ipk](http://mindkitchenmedia.com/apps/webji/webji.ipk)

That is, if you're inclined to trust that they're safe--I promise they are! I'll be getting the source for them rolled out onto Github soon. But I plan on redoing the webOS app with PhoneGap to simplify things before I toss it up here. Then there's only one codebase to deal with, in addition to being able to support more mobile platforms beyond webOS and Android.

Alternatively, you could just curl input into the server this way:

	curl "http://webji.heroku.com/input?x=123&y=123"

And "NEW FOR 2014!!!" here's an implementation of the client that works in browsers that support Device Orientation events:

[https://rawgithub.com/randallagordon/webji/master/public/client.html](https://rawgithub.com/randallagordon/webji/master/public/client.html)
