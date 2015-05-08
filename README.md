# Twilio + WebRTC + Web Audio API = Awesome

## Setup

```
git clone <this repo>
npm install
export TWILIO_ACCOUNT_SID=YOUR_ACCOUNT_SID
export TWILIO_AUTH_TOKEN=YOUR_AUTH_TOKEN
npm start
```

## Get the app on the public Internet

###Option #1

Deploy to the hosting provider or PaaS of choice. Remember to replicate the environment variables to your production environment.

###Option #2

Use a tool like [Ngrok](http://ngrok.com) to tunnel localhost.

## View the Presentation

Go to http://yourdomain/ in your browser.

## Connect it to Twilio

1. Sign-up for a [free Twilio account](http://twilio.com/try-twilio)
2. Purchase a new Twilio number or use the one you are given
3. Set your `Messaging Request URL` to `http://yourdomain/message` and `HTTP GET`.

## Send and Recieve SMS

Send a text message to your new Twilio number. You should get a canned response. Have a few people send a text to that phone number as well.

## Call a random from your browser!

Create a new [TwiML app](https://www.twilio.com/user/account/apps/add). Give it a name and set the `Voice Request URL` to `http://yourdomain/random`. Save the TwiML app and copy the App SID.

Edit `index.js` and paste the App SID into line 34. Save `index.js` and restart your Node process.

Go to slide 12 and open up the JavaScript console. Enter the following commands:

```
$.ajax('/token').done(function(data) { Twilio.Device.setup(data); });
Twilio.Device.connect(function(conn) { console.log(conn); window.stream = conn.mediaStream.stream; });
Twilio.Device.connect();
```

When the browser asks for permission to access your microphone, say "Accept". Your browser will then dial a random person who sent you an SMS earlier and you'll be connected. Say "hi" to your friend.

## Visualize the call!

Ok, don't hang up! Now it's time to visualize the call. Go to slide 13. In the JS console:

`visualizeMediaStream(window.stream);`

You should see a lovely visualization of the audio in your microphone. Enjoy!

## Meta 

* No warranty expressed or implied.  Software is as is.
* [MIT License](http://www.opensource.org/licenses/mit-license.html)
* Made with ♥ by [Twilio](http://www.twilio.com) Seattle


