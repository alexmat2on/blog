    // Title:   Triangulation (Purple/Orange)
    // Author:  Alexander Matson
    // Date:    1/16/2018

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
    var exitCondition = 1500;

    // Color vars
    var redVal = 100;
    var greenVal = 35;
    var blueVal = 100;
    var blueSwitch = true; // modifying blue values

    // Triangle geometries
    var triLength = 10; // pixels
    var altitude;

    // Top triangle point
    var topPoint;

    // Bottom left point
    var leftPoint;

    // Bottom right point
    var rightPoint;

    // Rotation variables
    var spinFactor = 0;
    var circumRadius;
    var delAng; // delta, the change in angle that the triangle should rotate.
    var rotAng; // the total angle that the triangle should rotate from the starting position.

    var backgroundColor;
    var blendOpt;

    function windowResized() {
        setup();
    }
    
    function setup() {
      // Configure canvas parameters
      canWidth = windowWidth - 0;
      canHeight = windowHeight - 0;
      canCenter = new PointObj(canWidth / 2, canHeight / 2);
      createCanvas(canWidth, canHeight);

      // Calculate initial triangle attributes
      altitude = triLength * (Math.sqrt(3) / 2);
      circumRadius = triLength / Math.sqrt(3);

      topPoint = new PointObj(canWidth / 2, (canHeight / 2) - ((2/3) * altitude));
      leftPoint = new PointObj(topPoint.x - (triLength / 2), topPoint.y + altitude);
      rightPoint = new PointObj(topPoint.x + (triLength / 2), topPoint.y + altitude);

      // Define the angle delta, and initial rotation angle
      delAng = PI / 250;
      rotAng = 0;

      // Color management
      if (colorScheme == "dark") {
        backgroundColor = 34
        blendOpt = SCREEN
      } else {
        backgroundColor = 250
        blendOpt = HARD_LIGHT
      }

      background(backgroundColor);
      blendMode(blendOpt);
      var emptyFill = color(0, 0, 0, 0);
      fill(emptyFill);
    }

    function draw() {
        var strokeColor = color(redVal, greenVal, blueVal, 75);
        stroke(strokeColor);
        alpha(strokeColor);

        // Apply rotations to points
        var p1 = rotatePoint(canCenter, topPoint, circumRadius, rotAng);
        var p2 = rotatePoint(canCenter, leftPoint, circumRadius, rotAng);
        var p3 = rotatePoint(canCenter, rightPoint, circumRadius, rotAng);

        triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
        updateTriangle();

        rotAng += delAng;

        // Applying color gradient
        shiftColor();

        // Stopping condition
        stopLoop();
    }

    function updateTriangle() {
        triLength = triLength + 5;
        altitude = triLength * (Math.sqrt(3) / 2);
        circumRadius = triLength / Math.sqrt(3);

        // New Top point, without rotation
        topPoint.x = topPoint.x;
        topPoint.y = (canHeight / 2) - ((2/3) * altitude);

        // Figure out new "bottom" left and "bottom" right points
        leftPoint.x = topPoint.x - (triLength / 2);
        leftPoint.y = topPoint.y + altitude;

        rightPoint.x = topPoint.x + (triLength / 2);
        rightPoint.y = topPoint.y + altitude;
    }

    function rotatePoint(center_point, moving_point, r, angDiff) {
        var newX = cos(angDiff) * (moving_point.x - center_point.x) - sin(angDiff) * (moving_point.y - center_point.y) + center_point.x;
        var newY = sin(angDiff) * (moving_point.x - center_point.x) + cos(angDiff) * (moving_point.y - center_point.y) + center_point.y;
        return new PointObj(newX, newY);
    }

    function shiftColor() {
        if (blueSwitch) {
            blueVal = blueVal + 1;
        } else {
            blueVal = blueVal - 1;
        }

        if (blueVal >= 140) {
            blueSwitch = false;
        }
        if (blueVal <= 0) {
            blueSwitch = true;
        }
    }

    function stopLoop() {
        if (exitCounter == exitCondition) {
            noLoop();
            exitCounter = 0;
        } else {
            exitCounter += 1;
        }
    }
