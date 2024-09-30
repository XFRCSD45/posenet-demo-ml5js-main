let capture;
let posenet;
let singlePose, skeleton;
let actor_img, specs, smoke;

function preload() {
    // Load assets
    actor_img = loadImage('images/shahrukh.png');
    specs = loadImage('images/spects.png');
}

function setup() {
    createCanvas(800, 500);
    capture = createCapture(VIDEO);
    capture.size(800, 500);
    capture.hide();

    // Load PoseNet model
    posenet = ml5.poseNet(capture, modelLoaded);
    posenet.on('pose', receivedPoses);
}

function modelLoaded() {
    console.log('PoseNet Model Loaded');
}

function receivedPoses(poses) {
    if (poses.length > 0) {
        singlePose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }
}

function draw() {
    image(capture, 0, 0, 800, 500);

    if (singlePose) {
        // Draw keypoints
        for (let i = 0; i < singlePose.keypoints.length; i++) {
            let x = singlePose.keypoints[i].position.x;
            let y = singlePose.keypoints[i].position.y;
            fill(0, 255, 0);
            ellipse(x, y, 10, 10);
        }

        // Draw skeleton
        if (skeleton) {
            stroke(255, 255, 255);
            strokeWeight(2);
            for (let j = 0; j < skeleton.length; j++) {
                let partA = skeleton[j][0];
                let partB = skeleton[j][1];
                line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
            }
        }
    }
}
