// Title:   Skeletorus
// Author:  Alexander Matson
// Date:    1/23/2018

function Torus(r1_, r2_, detx_, dety_, color_, angle_, speed_, direction_) {
    return {
        r1: r1_,
        r2: r2_,
        detx: detx_,
        dety: dety_,
        color: color_,
        angle: angle_,
        speed: speed_,
        direction: direction_,
        spin: function() {
            rotateZ(this.angle);
            stroke(this.color);
            torus(this.r1, this.r2, this.detx, this.dety);
            this.angle += this.speed;        
        }
    }
}

var t1, t2, t3, t4;
var slowSpin = 0.0005;
var backgroundColor;

function windowResized() {
    setup();
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);

    noFill();
    strokeWeight(1);

    if (colorScheme == "dark") {
        backgroundColor = 34
      } else {
        backgroundColor = 250
      }
    // BRIGHT VERSION
    // var startColor = color(206, 219, 121);
    // var endColor = color(49, 219, 125);

    // DULL VERSION
    var startColor = color(255, 201, 121);
    //var endColor = color(77, 179, 123);
    var endColor = color(77, 179, 123);

    var color1 = lerpColor(startColor, endColor, 1.00);
    var color2 = lerpColor(startColor, endColor, 0.75);
    var color3 = lerpColor(startColor, endColor, 0.50);
    var color4 = lerpColor(startColor, endColor, 0.25);

    t1 = Torus(windowWidth/10, windowWidth/55, 4, 2, color1, -2.5, slowSpin, 1);
    t2 = Torus(windowWidth/6, windowWidth/50, 8, 4, color2, 2.0, slowSpin, -1);
    t3 = Torus(windowWidth/4, windowWidth/45, 16, 6, color3, -1.05, slowSpin, 1);
    t4 = Torus(windowWidth/2.5, windowWidth/40, 20, 7, color4, 1.0, slowSpin, -1);
}

function draw() {
    background(color(backgroundColor));

    t1.spin()
    t2.spin()
    t3.spin()
    t4.spin()
}