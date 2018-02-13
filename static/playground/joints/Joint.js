class Joint {
    constructor(position, mass, bouncy) {
        this.position = position;
        this.mass = mass;
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);

        this.bouncy = (bouncy === undefined) || bouncy;
    }

    applyForce(force) {
        let f = p5.Vector.div(force, this.mass);
        this.acceleration.add(f);
    }

    update() {
        this.velocity.add(this.acceleration);

        this.velocity.mult(DEFAULT_SPRING_DAMPENING);

        // if (blocks.some((block) => block.intersects(this.position, this.velocity))) {
        // return true;
        // }

        if (this.willCollide(createVector(this.position.x + this.velocity.x, this.position.y))) {
            if (this.bouncy) {
                this.velocity.x = -this.velocity.x * .3;
            } else {
                this.velocity.x = 0;
            }
        }
        if (this.willCollide(createVector(this.position.x, this.position.y + this.velocity.y))) {
            if (this.bouncy) {
                this.velocity.y = -this.velocity.y * .3;
            } else {
                this.velocity.y = 0;
            }
        }

        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    willCollide(newPosition) {
        if (newPosition.y <= 0 || newPosition.y > height - 1 || newPosition.x < 0 || newPosition.x > width - 1) {
            return true;
        }

        if (blocks.some((block) => block.intersects(new Line(this.position, newPosition)))) {
            return true;
        }

        return joints.some((joint) => joint !== this && newPosition.dist(joint.position) < 0.5);
    }

    draw() {
        push();

        noStroke();
        fill(color("blue"));
        ellipse(this.position.x, this.position.y, 3, 3);

        let next = p5.Vector.add(this.position, this.velocity);
        stroke(color("red"));
        line(this.position.x, this.position.y, next.x, next.y);

        pop();
    }
}
