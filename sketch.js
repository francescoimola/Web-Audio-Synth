let canvas;
let bttOn;
let bttOff;
let audioCtx;
let gainNode;
let osc1;
let osc2; 
let lowpass;
let hipass;
let freqSlider1;
let freqSlider2;
let LPSlider;
let HPSlider;
var angle = 0;
let square;
let sine;
let sawtooth;
let triangle;
let speedSlider;
let contour;

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	frameRate(120);
	noStroke();
	smooth();
	mySliders();
	myButtons();
	mySynth();
};

function myButtons(){
	bttOn = createButton("Play");
	bttOff = createButton("Mute");
	square = createButton("Square");
	sine = createButton("Sine");
	sawtooth = createButton("Sawtooth");
	triangle = createButton("Triangle"); 

	bttOn.addClass("button");
	bttOff.addClass("button");
	square.addClass("button");
	sine.addClass("button");
	sawtooth.addClass("button");
	triangle.addClass("button");

	bttOn.mousePressed(toggleOn);
	bttOff.mousePressed(toggleOff);
	square.mousePressed(toggleSquare);
	sine.mousePressed(toggleSine);
	sawtooth.mousePressed(toggleSawtooth);
	triangle.mousePressed(toggleTriangle);
};

function mySliders(){
	freqSlider1 = createSlider(20, 20000, 300, 0.0001);
	freqSlider2 = createSlider(20, 20000, 200, 0.0001);
	LPSlider = createSlider(20, 20000, 20000, 0.0001);
	HPSlider = createSlider(20, 20000, 20, 0.0001);
	speedSlider = createSlider(0, 1, 0.02, 0.0001);
	contour = createSlider(20, 20000, 800, 0.0001);

	freqSlider1.style("width", "50vw");
	freqSlider2.style("width", "50vw");
	LPSlider.style("width", "50vw");
	HPSlider.style("width", "50vw");
	speedSlider.style("width", "50vw");
	contour.style("width", "50vw");
};

function mySynth(){
	audioCtx = new (window.AudioContext || window.webkitAudioContext)();
	gainNode = audioCtx.createGain();
	osc1 = audioCtx.createOscillator();
	osc2 = audioCtx.createOscillator();
	lowpass = audioCtx.createBiquadFilter();
	hipass = audioCtx.createBiquadFilter();

	osc1.connect(lowpass);
	osc2.connect(lowpass);
	lowpass.connect(hipass);
	hipass.connect(gainNode);
	gainNode.connect(audioCtx.destination);

	osc1.frequency.setValueAtTime(440, audioCtx.currentTime);
	osc2.frequency.setValueAtTime(600, audioCtx.currentTime);
	osc1.type = "square";
	osc2.type = "square";
	osc1.start();
	osc2.start();

	lowpass.frequency.setValueAtTime(20000, audioCtx.currentTime);
	hipass.frequency.setValueAtTime(2000, audioCtx.currentTime);
	lowpass.type = "lowpass";
	hipass.type = "highpass";

	gainNode.gain.value = 0;
};

function toggleSquare() {
	osc1.type = "square";
	osc2.type = "square";
};

function toggleSine() {
	osc1.type = "sine";
	osc2.type = "sine";
};

function toggleSawtooth() {
	osc1.type = "sawtooth";
	osc2.type = "sawtooth";
}

function toggleTriangle() {
	osc1.type = "triangle";
	osc2.type = "triangle";
}

function toggleOn(){
	gainNode.gain.value = 0.2;
};

function toggleOff(){
	gainNode.gain.value = 0;
};

function draw() {
	background(255);

	let min = 10;
	let max = contour.value();
	let sineLFO = map(sin(angle), -1, 1, min, max);
	let revLFO = map(sin(angle), -1, 1, max, min);
	LPSlider.value(sineLFO);
	HPSlider.value(revLFO);

	var pos1 = width/3;
	var pos2 = height/4 + 60;
	bttOn.position(pos1, height/4 );
	bttOff.position(pos1 + 80, height/4 );
	sine.position(pos1, pos2);
	square.position(pos1 + 80, pos2);
	sawtooth.position(pos1 + 180, pos2);
	triangle.position(pos1 + 300, pos2); 

	let SlidX =  width/2 - width/4;
	let Slid1Y = height/2;
	let Slid2Y = height/2 + 40;
	let Slid3Y = height/2 + 90;
	let Slid4Y = height/2 + 130;
	let Slid5Y = height/2 + 170;
	let Slid6Y = height/2 + 210;

	var textX = SlidX - 10;
	var offset = 5;

	freqSlider1.position (SlidX, Slid1Y);
	freqSlider2.position (SlidX, Slid2Y);
	LPSlider.position (SlidX, Slid3Y);
	HPSlider.position (SlidX, Slid4Y);
	speedSlider.position (SlidX, Slid5Y);
	contour.position (SlidX, Slid6Y);

	osc1.frequency.setValueAtTime(freqSlider1.value(), audioCtx.currentTime);
	osc2.frequency.setValueAtTime(freqSlider2.value(), audioCtx.currentTime);
	lowpass.frequency.setValueAtTime(LPSlider.value(), audioCtx.currentTime);
	hipass.frequency.setValueAtTime(HPSlider.value(), audioCtx.currentTime);

	textSize(13);
	var freq1Text = text("Frequency 1", textX, Slid1Y - offset);
	var freq2Text = text("Frequency 2", textX, Slid2Y - offset);
	var filt1Text = text("Lowpass", textX, Slid3Y - offset);
	var filt2Text = text("Highpass", textX, Slid4Y - offset);
	var speedText = text("LFO Speed", textX, Slid5Y - offset);
	var contourText = text("Contour", textX, Slid6Y - offset);

	var LFOspeedValue = speedSlider.value();
	angle += LFOspeedValue; 
};

window.onresize = function() {
	canvas.size(windowWidth, windowHeight);
};

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
};
