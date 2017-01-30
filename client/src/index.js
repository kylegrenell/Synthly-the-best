var audio = new AudioContext();

console.log('app running');

// use a letter (A through G, starting with C), and an octave number (usually between 0 and 9).
var semitoneMap = 
{
  C: -9, D: -7, E: -5, F: -4, G: -2, A: 0, B: 2
};

// an octave is divided into twelve semitones. An octave is simply the doubling of a frequency. To calculate the frequency of some number of semitones from a reference tone, you can use the following formula:
// freq = baseFreq × 2(numSemitones ÷ 12)
// Math.pow() function returns the base to the exponent power, that is, baseexponent.
var keyboardBaseSound = Math.pow(2, 1/12);

function getFrequency(noteName){
  var note = noteName[0];
  var octave = noteName[1];
  var semitone = semitoneMap[note] + (octave - 4) * 12;
  return 440 * Math.pow(keyboardBaseSound, semitone);
}

// used to link up the keyboard number 
var keyCodeNotes = 
{
  81: 'C5', 87: 'D5', 69: 'E5', 82: 'F5', 84: 'G5', 89: 'A5', 85: 'B5', 73: 'C6', 79: 'D6', 80: 'E6', 219: 'F6',221: 'G6', 65: 'C4',  83: 'D4', 68: 'E4', 70: 'F4', 71: 'G4', 72: 'A4', 74: 'B4', 75: 'C5', 76: 'D5', 186: 'E5', 222: 'F5', 90: 'C3', 88: 'D3', 67: 'E3', 86: 'F3', 66: 'G3', 78: 'A3', 77: 'B3', 188: 'C4', 190: 'D4', 191: 'E4'
};

var tones = {};

// assigning each unique keycode the sounds using osc, gain
for(var keyCode in keyCodeNotes){
  var osc = audio.createOscillator();
  var noteName = keyCodeNotes[keyCode];
  osc.frequency.value = getFrequency(noteName);
  var gain = audio.createGain();
  gain.gain.value = 0;
  osc.connect(gain );
  osc.start();
  gain.connect(audio.destination);

// pitch takes the note, osc and gain 
  var pitch = 
  {
    noteName: noteName, 
    osc: osc, 
    gain: gain
  };

  tones[keyCode] = pitch;
}

document.addEventListener('keydown', function(e){
  var pitch = tones[e.keyCode];
  if(pitch){
    pitch.gain.gain.value = 2;
    event.preventDefault();
    changeKeyElem(pitch.noteName, 'add');
  }
});

document.addEventListener('keyup', function(e){
  var pitch = tones[e.keyCode];
  if(pitch){
    pitch.gain.gain.value = 0;
    event.preventDefault();
    changeKeyElem(pitch.noteName, 'remove');
  }
});

function changeKeyElem(noteName, keyChangeEvent){
  var keyboardElem = document.querySelector('.keyboard');
  var keyElems = keyboardElem.querySelectorAll('.keyboard_key');

  for ( var i=0; i < keyElems.length; i++ ) {
    keyElems[i].classList.remove('is-down');
  }

  var key = keyboardElem.querySelector( '#' + noteName );
  key.classList[keyChangeEvent]('is-down');
}
