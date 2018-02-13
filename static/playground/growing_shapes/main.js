/**
 * Created by MeshulamSilk on 16/2/17.
 */

var colors;

var count = 0;

var layereds;

function setup() {
    createCanvas(700, 700);

    colors = [color(255, 0, 0), color(0, 255, 0), color(0, 0, 255)];

    layereds = [];
    for (var i = 0; i < 7; ++i) {
        layereds.push(new LayeredShape(p5.Vector.random2D().mult(Math.random() * 500), 500, 50));
    }
}

function draw() {
    background(0);

    translate(width / 2, height / 2);

    layereds[0].setPos(createVector(mouseX - width / 2, mouseY - height / 2));

    for (var i = 0; i < layereds[0].layers.length; ++i) {
        for (var j = 0; j < layereds.length; ++j) {
            var layer = layereds[j].layers[i];
            layer.draw();
            layer.grow();

        }
    }

    count++;

    for (i = 0; i < layereds.length; ++i) {
        layereds[i].update();
    }
}

function mousePressed() {
    for (var i = 0; i < layereds.length; ++i) {
        layereds[i].setPos(p5.Vector.random2D().mult(300));
    }
}