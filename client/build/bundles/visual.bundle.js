/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	var analyser, canvas, ctx;
	
	window.onload = function(){
	  canvas = document.createElement('canvas');
	  canvas.width = window.innerWidth;
	  canvas.height = window.innerHeight;
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
	    ctx.fillRect(i, canvas.height - freqByteData[i], 10, canvas.height); 
	    ctx.strokeRect(i, canvas.height - freqByteData[i], 10, canvas.height); 
	  }
	}

/***/ }
/******/ ]);
//# sourceMappingURL=visual.bundle.js.map