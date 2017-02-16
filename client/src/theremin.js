const Theremin = (function(){
  
  let thereminCanvas;
  let frequencyLabel;
  let volumeLabel;
  let context;
  let oscillator;
  let gainNode;
  let lowNote = 50; 
  let highNote = 3000;
 
  // Constructor
  const Theremin = function() {
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
    thereminCanvas.addEventListener('mouseup', Theremin.stopSound);
    document.addEventListener('mouseleave', Theremin.stopSound);
  };
  
  Theremin.playSound = function(event) {
    oscillator = context.createOscillator();
    gainNode = context.createGain();
    // oscillator.type = 'sine'; // sine is the most thermin like spooky one yo
    // oscillator.type = 'triangle';
    oscillator.type = 'square';
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
   
  Theremin.calculateNote = function(posX) {
    let noteDifference = highNote - lowNote;
    let noteOffset = (noteDifference / thereminCanvas.offsetWidth) * (posX - thereminCanvas.offsetLeft);
    return lowNote + noteOffset;
  };
  
  Theremin.calculateVolume = function(posY) {
    let volumeLevel = 1 - (((100 / thereminCanvas.offsetHeight) * (posY - thereminCanvas.offsetTop)) / 100);
    return volumeLevel;
  };
  
  Theremin.calculateFrequency = function(x, y) {
    let noteValue = Theremin.calculateNote(x);
    let volumeValue = Theremin.calculateVolume(y);
  
    oscillator.frequency.value = noteValue;
    gainNode.gain.value = volumeValue;
  
    frequencyLabel.innerHTML = Math.floor(noteValue) + ' Hz';
    volumeLabel.innerHTML = Math.floor(volumeValue * 100) + '%';
  };
  
  Theremin.updateFrequency = function(event) {
    if (event.type == 'mousedown' || event.type == 'mousemove') {
      Theremin.calculateFrequency(event.x, event.y);
    } 
    
  };
  
  return Theremin;
})();

// Initialize the page.
window.onload = function() {
  const theremin = new Theremin();
}