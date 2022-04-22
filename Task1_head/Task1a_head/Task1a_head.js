/**
 * Skill for Cognitive Aversion Task 1 Question 1 (Head)
 */

/** @brief      :       Audio File for Task */
const task1Speech = "Task1a.mp3"

// cognitive processing aversion
const CS_mean = 1.32;
const CS_stdev = 0.47;
const CE_mean = 2.23;
const CE_stdev = 0.63;

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

/** Normal distributions for timing samples */
let cognitiveStartDistribution = gaussian(CS_mean, CS_stdev);
let cognitiveEndDistribution = gaussian(CE_mean, CE_stdev);

/**
 * @brief       : function to randomly generate direction based on probability
 * @returns     : name of direction to avert to 
 */
function sampleDirection() {
    // up (39.3%), down (29.4%), left (15.7%), right (15.7%)
    var prob = Math.random();
    if (prob < 0.393)
        return "up";
    else if (prob < 0.687)
        return "down";
    else if (prob < 0.844)
        return "left";
    else return "right";
}


/**
 * @brief       : get pitch, roll, yaw for given direction
 * @returns     : array of p, r, y angles
 */
function getAngles(direction) {
    switch (direction) {
        case "up":
            return [20, 0, 0];
        case "down":
            return [-22, 0, 0];
        case "left":
            return [0, 0, -28];
        case "right":
            return [0, 0, 28];
        default:
            return [0, 0, 0];
    }
}

function cognitiveAversion() {
    startTime = cognitiveStartDistribution();
    endTime = cognitiveEndDistribution();
    var totalAversionTime = startTime + endTime;
    var direction = sampleDirection();
    var angles = getAngles(direction);
    misty.MoveHead(angles[0], angles[1], angles[2], 99, null);
    misty.Pause(totalAversionTime * 1000);
}

// set to neutral position
misty.MoveHead(0, 0, 0, 99, null);
cognitiveAversion();
misty.MoveHead(0, 0, 0, 99, null);





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
misty.PlayAudio("Task1a.mp3", 100);
misty.Pause(pauseTime);

//Run Gaze Aversion
misty.MoveHead(0, 0, 0, 99, null);
cognitiveAversion();
misty.MoveHead(0, 0, 0, 99, null);