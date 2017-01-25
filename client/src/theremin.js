// Initialize the page.
window.onload = function() {
  var theremin = new Theremin();
}

// defining a new module called Theremin. Contains all variables + functions for the theremin
var Theremin = (function(){
  var thereminCanvas;
  var frequencyLabel;
  var volumeLabel;
  var context;
  var oscillator;
  var gainNode;
  var lowNote = 50; 
  var highNote = 3000;
 
  // Constructor
  var Theremin = function() {
    thereminCanvas = document.getElementById('theremin');
    frequencyLabel = document.getElementById('frequency');
    volumeLabel = document.getElementById('volume');
    context = new AudioContext();
    Theremin.allEventListeners();
  };
  
  // Event Listeners
  Theremin.allEventListeners = function() {
    thereminCanvas.addEventListener('mousedown', Theremin.playSound);
    thereminCanvas.addEventListener('mouseup', Theremin.stopSound);
  };
  

  Theremin.playSound = function(event) {
    oscillator = context.createOscillator();
    gainNode = context.createGain();
    oscillator.type = 'sine'; // sine is the most thermin like spooky one yo
    // oscillator.type = 'triangle';
    // oscillator.type = 'square';
    // oscillator.type = 'sawtooth';
    gainNode.connect(context.destination);
    oscillator.connect(gainNode);
  
    Theremin.updateFrequency(event);
    oscillator.start(0);
  
    thereminCanvas.addEventListener('mousemove', Theremin.updateFrequency);
    thereminCanvas.addEventListener('mouseout', Theremin.stopSound);
  };
   

  Theremin.stopSound = function(event) {
    oscillator.stop(0);
    thereminCanvas.removeEventListener('mousemove', Theremin.updateFrequency);
    thereminCanvas.removeEventListener('mouseout', Theremin.stopSound);
  };
   
  // position of the cursor on the pad determines note frequency
  Theremin.calculateNote = function(posX) {
    var noteDifference = highNote - lowNote; // set to canvas size
    // calculates what frequency value is represented by 1 pixel. multiplied by the position of the cursor on the pad to give the value that should be added to lowNote to produce the final frequency.
    var noteOffset = (noteDifference / thereminCanvas.offsetWidth) * (posX - thereminCanvas.offsetLeft);
    return lowNote + noteOffset;
  };
  

  Theremin.calculateVolume = function(posY) {
    var volumeLevel = 1 - (((100 / thereminCanvas.offsetHeight) * (posY - thereminCanvas.offsetTop)) / 100);
    return volumeLevel;
  };
  

  Theremin.calculateFrequency = function(x, y) {
    var noteValue = Theremin.calculateNote(x);
    var volumeValue = Theremin.calculateVolume(y);
  
    oscillator.frequency.value = noteValue;
    gainNode.gain.value = volumeValue;
  
    frequencyLabel.innerHTML = Math.floor(noteValue) + ' Hz';
    volumeLabel.innerHTML = Math.floor(volumeValue * 100) + '%';
  };
  

  Theremin.updateFrequency = function(event) {
    if (event.type == 'mousedown' || event.type == 'mousemove') 
    {
      Theremin.calculateFrequency(event.x, event.y);
    } else {
  return Theremin;
  };

});

