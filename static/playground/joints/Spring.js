class Spring {
    constructor(joint1, joint2, springStrength) {
        this.joint1 = joint1;
        this.joint2 = joint2;
        this.restLength = joint1.position.dist(joint2.position);

        this.springStrength = springStrength || DEFAULT_SPRING_STRENGTH;

        this.update();
    }

    update() {
        this.middle = p5.Vector.lerp(this.joint1.position, this.joint2.position, 0.5);
        let displacement = this.length - this.restLength;

        let stretch = -1 * this.springStrength * displacement;

        let joint1Pull = p5.Vector.sub(this.joint1.position, this.joint2.position);
        let joint2Pull = p5.Vector.sub(this.joint2.position, this.joint1.position);

        this.length = joint1Pull.mag();

        joint1Pull.normalize();
        joint2Pull.normalize();
        joint1Pull.mult(stretch);
        joint2Pull.mult(stretch);

        this.joint1.applyForce(joint1Pull);
        this.joint2.applyForce(joint2Pull);
    }

    draw() {
        push();

        fill(color("red"));

        stroke(0);
        strokeWeight(0.5);
        line(
            this.joint1.position.x, this.joint1.position.y,
            this.joint2.position.x, this.joint2.position.y
        );

        noStroke();
        ellipse(this.middle.x, this.middle.y, 2, 2);

        pop();
    }
}