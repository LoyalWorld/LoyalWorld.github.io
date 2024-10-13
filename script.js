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
    drops[x] = {
        position: 1,    // The Y position of the drop
        opacity: 1.0    // Initial opacity, fully visible
    };
}

// a map to keep track of columns where ZERKLY is being drawn
var wordColumnMap = {};

// drawing the characters
function draw() {
    // Set up a slight transparent background to give the trail effect
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; // Slowly fade the previous characters
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.font = font_size + "px arial";

    // loop over drops
    for (var i = 0; i < drops.length; i++) {
        var drop = drops[i];
        var text;
        if (wordColumnMap[i] !== undefined) {
            text = specialWord[wordColumnMap[i]];  // Get the specific letter of ZERKLY
            wordColumnMap[i]++;

            if (wordColumnMap[i] >= specialWord.length) {
                delete wordColumnMap[i];
            }
            ctx.fillStyle = "rgba(255, 0, 0," + drop.opacity + ")"; // ZERKLY characters in red, fade with opacity
        } else {
            var randomChoice = Math.random();
            if (randomChoice > 0.95 && drop.position + specialWord.length < c.height / font_size) {
                wordColumnMap[i] = 0;
                text = specialWord[0]; // Start with the first letter
                ctx.fillStyle = "rgba(255, 0, 0, " + drop.opacity + ")"; // ZERKLY characters in red
            } else {
                text = characters[Math.floor(Math.random() * characters.length)];
                ctx.fillStyle = `rgba(${root.wavecolor.r}, ${root.wavecolor.g}, ${root.wavecolor.b}, ${drop.opacity})`; // Binary characters in green, fade with opacity
            }
        }

        // draw the text with the current opacity
        ctx.fillText(text, i * font_size, drop.position * font_size);

        // update the drop's position and opacity
        drop.position++;
        drop.opacity -= 0.05; // Reduce opacity over time to fade out

        // reset drop to the top when it reaches the bottom or is invisible
        if (drop.position * font_size > c.height || drop.opacity <= 0) {
            drops[i] = {
                position: 0,    // Reset to the top
                opacity: 1.0    // Fully visible again
            };
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
