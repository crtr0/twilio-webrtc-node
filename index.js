var http = require('http')
  , static = require('node-static')
  , url = require('url')
  , twilio = require('twilio');

file = new static.Server('./public');

http.createServer(function(request, response) {
  request.addListener('end', function () {
    var hash = url.parse(request.url, true);
    if (hash.pathname === '/message') {
      var twiml = new twilio.TwimlResponse();
      twiml.message(function() {
        this.body("Thanks for helping me out with my talk. Here's a funny JavaScript joke for you. Love, Carter");
        this.media('http://' + request.headers['host'] + '/img/joke.jpg');
      });
      response.writeHead(200, {'content-type': 'text/xml'});
      response.end(twiml.toString());
    }
    else if (hash.pathname === '/random') {
      var client = new twilio.RestClient(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
      client.messages.list({'To': 'yyy'}, function(err, data) {
        random = data.messages[Math.floor(Math.random() * data.messages.length - 1)];
        var twiml = new twilio.TwimlResponse();
        twiml.dial({'callerId': 'yyy'}, function() {
          this.number(random.from);
        });
        response.writeHead(200, {'content-type': 'text/xml'});
        response.end(twiml.toString());        
      });
    }
    else if (hash.pathname === '/token') {
      var capability = new twilio.Capability(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
      capability.allowClientOutgoing('APxxx');
      response.end(capability.generate());
    }
    else {
      file.serve(request, response);
    }
  }).resume();
}).listen(process.env.PORT || 3000);
console.log("Listening on port ", process.env.PORT || 3000);

