// Use D3 to create a circle. We will use the Web Audio API to change the size
// of the circle later in response to the volume.
// Credit to https://github.com/chiester
/*var margin = {
	top: 40,
	right: 40,
	bottom: 40,
	left: 40
}, width = 960 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

var y = d3.scale.ordinal().domain(d3.range(1)).rangePoints([0, height]);

var svg = d3.select("#audio_level")
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
svg.selectAll("circle")
	.data(y.domain())
	.enter()
	.append("circle")
	.attr("stroke-width", 20)
	.attr("r", 10)
	.attr("cx", width / 2)
	.attr("cy", y);

// this is the circle we will be animating
var circle = svg.select("circle");
*/

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}


function draw() {
  var array =  new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(array);

  for (var i = 0; i < array.length; i++) { 	
    var x = (i % 32) * 20;
    var y = Math.floor(i / 32) * 20;

    var hex = "#cccccc";
    if (array[i] > 0) {
      hex = "#ff" + componentToHex(255 - array[i]) + componentToHex(255 - array[i]);
    }

    ctx.fillStyle = hex;
    ctx.fillRect(x,y,15,15);
  }

  requestAnimationFrame(draw);	
}

/**
 * Pass in a MediaStream and its volume will be visualized
 */
function visualizeMediaStream(stream) {

	// the context in which all the audio processing will take place
	audioContext = new webkitAudioContext();
	// the analyser can expose time and frequency data
	analyser = audioContext.createAnalyser();
	// connect our WebRTC media stream to the audio context
	microphone = audioContext.createMediaStreamSource(stream);
	// the script processor will let us sample the audio 
	//scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

	analyser.smoothingTimeConstant = 0.3;
	analyser.fftSize = 1024;

	microphone.connect(analyser);
	//analyser.connect(scriptProcessor);
	//scriptProcessor.connect(audioContext.destination);
	
  draw();	
}
