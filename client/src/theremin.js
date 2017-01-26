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
    // highNoteControl = document.getElementById('high-note-control');

    context = new AudioContext();
    Theremin.setupEventListeners();
  };
  
  // Event Listeners
  Theremin.setupEventListeners = function() {
    document.body.addEventListener('touchmove', function(event) {
      event.preventDefault();
    }, false);
  
    thereminCanvas.addEventListener('mousedown', Theremin.playSound);
    // thereminCanvas.addEventListener('touchstart', Theremin.playSound);
  
    thereminCanvas.addEventListener('mouseup', Theremin.stopSound);
    document.addEventListener('mouseleave', Theremin.stopSound);
    // thereminCanvas.addEventListener('touchend', Theremin.stopSound);
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
    // thereminCanvas.addEventListener('touchmove', Theremin.updateFrequency);
    thereminCanvas.addEventListener('mouseout', Theremin.stopSound);
  };
   
  Theremin.stopSound = function(event) {
    oscillator.stop(0);
    thereminCanvas.removeEventListener('mousemove', Theremin.updateFrequency);
    // thereminCanvas.removeEventListener('touchmove', Theremin.updateFrequency);
    thereminCanvas.removeEventListener('mouseout', Theremin.stopSound);
  };
   
  Theremin.calculateNote = function(posX) {
    var noteDifference = highNote - lowNote;
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
    if (event.type == 'mousedown' || event.type == 'mousemove') {
      Theremin.calculateFrequency(event.x, event.y);
    } 
    // else if (event.type == 'touchstart' || event.type == 'touchmove') {
    //   var touch = event.touches[0];
    //   Theremin.calculateFrequency(touch.pageX, touch.pageY);
    // }
  };
  
  return Theremin;
})();

// Initialize the page.
window.onload = function() {
  var theremin = new Theremin();
}

