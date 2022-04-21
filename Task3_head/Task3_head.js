/*
 * File for Intimacy Regulation Head Aversion Skill - Head Only
 */

/** Intimacy aversion timing parameters */ 
const IL_mean = 1.14;
const IL_stdev = 0.27;
const ILD_mean = 7.21;
const ILD_stdev = 1.88;

/** Intimacy aversion timing parameters */
const IS_mean = 1.96;
const IS_stdev = 0.32;
const ISD_mean = 4.75;
const ISD_stdev = 0.32;

/** cognitive processing aversion timing parameters*/ 
const CS_mean = 1.32;
const CS_stdev = 0.47;
const CE_mean = 2.23;
const CE_stdev = 0.63;

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

/** Normal distributions for timing samples listening intimacy*/
let listenAversionLengthDistribution = gaussian(IL_mean, IL_stdev);
let listenAversionDistanceDistribution = gaussian(ILD_mean, ILD_stdev);

/** Normal distributions for timing samples speaking intimacy*/
let speakAversionLengthDistribution = gaussian(IS_mean, IS_stdev);
let speakAversionDistanceDistribution = gaussian(ISD_mean, ISD_stdev);

/** Normal distributions for timing samples cognitive aversion*/
let cognitiveStartDistribution = gaussian(CS_mean, CS_stdev);
let cognitiveEndDistribution = gaussian(CE_mean, CE_stdev);

/** Normal distributions for timing samples */
let utteranceStartDistribution = gaussian(US_mean, US_stdev);
let utteranceEndDistribution = gaussian(UE_mean, UE_stdev);


/***************************** Direction Sampling ****************************/

/**
 * @brief       : function to randomly generate direction based on probability
 * @returns     : name of direction to avert to 
 */
