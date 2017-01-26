var analyser, canvas, ctx;

window.onload = function(){
  canvas = document.querySelector('canvas');
  canvas.width = window.innerWidth/2;
  canvas.height = window.innerHeight/2;
  document.body.appendChild(canvas);
  ctx = canvas.getContext('2d');

  setupWebAudio();
  draw();
}

function setupWebAudio(){
  var audio = document.createElement('audio');
  audio.src = '/audio/99scotsman.wav';
  audio.controls = 'true';
  document.body.appendChild(audio);
  audio.style.width = window.innerWidth + 'px';

  var audioContext = new AudioContext();
  analyser = audioContext.createAnalyser();
  var source = audioContext.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(audioContext.destination);
  audio.play();
}

function draw(){
  requestAnimationFrame(draw);
  // represents an array of 8-bit unsigned integers.
  var freqByteData = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(freqByteData);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 1; i < freqByteData.length; i += 10){
    var random = Math.random, 
    red = random() * 255 >> 0,
    green = random() * 255 >> 0,
    blue = random() * 255 >> 0;

    ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
    ctx.fillRect(i, canvas.height - freqByteData[i], 30, canvas.height); 
    ctx.strokeRect(i, canvas.height - freqByteData[i], 30, canvas.height); 
  }
}