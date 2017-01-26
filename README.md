# Web Audio API - Project 4 ~ and final project at CodeClan :(

I used vanilla JS to learn the Web Audio API.

See the docs here for more info: <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API#Data_analysis_and_visualisation">Web Audio API</a>

After reading / following the docs I decided to stick to vanilla JS as it was the best way to take in all the (many, many) different nodes, contexts, oscillators, filters, panners, waves, frequencies, streams, destinations.... the list goes on. I felt it best to engage in the environment of the docs before buiding it in React / using libraries.

I started out with a keydown library but it was all too quick! Instead assigned each keyboard keycode to a different note in the scale. With onkeydown and onkeyup the keys respond with audio ( can be as asy as osc.start() and osc.stop() in the chrome dev tools console). Event listeners also create and remove on keypress and css displays the differnt buttons being pressed within a scale (in this case I could fit A3 to G6. These notes represnt frquencies that we've assigned to notes in a scale, ie A4 is 440hz, A5 is 880hz.

I also followed the docs for the Theremin, in which it has a high and low frequency hard codes onto a canvas. The X and Y axis are responsive by both frequency and volume. The lower down the vertical axis the volume decreases, the horizontal values get higher in frequencies from left to right. 

Lastly is a quick visualisation of a wav file using a canvas that draws the soundwaves. 

Overall, a fun little app that I plan to expand on with more functionality for the Synth, such as more pre-set sounds for a user to select from.

# Thanks CodeClan, it's been synthly the best.

<img src="http://i.imgur.com/RG7vtnf.png"></img>
<img src="http://i.imgur.com/ahCVQOY.png"></img>