function sampleDirectionIntimacy() {
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
 * @brief       : function to randomly generate direction based on probability
 * @returns     : name of direction to avert to
 */
 function sampleDirectionCognitive() {
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
 * @brief       : function to randomly generate direction based on probability
 * @returns     : name of direction to avert to 
 */
 function sampleDirectionFloor() {
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


/***************************** Angle Calculation *****************************/


/**
 * @brief       : get pitch, roll, yaw for given direction listening intimacy
 * @returns     : array of p, r, y angles
 */
function getAnglesListen(direction) {
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
 * @brief       : get pitch, roll, yaw for given direction speaking intimacy
 * @returns     : array of p, r, y angles
 */
 function getAnglesSpeak(direction) {
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
 * @brief       : get pitch, roll, yaw for given direction cognitive 
 * @returns     : array of p, r, y angles
 */
 function getAnglesCognitive(direction) {
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

/**
 * @brief       : get pitch, roll, yaw for given direction
 * @returns     : array of p, r, y angles
 */
 function getAnglesFloor(direction) {
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

/****************************** Movement Helpers *****************************/

/**
 * @brief       : intimacy gaze aversion while listening
 */
function intimacyListenAversion() {
    aversionLength = listenAversionLengthDistribution();
    var direction = sampleDirectionIntimacy();
    var angles = getAnglesListen(direction);
    misty.MoveHead(angles[0], angles[1], angles[2], 99, null);
    misty.Pause(aversionLength * 1000);
    // move back to neutral position
    misty.MoveHead(0, 0, 0, 99, null);
}

/**
 * @brief       : intimacy gaze aversion while speaking
 */
 function intimacySpeakAversion() {
    aversionLength = speakAversionLengthDistribution();
    var direction = sampleDirectionIntimacy();
    var angles = getAnglesSpeak(direction);
    misty.MoveHead(angles[0], angles[1], angles[2], 99, null);
    misty.Pause(aversionLength * 1000);
    // move back to neutral position
    misty.MoveHead(0, 0, 0, 99, null);

}

/**
 * @brief       : cognitive gaze aversion sequence
 */
function cognitiveAversion() {
    startTime = cognitiveStartDistribution();
    endTime = cognitiveEndDistribution();
    var totalAversionTime = startTime + endTime;
    var direction = sampleDirectionCognitive();
    var angles = getAnglesCognitive(direction);
    misty.MoveHead(angles[0], angles[1], angles[2], 99, null);
    misty.Pause(totalAversionTime * 1000);
}

/**
 * @brief       : floor management gaze aversion 
 */
function utteranceAversion() {
    startTime = utteranceStartDistribution();
    endTime = utteranceEndDistribution();
    var totalAversionTime = startTime + endTime;
    var direction = sampleDirectionFloor();
    var angles = getAnglesFloor(direction);
    misty.MoveHead(angles[0], angles[1], angles[2], 99, null);
    misty.Pause(totalAversionTime * 1000);
}

/************************** Main Looping functions ***************************/

/**
 * @brief       : intimacy gaze aversion while listening main loop
 */
function startIntimacyListenHead() {
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
 * @brief       : intimacy gaze aversion while speaking main loop
 */
function startIntimacySpeakHead() {
    misty.MoveHead(0, 0, 0, 99, null);
    /** Main loop */
    while (true) {
        aversionDistance = speakAversionDistanceDistribution();
        intimacySpeakAversion();
        misty.Pause(aversionDistance * 1000);
    }
}

/**
 * @brief       : cognitive gaze aversion once
 */
function startCognitiveHead() {
    // set to neutral position
    misty.MoveHead(0, 0, 0, 99, null);
    cognitiveAversion();
    misty.MoveHead(0, 0, 0, 99, null);
}

/**
 * @brief       : floor management aversion once
 */
 function startFloorHead() {
    // set to neutral position
    misty.MoveHead(0, 0, 0, 99, null);
    utteranceAversion();
    misty.MoveHead(0, 0, 0, 99, null);
}

/************************** Listening for Audio ******************************/
/*
function initiateVoiceRecordEvent() 
{
    // VoiceRecord event messages return data about completed voice
    // recordings. 
    misty.AddReturnProperty("VoiceRecord", "Filename");
    misty.AddReturnProperty("VoiceRecord", "Success");
    misty.AddReturnProperty("VoiceRecord", "ErrorCode");
    misty.AddReturnProperty("VoiceRecord", "ErrorMessage");
    misty.RegisterEvent("VoiceRecord", "VoiceRecord", 10, true);
    
    // Registers a listener for KeyPhraseRecognized event messages
    misty.RegisterEvent("KeyPhraseRecognized", "KeyPhraseRecognized", 10, false);

    // We start key phrase recognition and set voice recording to begin
    // immediately after Misty heads the wake word ("Hey, Misty")
    misty.StartKeyPhraseRecognition(true, true, 15000);
    misty.Pause(1000);
    misty.ChangeLED(255, 255, 255);
}

function _VoiceRecord(data) 
{
    var filename = data.AdditionalResults[0];
    var success = data.AdditionalResults[1];
    var errorCode = data.AdditionalResults[2];
    var errorMessage = data.AdditionalResults[3];

    // If voice recording is successful, convert to text and get response
    if (success) 
    {
        misty.Debug("Audio Recording Successful");
        misty.GetAudioFile(filename, "speechToText");
    }
    // Otherwise, print the error message
    else 
    {
        misty.Debug("Error: " + errorCode + ". " + errorMessage);
    }
    misty.Set("recordingAudio", false, false);
} */

/**
 * @brief       : Main Task Sequence
 */
function startTask3(){

    initiateVoiceRecordEvent();
    // startIntimacySpeakHead();

    misty.PlayAudio("task3_1.mp3", 10);

    startIntimacyListenHead();

    /*
    // Hi Misty. Where are you from?
    startIntimacySpeakHead();
    misty.Speak("I'm originally from Copenhagen. What about you?")
    startIntimacyListenHead();
    //I'm from around here.
    misty.Speak("This seems like a nice place to live.")
    // Shall we talk about the position?
    misty.Speak("That sounds like a good idea. What can I tell you about my experience?")
    // How long have you worked in the industry?
    misty.Speak("I've been working in the industry for about 5 years now") */
    
    
}

startTask3()
    