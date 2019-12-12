// Title:   HoneyCombing
// Author:  Alexander Matson
// Date:    1/25/2018

// Canvas geometries
var canWidth;
var canHeight;
var canCenter; // point

// Color variables
var lerpFactor = 0.0;
var startColor;
var endcolor;

// Hex Paths
var numHexes = 3;
var hexes = [];

// HoneyComb Grid
var hcSize = 55;     // the side lengths of the hexagonal grid cells.
var gaps = 10;        // size of gaps between cells
var hcPoints = [];   // an array containing points aligned with the HC Grid

var backgroundColor;

function windowResized() {
    hexes = [];
    hcPoints = [];   // an array containing points aligned with the HC Grid
    setup();
}

function setup() {
    // Configure canvas parameters
    canWidth = windowWidth;
    canHeight = windowHeight;
    canCenter = new PointObj(canWidth / 2, canHeight / 2);
    createCanvas(canWidth, canHeight);

    if (colorScheme == "dark") {
        backgroundColor = 34
    } else {
        backgroundColor = 250
    }
    background(backgroundColor);
    noFill();

    // Initialize a honeycomb grid
    var incrementor = (hcSize * sqrt(3) + gaps) / 2;
    for (var outer = 0; outer < (windowHeight + incrementor); outer += incrementor) {
        var coefficient = round(outer / incrementor);
        var xOffset;

        if (coefficient % 2 == 0) {
            xOffset = 0;
        } else {
            xOffset = 3 * hcSize / 2 + gaps;
        }

        for (var inner = xOffset; inner < (windowWidth + 3 * hcSize + 2 * gaps); inner += (3 * hcSize + 2 * gaps)) {
            stroke(0, 0, 0, 150);
            polygon(inner, outer, hcSize, 6);
            var hcCenter = new PointObj(inner, outer);
            hcPoints.push(hcCenter);
        }
    }

    // Initialize hex paths
    for (var i = 0; i < numHexes; i++) {
        var lf = i / numHexes;
        var randomPoint = hcPoints[floor(random(0, hcPoints.length))];
        var hexPath = new hexPather(randomPoint.x, randomPoint.y, hcSize, lf);

        hexes.push(hexPath);
    }

    // Set colors
    startColor = color(226, 192, 105, 250);
    endColor = color(230, 76, 73, 250);
}

function draw() {
    if (frameCount % 30 == 0) {
        // Only draw a new hexagon every 10 frames (speed control).
        for (var i = 0; i < hexes.length; i++) {
            hexes[i].initiate();
        }
    }

    if (frameCount % 2 == 0) {
        // Delay background covering
        background(backgroundColor, backgroundColor, backgroundColor, 15);
    }
}

// Create an object to represent Points
function PointObj(xval, yval) {
    this.x = xval;
    this.y = yval;
}

function polygon(x, y, radius, npoints) {
    var angle = TWO_PI / npoints;
    beginShape();
    for (var a = 0; a < TWO_PI; a += angle) {
        var sx = x + cos(a) * radius;
        var sy = y + sin(a) * radius;
        vertex(sx, sy);
    }
    endShape(CLOSE);
}

function hexPather(initX, initY, size, lerpFactor) {
    this.size = size;
    this.x = initX;
    this.y = initY;

    this.lf = lerpFactor;

    this.transitioning = false;
    this.initiate = hexPathStart;

    this.prev = undefined;
}

function hexPathStart() {
    // pick a random side to move to
    var nextside = floor(random(1, 6));

    // prevent the hexagon from going backwards
    if (this.prev == nextside) {
        nextside = ((nextside + 1) % 6) + 1;
    } else {
        this.prev = nextside;
    }

    // console.log(nextside);

    if (nextside == 1) {
        this.x = this.x;
        this.y = this.y - (gaps + this.size * sqrt(3));
    } else if (nextside == 2) {
        this.x = this.x + (gaps + 3 * this.size / 2);
        this.y = this.y - (gaps + this.size * sqrt(3)) / 2;
    } else if (nextside == 3) {
        this.x = this.x + (gaps + 3 * this.size / 2);
        this.y = this.y + (gaps + this.size * sqrt(3)) / 2;
    } else if (nextside == 4) {
        this.x = this.x;
        this.y = this.y + (gaps + this.size * sqrt(3));
    } else if (nextside == 5) {
        this.x = this.x - (gaps + 3 * this.size / 2);
        this.y = this.y + (gaps + this.size * sqrt(3)) / 2;
    } else if (nextside == 6) {
        this.x = this.x - (gaps + 3 * this.size / 2);
        this.y = this.y - (gaps + this.size * sqrt(3)) / 2;
    }

    var hexcolor = lerpColor(startColor, endColor, abs(sin(this.lf)));
    fill(hexcolor);
    stroke(hexcolor);

    if (this.x > 0 && this.x < windowWidth && this.y > 0 && this.y < windowHeight) {
        polygon(this.x, this.y, this.size, 6);
    } else {
        var randomPoint = hcPoints[floor(random(0, hcPoints.length))];
        this.x = randomPoint.x;
        this.y = randomPoint.y;
        polygon(this.x, this.y, this.size, 6);
    }

    this.lf += 0.08;
}

function stopLoop(exitCounter, exitCondition) {
    if (exitCounter >= exitCondition) {
        noLoop();
        exitCounter = 0;
    }
}
