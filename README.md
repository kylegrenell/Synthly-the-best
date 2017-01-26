# Web Audio API - Project 4 ~ and final project at CodeClan :(

I used vanilla JS to learn the Web Audio API.

See the docs here for more info: <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API#Data_analysis_and_visualisation">Web Audio API</a>

After reading through and following the docs I decided to stick to vanilla JS as it was the best way to take in all the (many, many) different nodes, contexts, oscillators, filters, panners, waves, frequencies, streams, destinations.... the list goes on. I felt it best to engage in the docs before buiding it in React using a library.

I started out with a keydown library but felt it took all the learning away. I instead assigned each keycode on the keyboard to a different note in the scale. Onkeydown and onkey up the keys respond with audio ( in the form of osc.start() and osc.stop() ). Event listeners also create and remove with each keypress and css displays the differnt buttons being pressed the higher it goes up the scale.

I also followed the docs for the Theremin, in which it has a high and low frequency hard codes onto a canvas. The X and Y axis are responsive by both frequency and volume. The lower down the vertical axis the volume decreases, the horizontal values get higher in frequencies from left to right. 

Overall, a fun little app that I plan to expand on with more functionality for the Synth, such as more pre-set sounds for a user to select from.

# Thanks CodeClan, it's been synthly the best.

![Alt text](client/build/images/web audio api.jpg?raw=true "WAA")
