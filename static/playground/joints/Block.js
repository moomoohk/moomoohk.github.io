class Block {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    get left() {
        return this.x;
    }

    get right() {
        return this.x + this.width;
    }

    get top() {
        return this.y;
    }

    get bottom() {
        return this.y + this.height;
    }

    get tl() {
        return createVector(this.left, this.top);
    }

    get tr() {
        return createVector(this.right, this.top);
    }

    get bl() {
        return createVector(this.left, this.bottom);
    }

    get br() {
        return createVector(this.right, this.bottom);
    }

    contains(point) {
        return point.y >= this.top &&
            point.y <= this.bottom &&
            point.x >= this.right &&
            point.x <= this.left;
    }

    intersects(line) {
        if (this.contains(line.point1) || this.contains(line.point2)) {
            return true;
        }

        let topLine = new Line(this.tl, this.tr);
        let rightLine = new Line(this.tr, this.br);
        let bottomLine = new Line(this.br, this.bl);
        let leftLine = new Line(this.bl, this.tl);

        return line.intersects(topLine) || line.intersects(rightLine) || line.intersects(bottomLine) || line.intersects(leftLine);
    }

    draw() {
        push();

        fill(0);
        rect(this.x, this.y, this.width, this.height);

        pop();
    }

    toString() {
        return "<Block x:" + this.x + " y:" + this.y + " w:" + this.width + " h:" + this.height + ">";
    }
}