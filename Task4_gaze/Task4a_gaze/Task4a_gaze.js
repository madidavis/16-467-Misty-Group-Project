/**
 * Skill for Utterance Aversion Task 4 Question 1 (Eyes)
 */

/** @brief      :       Audio File for Task */
const task4Speech_a = "task4_1a.mp3";
const task4Speech_b = "task4_1b.mp3";
const speechLen = 3.5;
const volume = 10;

/** @brief      :       Paths to Access Gaze Img Files */
let gazeImgPath = "eyeImages/"
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
/** Probabilities for Inimacy Regulation Gaze Aversion Direction */
const probLeft = 288;                                       /**< Probability Gaze Aversion is to the Left */
const probRight = 288;                                      /**< Probability Gaze Aversion is to the Left */
const probUp = 137;                                         /**< Probability Gaze Aversion is Up */
const probDown = 287;                                       /**< Probability Gaze Aversion is Down */


/** Intimacy aversion timing parameters*/ 
const US_mean = 1.03;
const US_stdev = 0.39;
const UE_mean = 1.27;
const UE_stdev = 0.51;


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

let utteranceStartDistribution = gaussian(US_mean, US_stdev);
let utteranceEndDistribution = gaussian(UE_mean, UE_stdev);

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

function utteranceAversion() {
    startTime = utteranceStartDistribution();
    endTime = utteranceEndDistribution();
    var totalAversionTime = startTime + endTime;
    let gazeDir = determineGazeDirection();
    gazeAversionForward(gazeDir);
    misty.Pause(totalAversionTime * 1000);
    gazeAversionBackward(gazeDir);
}

// Determine length of pause between phrases (2 - 4)
let pauseTime = 1 + Math.floor(Math.random());

// play first phrase
misty.PlayAudio(task4Speech_a, volume);

// pause for duration of audio
misty.Pause(speechLen * 1000);

// pause for a random duration
misty.Pause(pauseTime * 1000);

// Run Gaze Aversion
utteranceAversion();

// pause for a random duration
misty.Pause(pauseTime * 1000);

// play second phrase
misty.PlayAudio(task4Speech_b, volume);