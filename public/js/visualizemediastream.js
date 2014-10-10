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
    var x = (i % 16) * 40;
    var y = Math.floor(i / 16) * 20;

    var hex = "#cccccc";
    if (array[i] > 10) {
      hex = "#ff" + componentToHex(255 - array[i]) + componentToHex(255 - array[i]);
    }

    ctx.fillStyle = hex;
    ctx.fillRect(x,y,35,15);
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

  // magical constants
	analyser.smoothingTimeConstant = 0.85;
	analyser.fftSize = 512;

  // connect the microphone to the analyser
	microphone.connect(analyser);
	
  draw();	
}
