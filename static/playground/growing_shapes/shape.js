/**
 * Created by MeshulamSilk on 16/2/17.
 */

function Shape(pos, size, c) {
    this.pos = pos;
    this.size = size;
    this.c = c;

    this.grow = function() {
        this.size++;
    };

    this.draw = function() {
        push();

        smooth();
        noStroke();
        fill(this.c);

        ellipse(this.pos.x, this.pos.y, this.size);

        pop();
    };
}