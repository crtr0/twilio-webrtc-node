var http = require('http')
  , static = require('node-static')
  , url = require('url')
  , twilio = require('twilio');

file = new static.Server('./public');

http.createServer(function(request, response) {
  request.addListener('end', function () {
    var hash = url.parse(request.url, true);
    if (hash.pathname === '/message') {
      twiml = new twilio.TwimlResponse();
      twiml.message(function() {
        this.body("Thanks for playing along. Hope you like this JavaScript joke!");
        this.media('http://1405ef22.ngrok.com/img/joke.jpg');
      });
      response.writeHead(200, {'Content-type': 'text/xml'});
      response.end(twiml.toString());
    }
    else if (hash.pathname === '/token') {
      var capability = new twilio.Capability();
      capability.allowClientOutgoing('APc11a96ef976afd91cd58ca11a9daf118');
      response.end(capability.generate());
    }
    else if (hash.pathname === '/random') {
      var client = new twilio.RestClient();
      client.messages.list({to: '+13059648570'}, function(err, result) {
        var random = result.messages[Math.floor(Math.random() * result.messages.length - 1)];
        var random = '+12022856865'
        twiml = new twilio.TwimlResponse();
        twiml.dial({callerId: '+12068666338'}, function() {
         this.number(random);
        });
        response.writeHead(200, {'Content-type': 'text/xml'});
        response.end(twiml.toString());       
      });
    }
    else {
      file.serve(request, response);
    }
  }).resume();
}).listen(process.env.PORT || 3000);
console.log("Listening on port ", process.env.PORT || 3000);

