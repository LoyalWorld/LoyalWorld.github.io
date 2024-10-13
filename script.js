var root = {
    wavecolor: {  
        r: 0,
        g: 255,
        b: 0
    },
    matrixspeed: 50
};

var c = document.getElementById("c");
var ctx = c.getContext("2d");

// making the canvas full screen
c.height = window.innerHeight;
c.width = window.innerWidth;

// the characters (binary and ZERKLY)
var binary = "10";
var specialWord = "ZERKLY".split("");  // Split ZERKLY into an array of characters
var characters = binary.split("");
var font_size = 14;
var columns = c.width / font_size;  // number of columns for the rain
var drops = [];

// initialize drops array
for (var x = 0; x < columns; x++) {
    drops[x] = 1;
}

// a map to keep track of columns where ZERKLY is being drawn
var wordColumnMap = {};

// drawing the characters
function draw() {
    // Slightly fade the canvas for the trail effect
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.font = font_size + "px arial";

    // loop over drops
    for (var i = 0; i < drops.length; i++) {
        var text;
        if (wordColumnMap[i] !== undefined) {
            text = specialWord[wordColumnMap[i]];  // Get the specific letter of ZERKLY
            wordColumnMap[i]++;

            if (wordColumnMap[i] >= specialWord.length) {
                delete wordColumnMap[i];
            }
            ctx.fillStyle = "red"; // ZERKLY characters in red
        } else {
            var randomChoice = Math.random();
            if (randomChoice > 0.95 && drops[i] + specialWord.length < c.height / font_size) {
                wordColumnMap[i] = 0;
                text = specialWord[0]; // Start with the first letter
                ctx.fillStyle = "red"; // ZERKLY characters in red
            } else {
                text = characters[Math.floor(Math.random() * characters.length)];
                ctx.fillStyle = `rgba(${root.wavecolor.r}, ${root.wavecolor.g}, ${root.wavecolor.b}, 1)`; // Binary characters in green
            }
        }

        // draw the text
        ctx.fillText(text, i * font_size, drops[i] * font_size);

        // reset drop to the top when it reaches the bottom
        drops[i]++;
        if (drops[i] * font_size > c.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
    }
}

// Call draw at the specified interval
setInterval(draw, root.matrixspeed);

// Show the welcome message and then hide it after a few seconds
const welcomeMessage = document.getElementById('welcomeMessage');
welcomeMessage.classList.add('show'); // Show the message

setTimeout(() => {
    welcomeMessage.classList.remove('show'); // Hide the message after 3 seconds
}, 3000); // Adjust this duration as needed
