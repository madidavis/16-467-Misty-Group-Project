/**
 * Skill for Cognitive Aversion Task 1 Question 1 (Gaze)
 */

/** @brief      :       Audio File for Task */
const task1Speech = "Task1d.mp3"




/** @brief      :       Paths to Access Gaze Img Files */
const gazeImgPath = "eyeImages/"
const gazeImgLeft = [ "left_a.png", 
                    "left_b.png",
                    "left_c.png",
                    "left_d.png",
                    "left_e.png",
                    "left_f.png",
                    "left_g.png"]

const gazeImgRight = [ "right_a.png", 
                    "right_b.png",
                    "right_c.png",
                    "right_d.png",
                    "right_e.png",
                    "right_f.png",
                    "right_g.png",
                    "right_h.png",
                    "right_i.png",
                    "right_j.png",
                ]

const gazeImgUp    = [ "up_a.png", 
                    "up_b.png",
                    "up_c.png",
                    "up_d.png",
                    "up_e.png",
                    "up_f.png",
                    "up_g.png",
                    "up_h.png",
                    "up_i.png",
                    "up_j.png",
                    "up_k.png",
                    "up_l.png",
                    "up_m.png",
                ]

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
/** Probabilities for Cognitive Processing Gaze Aversion Direction */
const probLeft = 157;                                       /**< Probability Gaze Aversion is to the Left */
const probRight = 157;                                      /**< Probability Gaze Aversion is to the Left */
const probUp = 393;                                         /**< Probability Gaze Aversion is Up */
const probDown = 293;                                       /**< Probability Gaze Aversion is Down */


/** Cognitive aversion timing parameters*/ 
const CS_mean = 1.32;
const CS_stdev = 0.47;
const CE_mean = 2.23;
const CE_stdev = 0.63;

/** Construct an Array to Determine Direction Probabilities */
let probLeftArray = new Array(probLeft).fill("left");       
let probRightArray = new Array(probRight).fill("right");
let probUpArray = new Array(probUp).fill("up");
let probDownArray = new Array(probDown).fill("down");

let probGazeDirection = [].concat(probLeftArray, probRightArray, probUpArray, probDownArray);

/**
 * @brief       : function to randomly generate normal distributions with given mean and stdev
 * @returns     : function for normal distribution 
 */
function gaussian(mean, stdev) {
    var y2;
    var use_last = false;
    return function() {
      var y1;
      if (use_last) {
        y1 = y2;
        use_last = false;
      } else {
        var x1, x2, w;
        do {
          x1 = 2.0 * Math.random() - 1.0;
          x2 = 2.0 * Math.random() - 1.0;
          w = x1 * x1 + x2 * x2;
        } while (w >= 1.0);
        w = Math.sqrt((-2.0 * Math.log(w)) / w);
        y1 = x1 * w;
        y2 = x2 * w;
        use_last = true;
      }
  
      var retval = mean + stdev * y1;
      if (retval > 0)
        return retval;
      return -retval;
    }
}

let cognitiveStartDistribution = gaussian(CS_mean, CS_stdev);
let cognitiveEndDistribution = gaussian(CE_mean, CE_stdev);

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
            misty.Pause(50);
        }
    } else {
        for (let idx=(lstLen-1); idx>=0; idx--) {
            misty.DisplayImage(gazeImgLeft[idx]);
            misty.Pause(50);
        }
    }
}

function gazeRight(dir) {
    let lstLen = gazeImgRight.length;

    /** Loop through all Right Images and Display on Misty */
    if (dir == "forward") {
        for (let idx=0; idx<lstLen; idx++) {
            misty.DisplayImage(gazeImgRight[idx]);
            misty.Pause(50);
        }
    } else {
        for (let idx=(lstLen-1); idx>=0; idx--) {
            misty.DisplayImage(gazeImgRight[idx]);
            misty.Pause(50);
        }
    }
}

function gazeUp(dir) {
    let lstLen = gazeImgUp.length;

    /** Loop through all Up Images and Display on Misty */
    if (dir == "forward") {
        for (let idx=0; idx<lstLen; idx++) {
            misty.DisplayImage(gazeImgUp[idx]);
            misty.Pause(50);
        }
    } else {
        for (let idx=(lstLen-1); idx>=0; idx--) {
            misty.DisplayImage(gazeImgUp[idx]);
            misty.Pause(50);
        }
    }
}

function gazeDown(dir) {
    let lstLen = gazeImgDown.length;

    /** Loop through all Up Images and Display on Misty */
    if (dir == "forward") {
        for (let idx=0; idx<lstLen; idx++) {
            misty.DisplayImage(gazeImgDown[idx]);
            misty.Pause(50);
        }
    } else {
        for (let idx=(lstLen-1); idx>=0; idx--) {
            misty.DisplayImage(gazeImgDown[idx]);
            misty.Pause(50);
        }
    }
}

/** Main calling sequence */
// Determine Length of Aversion
startTime = cognitiveStartDistribution();
endTime = cognitiveEndDistribution();
var totalAversionTime = startTime + endTime;

// Determine aversion direction
let gazeDir = determineGazeDirection();

// Determine length of pause before aversion
let pauseTime = 7 + Math.floor(Math.random() * 4);


// Play Audio
misty.PlayAudio(task1Speech, 10);
misty.Pause(pauseTime);

//Run Gaze Aversion
gazeAversionForward(gazeDir);
misty.Pause(totalAversionTime * 1000);
gazeAversionBackward(gazeDir);