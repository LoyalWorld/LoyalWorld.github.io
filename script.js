var root = {
  wavecolor: {  
    r: 125,
    g: 52,
    b: 253
  },
  rainbowSpeed: 0.5,
  rainbow: true,
  matrixspeed: 50
};

var c = document.getElementById("c");
var ctx = c.getContext("2d");

var hueFw = false;
var hue = -0.01;

// making the canvas full screen
c.height = window.innerHeight;
c.width = window.innerWidth;

// the characters (binary and ZERKLY)
var binary = "10";
var specialWord = "ZERKLY".split("");  // Split ZERKLY into an array of characters
// converting the string into an array of single characters
var characters = binary.split("");
var font_size = 14;
var columns = c.width / font_size;  // number of columns for the rain
var gradient = ctx.createLinearGradient(0, 10, 0, 200);
// an array of drops - one per column
var drops = [];

// initialize drops array
for (var x = 0; x < columns; x++)
  drops[x] = 1;

// a map to keep track of columns where ZERKLY is being drawn
var wordColumnMap = {};

// drawing the characters
function draw() {
  // translucent BG to show trail
  ctx.fillStyle = "rgba(0,0,0, 0.05)";
  ctx.fillRect(0, 0, c.width, c.height);

  ctx.fillStyle = "#BBB"; // grey text
  ctx.font = font_size + "px arial";

  // loop over drops
  for (var i = 0; i < drops.length; i++) {
    // background color for the "rain"
    ctx.fillStyle = "rgba(10,10,10, 1)";
    ctx.fillRect(i * font_size, drops[i] * font_size, font_size, font_size);
    
    var text;
    // decide if we are drawing "ZERKLY" in this column
    if (wordColumnMap[i] !== undefined) {
      text = specialWord[wordColumnMap[i]];  // Get the specific letter of ZERKLY
      wordColumnMap[i]++;

      // If we've finished drawing "ZERKLY", reset the map entry for this column
      if (wordColumnMap[i] >= specialWord.length) {
        delete wordColumnMap[i];
      }
    } else {
      var randomChoice = Math.random();
      // 5% chance to start drawing "ZERKLY" in this column
      if (randomChoice > 0.95 && drops[i] + specialWord.length < c.height / font_size) {
        wordColumnMap[i] = 0;
        text = specialWord[0]; // Start with the first letter
      } else {
        text = characters[Math.floor(Math.random() * characters.length)];
      }
    }

    if (root.rainbow) {
      hue += (hueFw) ? 0.01 : -0.01;
      var rr = Math.floor(127 * Math.sin(root.rainbowSpeed * hue + 0) + 128);
      var rg = Math.floor(127 * Math.sin(root.rainbowSpeed * hue + 2) + 128);
      var rb = Math.floor(127 * Math.sin(root.rainbowSpeed * hue + 4) + 128);
      ctx.fillStyle = 'rgba(' + rr + ',' + rg + ',' + rb + ')';
    } else {
      ctx.fillStyle = 'rgba(' + root.wavecolor.r + ',' + root.wavecolor.g + ',' + root.wavecolor.b + ')';
    }

    // draw the text
    ctx.fillText(text, i * font_size, drops[i] * font_size);

    // increment Y coordinate
    drops[i]++;

    // reset the drop after it has crossed the screen
    if (drops[i] * font_size > c.height && Math.random() > 0.975)
      drops[i] = 0;
  }
}

setInterval(draw, root.matrixspeed);

function livelyPropertyListener(name, val) {
  switch (name) {
    case "matrixColor":
      root.wavecolor = hexToRgb(val);
      break;
    case "rainBow":
      root.rainbow = val;
      break;
    case "rainbowSpeed":
      root.rainbowSpeed = val / 100;
      break;
  }
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
