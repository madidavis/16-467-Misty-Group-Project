gaussian = require("gaussian");

/* Global variables declaration */
// STATES 
// Init - Initial, 
// LI - Listening + Intimacy, LCS - Listening + Cognition Start, LUS - Listening + Utterance Start
// SCE - Speaking + Cognition End, SI - Speaking + Intimacy, 
// SUS - Speaking + Utterance Start, SUE - Speaking + Utterance End

const gazeState = {
    initial : 0, 
    LI : 1,
    LCS : 2,
    LUS : 3,        
    SCE : 4, 
    SI : 5, 
    SUS : 6,
    SUE : 7,
};

// cognitive processing aversion
const CS_mean = 1.32;
const CS_stdev = 0.47;
const CE_mean = 2.23;
const CE_stdev = 0.63;

// intimacy regulation aversion
const IL_mean = 1.14;
const IL_stdev = 0.27;
const ILD_mean = 7.21;
const ILD_stdev = 1.88;
const IS_mean = 1.96;
const IS_stdev = 0.32;
const ISD_mean = 4.75;
const ISD_stdev = 1.39;

// floor management aversion
const US_mean = 1.03;
const US_stdev = 0.39;
const UE_mean = 1.27;
const UE_stdev = 0.51;

/* Helper functions */

// pauses execution for given time
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    }
    while (currentDate - date < milliseconds);
}

class Gaze {

    /*
     *  @brief : constructor for gaze class
     *  @param[in] : task number
     */
    constructor(taskNum) {
        task = taskNum;
        state = gazeState.initial;
        // distributions to sample times from
        cognitiveStartDistribution = null;
        cognitiveEndDistribution = null;
        intimacyListeningDistribution = null;
        intimacyDistanceListeningDistribution = null;
        intimacySpeakingDistribution = null;
        intimacyDistanceSpeakingDistribution = null;
        utteranceStartDistribution = null;
        utteranceEndDistribution = null;
        // end flag for gaze model
        endFlag = false;
        // time elapsed since gaze model started running
        timeElapsed = 0;
        startTime = 0;
        // cognitiveEvent and responseUtterance has to be updated based on user audio/phrase loaded
        cognitiveEvent = false;     // flag if cognitive event has occured
        responseUtterance = false;  // flag if response has to be uttered or if there is pause in between phrase
    }

    /*
     *  @brief : initialize variables for distributions to sample from
     */ 
    initializeVariables() {
        // need normal distributions for the following:
        this.cognitiveStartDistribution = gaussian(CS_mean, CS_stdev);
        this.cognitiveEndDistribution = gaussian(CE_mean, CE_stdev);
        this.intimacyListeningDistribution = gaussian(IL_mean, IL_stdev);
        this.intimacyDistanceListeningDistribution = gaussian(ILD_mean, ILD_stdev);
        this.intimacySpeakingDistribution = gaussian(IS_mean, IS_stdev);
        this.intimacyDistanceSpeakingDistribution = gaussian(ISD_mean, ISD_stdev);
        this.utteranceStartDistribution = gaussian(US_mean, US_stdev);
        this.utteranceEndDistribution = gaussian(UE_mean, UE_stdev);
    }

    /*
     *  @brief : start gaze model state update loop 
     */
    start() {
        this.startTime = Date.now();
        while (!this.endFlag) {
            // update gaze every 0.1 second
            sleep(100);
            this.stateUpdate();
        }
    }

    /*
     *  @brief : state update step based on inputs 
     */
    stateUpdate() {
        switch (this.state) {
            case initial : 
                        if (this.task == 1 || this.task == 2) {
                            // start with LI for Tasks 1 and 2
                            this.state = gazeState.LI;
                            this.listentingIntimacy();
                        }
                        else {
                            // start with SI for Tasks 3 and 4
                            this.state = gazeState.SI;
                            this.speakingIntimacy();
                        }
                        break;
            case LI : 
                        if (this.cognitiveEvent == true) {
                            this.state = LCS;
                            this.cognitiveAversion();
                            this.cognitiveEvent = false;
                        }
                        else if (this.responseUtterance == true) {
                            this.state = LUS;
                            this.changeSpeaker();
                            this.responseUtterance = false;
                        }
                        else this.state = LI;
                        break;
            case LUS :  // should never run into this state here
            case LCS :  // should never run into this state here
            case SCE :  // should never run into this state here
            case SI :   
                        if (this.responseUtterance == false) {
                            this.state = LI;
                            this.listentingIntimacy();
                        }
                        else {
                            this.state = SUS;
                            this.pauseSpeaking();
                            this.responseUtterance = false;
                        }
                        break;
            case SUS :  // should never run into this state here
            case SUE :  // should never run into this state here 
            default :   // should never run into this state here
        }
    }

    /*
     *  @brief : stop gaze model sequence
     */
    endGaze()
    
    /*
     *  @brief : listening for audio input with intimacy regulation aversions
     */
    listentingIntimacy()

    /*
     *  @brief : speaking phrase(s) with intimacy regulation aversions
     */
    speakingIntimacy()

    /*
     *  @brief : cognitive event aversion sequence LI -> LCS -> SCE -> LI or SI
                 if phrase longer than aversion time, start speaking intimacy, otherwise back to LI
     */
    cognitiveAversion()

    /*
     *  @brief : turn-taking (floor management) pause within speaking SI -> SUS -> SUE -> SI
     */
    pauseSpeaking()

    /*
     *  @brief : turn-taking (floor management) speaker change LI -> LUS -> SUE -> SI
     */
    changeSpeaker()

    /*
     *  @brief : sample direction for aversion based on type of aversion
     */
    sampleDirection()
}

// Need functions for the following:

// Cognitive Processing:
// checking if cognitive event is to occur

// Floor Management:
// checking if need to respond (LUS) without cognitive event
// checking if there is a pause in the phrase to be said
// if there are pauses, split up phrase so that floor managament sequence can be run during pauses

// loading response phrases based on task (will be defined in task files)
// checking if mutual gaze has been established





