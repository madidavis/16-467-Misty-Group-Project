// cognitive aversion head move skill
// import "gaussian"

// cognitive processing aversion
const CS_mean = 1.32;
const CS_stdev = 0.47;
const CE_mean = 2.23;
const CE_stdev = 0.63;

//cognitiveStartDistribution = gaussian(CS_mean, CS_stdev);
//cognitiveEndDistribution = gaussian(CE_mean, CE_stdev);

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
    //var startTime = cognitiveStartDistribution.ppf(Math.random());
    //var endTime = cognitiveEndDistribution.ppf(Math.random());
    startTime = 1.32;
    endTime = 2.23;
    misty.Debug("times calculated");
    var totalAversionTime = startTime + endTime;
    var direction = sampleDirection();
    var angles = getAngles(direction);
    misty.MoveHead(angles[0], angles[1], angles[2], null, totalAversionTime);
}

// set ot neutral position

misty.Debug("Moving to neutral position\n");

misty.MoveHead(0, 0, 0, 95, null);
cognitiveAversion();

misty.Debug("Aversion complete, moving to neutral again\n");
misty.MoveHead(0, 0, 0, 95, null);



