// Title:   Rectangulation (Blue/Purple)
// Author:  Alexander Matson
// Date:    1/23/2018

function PointObj(xval, yval) {
    this.x = xval;
    this.y = yval;
}

// Canvas geometries
var canWidth;
var canHeight;
var canCenter; // point

// Loop termination
var exitCounter = 0;
var exitCondition = 1;

// Color vars
var redVal = 95;
var greenVal = 35;
var blueVal = 255;
var greenSwitch = true;

// Triangle geometries
var squareLength; // pixels
var altitude;

// Top triangle point
var topLeftPoint;

// Top right rectangular point
var topRightPoint;

// Bottom left point
var bottomLeftPoint;

// Bottom right point
var bottomRightPoint;

// Rotation variables
var spinFactor = 0;
var circumRadius;
var delAng;
var rotAng;

var backgroundColor;
var blendOpt;

function windowResized() {
    topLeftPoint;
    topRightPoint;
    bottomLeftPoint;
    bottomRightPoint;

    setup();
    loop();
}

function setup() {
    // Configure canvas parameters
    canWidth = windowWidth;
    canHeight = windowHeight;
    canCenter = new PointObj(canWidth / 2, canHeight / 2);
    createCanvas(canWidth, canHeight);

    // Calculate initial square attributes
    squareLength = windowWidth;
    circumRadius = squareLength / Math.sqrt(2);

    topLeftPoint = new PointObj(canCenter.x - (squareLength / 2), canCenter.y - (squareLength / 2));
    topRightPoint = new PointObj(canCenter.x + (squareLength / 2), canCenter.y - (squareLength / 2));
    bottomLeftPoint = new PointObj(canCenter.x - (squareLength / 2), canCenter.y + (squareLength / 2));
    bottomRightPoint = new PointObj(canCenter.x + (squareLength / 2), canCenter.y + (squareLength / 2));

    delAng = PI / 250;
    rotAng = 0;

    if (colorScheme == "dark") {
        backgroundColor = 34
        blendOpt = SCREEN
    } else {
        backgroundColor = 250
        blendOpt = MULTIPLY
    }

    background(backgroundColor);
    blendMode(blendOpt);
}

function draw() {
    var strokeColor = color(redVal, greenVal, blueVal, 75);
    var fillColor = color(redVal, greenVal, blueVal, 1);

    var emptyFill = color(0, 0, 0, 0);
    fill(fillColor);

    stroke(strokeColor);
    strokeWeight(1);
    alpha(strokeColor);

    // Apply rotations to points
    var p1 = rotatePoint(canCenter, topLeftPoint, circumRadius, rotAng);
    var p2 = rotatePoint(canCenter, topRightPoint, circumRadius, rotAng);
    var p3 = rotatePoint(canCenter, bottomLeftPoint, circumRadius, rotAng);
    var p4 = rotatePoint(canCenter, bottomRightPoint, circumRadius, rotAng);

    quad(p1.x, p1.y, p2.x, p2.y, p4.x, p4.y, p3.x, p3.y);
    updateQuad();

    rotAng = rotAng + delAng;

    // Apply color gradient
    colorShift();

    // Stopping condition
    stopLoop();
}

var sqSwitch = false;
function updateQuad() {
    if (sqSwitch) {
        squareLength = squareLength + 5;
    } else {
        squareLength = squareLength - 5;
    }

    if (squareLength >= windowWidth + 50 && squareLength >= windowHeight + 50) {
        sqSwitch = false;
        exitCounter += 1;
        // console.log(exitCounter);
    }
    if (squareLength <= 10) {
        sqSwitch = true;
    }

    circumRadius = squareLength / Math.sqrt(2);

    topLeftPoint = new PointObj(canCenter.x - (squareLength / 2), canCenter.y - (squareLength / 2));
    topRightPoint = new PointObj(canCenter.x + (squareLength / 2), canCenter.y - (squareLength / 2));
    bottomLeftPoint = new PointObj(canCenter.x - (squareLength / 2), canCenter.y + (squareLength / 2));
    bottomRightPoint = new PointObj(canCenter.x + (squareLength / 2), canCenter.y + (squareLength / 2));
}

function rotatePoint(center_point, moving_point, r, angDiff) {
    var newX = cos(angDiff) * (moving_point.x - center_point.x) - sin(angDiff) * (moving_point.y - center_point.y) + center_point.x;
    var newY = sin(angDiff) * (moving_point.x - center_point.x) + cos(angDiff) * (moving_point.y - center_point.y) + center_point.y;
    return new PointObj(newX, newY);
}

function colorShift() {
    if (greenSwitch) {
        greenVal = greenVal + 1;
    } else {
        greenVal = greenVal - 1;
    }

    if (greenVal >= 200) {
        greenSwitch = false;
    }
    if (greenVal <= 0) {
        greenSwitch = true;
    }
}

function stopLoop() {
    if (exitCounter == exitCondition) {
        noLoop();
        exitCounter = 0;
    }
}