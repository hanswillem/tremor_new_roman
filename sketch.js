var tremor;
var strength = 0.5;
var currentCurve = [];
var allCurves = [];


function setup() {
    createCanvas(windowWidth, windowHeight);
    noFill();
    cursor(CROSS);

    //button undo
    bt1 = createButton('undo');
    bt1.position(20, 20);
    bt1.mousePressed(undo);

    //button clear
    bt1 = createButton('clear');
    bt1.position(20, 50);
    bt1.mousePressed(clearAll);

    //input strength
    inp = createInput(0.5);
    inp.size(35);
    inp.position(20, 80);
    inp.input(setStrength);
    strength = inp.value();
}


function draw() {
    background(255);
    stroke(0, 100);
    line(100, 0, 100, height);
    stroke(0);

    setCursor();
    addPoint();
    if (currentCurve.length > 1) {
        drawCurve(currentCurve);
    }
    drawAllCurves();
}


// add a point to the curve, i.e., a  particle to the array p
function addPoint() {
    if (mouseIsPressed) {
        if (mouseX > 100) {
            var off = getTremor();
            var d = (dist(mouseX, mouseY, pmouseX, pmouseY) / 10);
            if (d < 1) {
                d = 1;
            }
            x = mouseX + off[0] * strength * d;
            y = mouseY + off[1] * strength * d;
            currentCurve.push(new Particle(x, y));
        }
    }
}


// draws a curve to the screen when given a list of vectors
function drawCurve(crv) {
    beginShape();
    curveVertex(crv[0].x, crv[0].y);
    for (var i = 0; i < crv.length; i++) {
        crv[i].update();
        curveVertex(crv[i].x, crv[i].y);
    }
    curveVertex(crv[crv.length - 1].x, crv[crv.length - 1].y);
    endShape();
}


// draws all curves to the screen
function drawAllCurves() {
    for (var i = 0; i < allCurves.length; i++) {
        drawCurve(allCurves[i]);
    }
}


// change cursor when x < 100 from cross to hand
function setCursor() {
    if (mouseX > 100) {
        cursor(CROSS);
    } else {
        cursor(ARROW);
    }
}


// ads currentCurve to to allCurves and resets currentCurve
function mouseClicked() {
    if (mouseX > 100) {
        allCurves.push(currentCurve);
        currentCurve = [];
    }
}


// capture backspace key
function keyPressed() {
    if (keyCode === BACKSPACE) {
        undo();
    }
}


// undo
function undo() {
    allCurves.splice(allCurves.length - 1, 1);
    drawAllCurves();
}


// clear the screen
function clearAll() {
    allCurves = [];
    currentCurve = [];
}


// set the strength
function setStrength() {
    strength = inp.value();
}


// gets a value pair from the tremor list
function getTremor() {
    var n = tremor[int(random(tremor.length))];
    if (bool()) {
        n[0] = n[0] * -1;
    }
    if (bool()) {
        n[1] = n[1] * -1;
    }
    return n;
}


// flips a coin, returns true or false
function bool() {
    if (random(1) > 0.5) {
        return true;
    } else {
        return false;
    }
}

// tremor data
tremor = [
    [15.3999996200, 19.7999992400],
    [7.1999998090, 0.3999996185],
    [7.0000000000, 0.6000000238],
    [9.1999998090, 7.8000001910],
    [11.1999998100, 13.1999998100],
    [8.3999996190, 8.6000003810],
    [13.1999998100, 14.6000003800],
    [13.0000000000, 14.8000001900],
    [13.8000001900, 15.3999996200],
    [9.1999998090, 6.8000001910],
    [9.1999998090, 7.0000000000],
    [10.0000000000, 10.8000001900],
    [10.6000003800, 11.0000000000],
    [8.3999996190, 5.0000000000],
    [10.3999996200, 11.0000000000],
    [15.8000001900, 19.6000003800],
    [7.0000000000, 1.0000000000],
    [6.4000000950, 1.7999999520],
    [9.8000001910, 8.0000000000],
    [17.2000007600, 18.6000003800],
    [13.0000000000, 16.0000000000],
    [11.6000003800, 12.1999998100],
    [11.3999996200, 12.0000000000],
    [19.2000007600, 20.7999992400],
    [11.0000000000, 8.0000000000],
    [7.8000001910, 4.0000000000],
    [17.2000007600, 19.3999996200],
    [7.3999996190, 4.6000003810],
];
