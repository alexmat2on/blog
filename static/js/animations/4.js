var startColor = 255
var endColor = "#35a0f3"

function setup() {
    createCanvas(windowWidth, windowHeight)
    startColor = color(startColor)
    endColor = color(endColor)
    background(34)
}

function draw() {
    background(34, 34, 34, 100)
    lightningBall(0)
    lightningBall(200)
    lightningBall(-200)
}

function lightningBall(offset = 0) {
    beginShape(LINES);
    var rounds = 150;
    var previous = [mouseX + offset, mouseY + offset]
    for (i = 0; i < rounds; i++) {
        var colorStep = i / rounds;

        stroke(lerpColor(startColor, endColor, colorStep))
        vertex(previous[0], previous[1])

        var next = [
            previous[0] + pow(-1, round(random()))*noise(random(100))*20,
            previous[1] + pow(-1, round(random()))*noise(random(100))*20
        ]
        vertex(next[0], next[1])

        previous[0] = next[0]
        previous[1] = next[1]
    }
    endShape();
} 