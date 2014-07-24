Webji
=====

A multiplayer "Ouija/spirit/talking board" game implemented using [hapi](https://github.com/spumko/hapi) and [shoe](https://github.com/substack/shoe)

Background
----------

From the day I learned phones with HDMI ports were going to be a reality, I've been intrigued by the concept of using them as a sort of mobile console. Unfortunately, such a device wasn't out yet, so I took another route: Create a webapp that serves up a "console view" appropriate for display via an HTPC (or anything with a decent browser) and use individual phones as controllers to create an ad hoc gaming experience.

In this case, Webji uses accelerometer data which is passed to the server via WebSockets. Since the data is persistent on the server, every client "console" gets the same view and every "controller" just blindly sends accelerometer data. The more "controllers" are connected, the more wild it gets!

Try it out!
-----

[http://webji.heroku.com/](http://webji.heroku.com/)

Optimally, try loading the site on a TV as a display and then controlling it from a phone or tablet. Also, please lock your screen orientation! It is assumed that you're viewing it in portrait mode on the controlling device. 

Note, there are variances in the data some browsers emit for orientation, so oddness may occur!
