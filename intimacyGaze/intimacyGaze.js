/** @brief      :       Paths to Access Gaze Img Files */
let gazeImgPath = "eyeImages/"
let gazeImgLeft = [ "left_a.png", 
                    "left_b.png",
                    "left_c.png",
                    "left_d.png",
                    "left_e.png",
                    "left_f.png",
                    "left_g.png"]

let gazeImgRight = [ "right_a.png", 
                    "right_b.png",
                    "right_c.png",
                    "right_d.png",
                    "right_e.png",
                    "right_f.png",
                    "right_g.png"]

let gazeImgUp    = [ "up_a.png", 
                    "up_b.png",
                    "up_c.png",
                    "up_d.png",
                    "up_e.png",
                    "up_f.png",
                    "up_g.png",
                    "up_h.png",
                    "up_i.png",
                    "up_j.png",
                    "up_k.png"]

let gazeImgDown = [ "down_a.png", 
                    "down_b.png",
                    "down_c.png",
                    "down_d.png",
                    "down_e.png",
                    "down_f.png",
                    "down_g.png",
                    "down_h.png",
                    "down_i.png",
                    "down_j.png",
                    "down_k.png"]


/** @brief      :       Variables regarding proabilities for different Gaze Aversion Parameters */
/** Intimacy Regulation Whilst Listening */
const listenLengthMean = 1.14;                              /**< Mean Length of Aversion Whilst Listening */
const listenLengthStdev = 0.27;                             /**< Stdev of Length of Aversion Whilst Listening */
const listenDistanceMean = 7.21;                            /**< Mean Time between consecutive gaze aversion events whilst listening */
const listenDistancestdev = 1.88;                           /**< Stdev Tme between consecutive Gaze Events whilst listening */

/** Intimacy Regulation Whilst Speaking */
const speakLengthMean = 1.96;                               /**< Mean Length of Aversion Whilst speaking */
const speakLengthStdev = 0.32;                              /**< Stdev of Length of Aversion Whilst speaking */
const speakDistanceMean = 4.75;                             /**< Mean Time between consecutive gaze aversion events whilst speaking */
const speakDistanceStdev = 1.39;                            /**< Stdev Tme between consecutive Gaze Events whilst speaking */

/** Probabilities for Inimacy Regulation Gaze Aversion Direction */
const probLeft = 288;                                       /**< Probability Gaze Aversion is to the Left */
const probRight = 288;                                      /**< Probability Gaze Aversion is to the Left */
const probUp = 137;                                         /**< Probability Gaze Aversion is Up */
const probDown = 287;                                       /**< Probability Gaze Aversion is Down */

/** Construct an Array to Determine Direction Probabilities */
let probLeftArray = new Array(probLeft).fill("left");       
let probRightArray = new Array(probRight).fill("right");
let probUpArray = new Array(probUp).fill("up");
let probDownArray = new Array(probDown).fill("down");

let probGazeDirection = [].concat(probLeftArray, probRightArray, probUpArray, probDownArray);

//let dir = determineGazeDirection()
while (true) {
    misty.Pause(7000);
    let gazeDir = determineGazeDirection();
    gazeAversionForward(gazeDir);
    misty.Pause(500);
    gazeAversionBackward(gazeDir);
}



/**
 * @brief       :       Randomly Determine Direction for Intimacy Regulation Gaze Aversion
 * @returns     :       Return path to image files
 */
function determineGazeDirection() {
    // Determine Gaze Direction by Randomly sampling from gaze direction array
    let gazeIndex = Math.floor(Math.random() * 1000);
    let gazeDirection = probGazeDirection[gazeIndex];

    // gaze direction
    return gazeDirection 
}

function gazeAversionForward(dir) {
    switch(dir) {
        case 'left':
            gazeLeft("forward");
            break;
        case 'right':
            gazeRight("forward");
            break;
        case 'up':
            gazeUp("forward");
            break;
        case 'down':
            gazeDown("forward");
    }
}

function gazeAversionBackward(dir) {
    switch(dir) {
        case 'left':
            gazeLeft("backward");
            break;
        case 'right':
            gazeRight("backward");
            break;
        case 'up':
            gazeUp("backward");
            break;
        case 'down':
            gazeDown("backward");
    }
}


function gazeLeft(dir) {
    let lstLen = gazeImgLeft.length;

    /** Loop through all Left Images and Display on Misty */
    if (dir == "forward") {
        for (let idx=0; idx<lstLen; idx++) {
            misty.DisplayImage(gazeImgLeft[idx]);
            misty.Pause(100);
        }
    } else {
        for (let idx=(lstLen-1); idx>=0; idx--) {
            misty.DisplayImage(gazeImgLeft[idx]);
            misty.Pause(100);
        }
    }
}

function gazeRight(dir) {
    let lstLen = gazeImgRight.length;

    /** Loop through all Right Images and Display on Misty */
    if (dir == "forward") {
        for (let idx=0; idx<lstLen; idx++) {
            misty.DisplayImage(gazeImgRight[idx]);
            misty.Pause(100);
        }
    } else {
        for (let idx=(lstLen-1); idx>=0; idx--) {
            misty.DisplayImage(gazeImgRight[idx]);
            misty.Pause(100);
        }
    }
}

function gazeUp(dir) {
    let lstLen = gazeImgUp.length;

    /** Loop through all Up Images and Display on Misty */
    if (dir == "forward") {
        for (let idx=0; idx<lstLen; idx++) {
            misty.DisplayImage(gazeImgUp[idx]);
            misty.Pause(100);
        }
    } else {
        for (let idx=(lstLen-1); idx>=0; idx--) {
            misty.DisplayImage(gazeImgUp[idx]);
            misty.Pause(100);
        }
    }
}

function gazeDown(dir) {
    let lstLen = gazeImgDown.length;

    /** Loop through all Up Images and Display on Misty */
    if (dir == "forward") {
        for (let idx=0; idx<lstLen; idx++) {
            misty.DisplayImage(gazeImgDown[idx]);
            misty.Pause(100);
        }
    } else {
        for (let idx=(lstLen-1); idx>=0; idx--) {
            misty.DisplayImage(gazeImgDown[idx]);
            misty.Pause(100);
        }
    }
}

