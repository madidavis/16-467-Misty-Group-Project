function startTask1(){

startIntimacySpeakHead();
misty.Speak("Hi. My name is Misty. It's nice to meet you.")
startIntimacyListenHead();
// Hi Misty. Where are you from?
startIntimacySpeakHead();
misty.Speak("I'm originally from Copenhagen. What about you?")
startIntimacyListenHead();
//I'm from around here.
misty.Speak("This seems like a nice place to live.")
// Shall we talk about the position?
misty.Speak("That sounds like a good idea. What can I tell you about my experience?")
// How long have you worked in the industry?
misty.Speak("I've been working in the industry for about 5 years now")


}



/*
 * File for Intimacy Regulation Head Aversion Skill - Head Only
 */

/** Intimacy aversion timing parameters*/
const IL_mean = 1.14;
const IL_stdev = 0.27;
const ILD_mean = 7.21;
const ILD_stdev = 1.88;

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
let listenAversionLengthDistribution = gaussian(IL_mean, IL_stdev);
let listenAversionDistanceDistribution = gaussian(ILD_mean, ILD_stdev);

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
 * @brief       : intimacy gaze aversion while listening
 */
function intimacyListenAversion() {
    aversionLength = listenAversionLengthDistribution();
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

function startIntimacyListenHead(){
  misty.MoveHead(0, 0, 0, 99, null);
  /** Main loop */
  while (true) {
      aversionDistance = listenAversionDistanceDistribution();
      // aversionDistance = 7.21;
      intimacyListenAversion();
      misty.Pause(aversionDistance * 1000);
  }
}



/**
 * File for Intimacy Regulation Head Aversion Skill - Head Only
 */

/** Intimacy aversion timing parameters*/
const IS_mean = 1.96;
const IS_stdev = 0.32;
const ISD_mean = 4.75;
const ISD_stdev = 0.32;


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

function startIntimacySpeakHead(){
  misty.MoveHead(0, 0, 0, 99, null);
  /** Main loop */
  while (true) {
      aversionDistance = speakAversionDistanceDistribution();
      // aversionDistance = 7.21;
      intimacySpeakAversion();
      misty.Pause(aversionDistance * 1000);
  }
}


/**
 * File for Cognitive Processing Head Aversion Skill - Head Only
 */

// cognitive processing aversion
const CS_mean = 1.32;
const CS_stdev = 0.47;
const CE_mean = 2.23;
const CE_stdev = 0.63;

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
startCognitiveHead(){
  // set to neutral position
  misty.MoveHead(0, 0, 0, 99, null);
  cognitiveAversion();
  misty.MoveHead(0, 0, 0, 99, null);
}
