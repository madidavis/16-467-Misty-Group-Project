/**
 * File for Floor Management Aversion Skill - Head Only
 */

/** Floor management timing parameters */
const US_mean = 1.03;
const US_stdev = 0.39;
const UE_mean = 1.27;
const UE_stdev = 0.51;

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
let utteranceStartDistribution = gaussian(US_mean, US_stdev);
let utteranceEndDistribution = gaussian(UE_mean, UE_stdev);

/**
 * @brief       : function to randomly generate direction based on probability
 * @returns     : name of direction to avert to 
 */
function sampleDirection() {
    // up (21.3%), down (29.5%), left (24.6%), right (24.6%)
    var prob = Math.random();
    if (prob < 0.213)
        return "up";
    else if (prob < 0.508)
        return "down";
    else if (prob < 0.754)
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
            return [15, 0, 0];
        case "down":
            return [-16, 0, 0];
        case "left":
            return [0, 0, -25];
        case "right":
            return [0, 0, 25];
        default:
            return [0, 0, 0];
    }
}

function utteranceAversion() {
    startTime = utteranceStartDistribution();
    endTime = utteranceEndDistribution();
    var totalAversionTime = startTime + endTime;
    var direction = sampleDirection();
    var angles = getAngles(direction);
    misty.MoveHead(angles[0], angles[1], angles[2], 99, null);
    misty.Pause(totalAversionTime * 1000);
}

// set to neutral position
misty.MoveHead(0, 0, 0, 99, null);
utteranceAversion();
misty.MoveHead(0, 0, 0, 99, null);



