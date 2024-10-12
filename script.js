var root = {
    wavecolor: {  
        r: 125,
        g: 52,
        b: 253
    },
    rainbowSpeed: 0.5,
    rainbow: false,
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

// The characters (Konkani characters)
var konkani = "゠アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレワヰヱヲンヺ・ーヽヿ0123456789";
// Convert the string into an array of single characters
var characters = konkani.split("");
var font_size = 14;
var columns = c.width / font_size; // Number of columns for the rain
var drops = [];

// Initialize drops array
for (var x = 0; x < columns; x++) {
    drops[x] = 1; // Set initial drop position
}

// Drawing the characters
function draw() {
    // Translucent background to show trail
    ctx.fillStyle = "rgba(0,0,0, 0.05)";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = "#BBB"; // Grey text
    ctx.font = font_size + "px arial";

    // Looping over drops
    for (var i = 0; i < drops.length; i++) {
        // Background color for the drop
        ctx.fillStyle = "rgba(10,10,10, 1)";
        ctx.fillRect(i * font_size, drops[i] * font_size, font_size, font_size);
        
        var text = characters[Math.floor(Math.random() * characters.length)];
        
        if (root.rainbow) {
            hue += (hueFw) ? 0.01 : -0.01;
            var rr = Math.floor(127 * Math.sin(root.rainbowSpeed * hue + 0) + 128);
            var rg = Math.floor(127 * Math.sin(root.rainbowSpeed * hue + 2) + 128);
            var rb = Math.floor(127 * Math.sin(root.rainbowSpeed * hue + 4) + 128);
            ctx.fillStyle = 'rgba(' + rr + ',' + rg + ',' + rb + ')';
        } else {
            ctx.fillStyle = 'rgba(' + root.wavecolor.r + ',' + root.wavecolor.g + ',' + root.wavecolor.b + ')';
        }

        // Draw the text
        ctx.fillText(text, i * font_size, drops[i] * font_size);
        // Incrementing Y coordinate
        drops[i]++;
        // Reset the drop after it has crossed the screen
        if (drops[i] * font_size > c.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
    }
}

// Set the drawing interval
setInterval(draw, root.matrixspeed);

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
