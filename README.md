# Twilio + WebRTC + Web Audio API = Awesome

## Setup

`git clone <this repo>`

`npm install`

```
export TWILIO_ACCOUNT_SID=YOUR_ACCOUNT_SID
export TWILIO_AUTH_TOKEN=YOUR_AUTH_TOKEN
```

## Get the app on the public Internet

###Option #1

Deploy to the hosting provider or PaaS of choice. Remember to replicate the environment variables to your production environment.

###Option #2

Use a tool like [Ngrok](http://ngrok.com) to tunnel localhost.

## View the Presentation

Go to http://yourdomain/index.html in your browser.

## Connect it to Twilio

1. Sign-up for a [free Twilio account](http://twilio.com/try-twilio)
2. Purchase a new Twilio number or use the one you are given
3. Set your `Messaging Request URL` to `http://yourdomain/sms` and `HTTP GET`.

## Send and Recieve SMS

Send a text message to your new Twilio number. You should get a canned response. Have a few people send a text to that phone number as well.

## Meta 

* No warranty expressed or implied.  Software is as is.
* [MIT License](http://www.opensource.org/licenses/mit-license.html)
* Made with ♥ by [Twilio](http://www.twilio.com) Seattle


