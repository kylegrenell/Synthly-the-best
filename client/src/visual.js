var analyser, canvas, ctx;

window.onload = function(){
  canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  ctx = canvas.getContext('2d');

  setupWebAudio();
}

function setupWebAudio(){
  var audio = document.createElement('audio');
  audio.src = '/audio/99scotsman.wav';
  audio.controls = true;
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
  var freqByData = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(freqByData);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 1; i < freqByData.length; i += 10){
    var random = Math.random, 
    red = random() * 255 >> 0,
    green = random() * 255 >> 0,
    blue = random() * 255 >> 0;

    ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ',';
    ctx.fillRect(i, canvas.height = freqByData[i], 10, canvas.height); 
  }
}