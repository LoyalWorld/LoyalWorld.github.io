var root = {
    wavecolor: {  
        r: 125,
        g: 52,
        b: 253
    },
    rainbowSpeed: 0.5,
    rainbow: false, // Set rainbow to false
    matrixspeed: 50
};

var c = document.getElementById("c");
var ctx = c.getContext("2d");

var hueFw = false;
var hue = -0.01;

// Resize canvas to fill the full screen
function resizeCanvas() {
    c.height = window.innerHeight;
    c.width = window.innerWidth;
}

// Call resizeCanvas initially and whenever the window is resized
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// The characters to fall are the letters of "ZERKLY"
var characters = ["Z", "E", "R", "K", "L", "Y"];
var font_size = 36; // Increase font size for visibility
var columns = Math.floor(c.width / font_size); // Number of columns for the rain
var drops = [];

// Initialize drops array
for (var x = 0; x < columns; x++) {
    drops[x] = Math.random() * c.height; // Start drops at random heights
}

// Drawing the characters
function draw() {
    // Translucent background to show trail
    ctx.fillStyle = "rgba(0,0,0, 0.05)";
    ctx.fillRect(0, 0, c.width, c.height);

    // Loop through each drop
    for (var i = 0; i < drops.length; i++) {
        // Set the color of the letters to red
        ctx.fillStyle = 'rgba(255, 0, 0, 1)'; // Red color for the letters
        ctx.font = font_size + "px arial";

        // Draw the character from "ZERKLY"
        var text = characters[i % characters.length]; // Cycle through "ZERKLY"
        ctx.fillText(text, i * font_size, drops[i]); // Draw each letter

        // Incrementing Y coordinate
        drops[i] += font_size; // Move down by one font size
        // Reset the drop after it has crossed the screen
        if (drops[i] * font_size > c.height && Math.random() > 0.975) {
            drops[i] = 0; // Reset to the top
        }
    }
}

// Show the welcome message with a delay
function showWelcomeMessage() {
    var welcomeMessage = document.getElementById('welcomeMessage');
    welcomeMessage.classList.add('show'); // Show the message

    // Hide the message after a few seconds
    setTimeout(function() {
        welcomeMessage.classList.remove('show'); // Hide the message
    }, 3000); // Change duration as needed
}

// Set the drawing interval
setInterval(draw, root.matrixspeed);

// Call the welcome message function when the script loads
showWelcomeMessage();

// Function to handle property changes (if needed)
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

// Function to convert hex color to RGB
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
