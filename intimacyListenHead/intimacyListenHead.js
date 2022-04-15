// cognitive aversion head move skill
// import "gaussian"

// cognitive processing aversion
const IL_mean = 1.14;
const IL_stdev = 0.27;
const ILD_mean = 7.21;
const ILD_stdev = 1.88;

//aversionLengthDistribution = gaussian(IL_mean, IL_stdev);
//aversionDistanceDistribution = gaussian(ILD_mean, ILD_stdev);

/*
 * @brief : function to randomly generate direction based on probability
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

/*
 * @brief : get pitch, roll, yaw for given direction
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

/*
 * @brief : intimacy gaze aversion while listening
 */
function intimacyListenAversion() {
    //var aversionLength = cognitiveStartDistribution.ppf(Math.random());
    aversionLength = 1.14;
    var direction = sampleDirection();
    var angles = getAngles(direction);
    // aversion
    misty.MoveHead(angles[0], angles[1], angles[2], null, aversionLength);
    // move back to neutral position
    misty.MoveHead(0, 0, 0, 95, null);

}

misty.MoveHead(0, 0, 0, 95, null);

while (true) {
    //var aversionDistance = cognitiveEndDistribution.ppf(Math.random());
    aversionDistance = 7.21;
    intimacyListenAversion();
    misty.Pause(aversionDistance * 1000);
}




