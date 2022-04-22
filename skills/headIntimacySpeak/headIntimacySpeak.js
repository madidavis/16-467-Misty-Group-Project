/**
 * File for Intimacy Regulation Head Aversion Skill - Head Only
 */

/** Intimacy aversion timing parameters*/ 
const IS_mean = 1.96;
const IS_stdev = 0.32;
const ISD_mean = 4.75;
const ISD_stdev = 0.32;

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
let speakAversionLengthDistribution = gaussian(IS_mean, IS_stdev);
let speakAversionDistanceDistribution = gaussian(ISD_mean, ISD_stdev);

/**
 * @brief       : function to randomly generate direction based on probability
 * @returns     : name of direction to avert to 
 */
function sampleDirection() {
    // up (28.8%), down (28.8%), left (13.7%), right (13.7%)
    var prob = Math.random();
    if (prob < 0.288)
        return "up";
    else if (prob < 0.576)
        return "down";
    else if (prob < 0.713)
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
            return [8, 0, 0];
        case "down":
            return [-8.8, 0, 0];
        case "left":
            return [0, 0, -11.2];
        case "right":
            return [0, 0, 11.2];
        default:
            return [0, 0, 0];
    }
}

/**
 * @brief       : intimacy gaze aversion while speaking
 */
function intimacySpeakAversion() {
    aversionLength = speakAversionLengthDistribution();
    // aversionLength = 1.14;
    var direction = sampleDirection();
    var angles = getAngles(direction);

    // aversion with velocity profile
    // misty.MoveHead(angles[0] / 2, angles[1] / 2, angles[2] / 2, 50, null);
    misty.MoveHead(angles[0], angles[1], angles[2], 99, null);

    misty.Pause(aversionLength * 1000);

    // move back to neutral position

    misty.MoveHead(0, 0, 0, 99, null);

}

misty.MoveHead(0, 0, 0, 99, null);
/** Main loop */
while (true) {
    aversionDistance = speakAversionDistanceDistribution();
    // aversionDistance = 7.21;
    intimacySpeakAversion();
    misty.Pause(aversionDistance * 1000);
}




