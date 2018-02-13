/**
 * Created by MeshulamSilk on 16/2/17.
 */

function LayeredShape(pos, maxLayers, spacing) {
    this.pos = pos;
    this.maxLayers = maxLayers;
    this.spacing = spacing;
    this.layers = [];

    for (var i = 0; i <= this.maxLayers; i += this.spacing) {
        var layer = new Shape(this.pos, this.maxLayers - i, colors[i % colors.length]);
        this.layers.push(layer);
    }

    this.draw = function() {
        fill(0);
        ellipse(this.pos.x, this.pos.y, 5);
    };

    this.setPos = function(newPos) {
        this.pos = newPos;
        for (var i = 0; i < this.layers.length; ++i) {
            this.layers[i].pos = newPos;
        }
    };

    this.update = function() {
        if ((count + 1) % this.spacing == 0) {
            var layer = new Shape(this.pos, 1, colors[count % colors.length]);
            this.layers.push(layer);
            this.layers.shift();
        }
    }
}