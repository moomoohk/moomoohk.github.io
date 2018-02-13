const joints = [];
const blocks = [];
const connections = [];

const DEFAULT_SPRING_DAMPENING = .995;
const DEFAULT_SPRING_STRENGTH = .1;
const GRAVITY = 8;

const JOINTS = 40;

let gravity;
let wind;

let mouseJoint;

function setup() {
    createCanvas(window.innerWidth, 400);

    gravity = createVector(0, GRAVITY);
    wind = p5.Vector.random2D();

    for (let i = 0; i <= TWO_PI * 5; i += 0.1) {
        joints.push(new Joint(createVector(100 + sin(i) * 50, 100 + cos(i) * 50), 10));
    }
    for (let i = 0; i < joints.length; i++) {
        for (let j = 0; j < joints.length; j++) {
            if (!connections.some((spring) =>
                    spring.joint1 == joints[i] && spring.joint2 == joints[j] ||
                        spring.joint1 == joints[j] && spring.joint2 == joints[i]
                )) {
                // connections.push(new Spring(joints[i], joints[j]));
            }
        }
    }

    mouseJoint = new Joint(createVector(200, 200), 20, false);
    joints.push(mouseJoint);

    for (let i = 1; i <= JOINTS; i++) {
        let joint = new Joint(createVector(round(random(50, 150)), round(random(50, 150))), 10);
        for (let j = 1; j <= round(random(1, 2)); j++) {
            let joint2 = joints[round(random(0, joints.length - 1))];
            if (joint2 != undefined) {
                let connection = new Spring(joint, joint2);
                connections.push(connection);
            }
        }
        joints.push(joint);
    }

    // let j1 = new Joint(createVector(100, 100), 20);
    // let j2 = new Joint(createVector(120, 80), 20);
    // let conn = new Spring(j1, j2);
    // joints.push(j1);
    // joints.push(j2);

    let j2 = new Joint(p5.Vector.add(mouseJoint.position, createVector(0, 20)), 10);
    let conn = new Spring(mouseJoint, j2, .07);
    connections.push(conn);

    joints.push(j2);

    let block = new Block(100, 300, 40, 150);
    let block2 = new Block(160, 250, 40, 10);
    let block3 = new Block(60, 280, 40, 10);
    blocks.push(block, block2, block3);
}

let mouseDown = false;

function draw() {
    if (mouseDown) {
        gravity = createVector(0, -GRAVITY);
        // console.log(blocks[0].intersects(new Line(
        //     createVector(mouseJoint.position.x, mouseJoint.position.y),
        //     createVector(mouseX, mouseY))
        // ));
    } else {
        gravity = createVector(0, GRAVITY);
    }

    // wind = p5.Vector.random2D();
    // wind.mult(round(random(1, 15)));

    background(255);

    joints.forEach(function (joint) {
        if (joint != mouseJoint) {
            joint.applyForce(gravity);
            joint.applyForce(wind);
        } else {
            joint.acceleration.mult(0);
            joint.velocity.mult(0);
            // joint.position = createVector(mouseX, mouseY);
            joint.velocity.add(p5.Vector.sub(createVector(mouseX, mouseY), joint.position));
        }
        joint.update();
    });
    connections.forEach((connection) => connection.update());

    blocks.forEach((block) => block.draw());
    connections.forEach((connection) => connection.draw());
    joints.forEach((joint) => joint.draw());
}

function mousePressed() {
    mouseDown = true;
}

function mouseReleased() {
    mouseDown = false;
}