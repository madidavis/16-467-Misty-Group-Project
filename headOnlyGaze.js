const fs = require('fs')
const path = require('path')

class HeadOnlyGaze{
    constructor(misty) {
        this.misty = misty;

        /** Absolute Movement Positions for head movement */
        this.absMovementUp = 20;
        this.absMovementDown = -22;
        this.absMovementSide = 28;

        /** Mapped movements for misty robot */
        this.mistyUp = 0;
        this.mistyDown = 0;
        this.mistyLeft = 0;
        this.mistyRight = 0;
    }

    /**
     *  @brief      :       Map absolute head positions in degrees to misty head movement range
     */
    //mapMistyMovements() {

    //}
    /**
     *  @brief      :       Run animation for Misty Gaze Left
     *  @param[in]  :       dir - Direction of Gaze (i.e. forward or back)
     *  @param[in]  :       velocity - Speed of Head Movement
     */
    gazeLeft(dir, velocity) {
        if (dir == "forward") {
            this.misty.SetHeadDegrees("yaw", this.mistyLeft, velocity)
        } else {
            this.misty.SetHeadDegrees("yaw", 0, velocity)
        }
    }

    /**
     *  @brief      :       Run animation for Misty Gaze Right
     *  @param[in]  :       dir - Direction of Gaze (i.e. forward or back)
     *  @param[in]  :       velocity - Speed of Head Movement
     */
    gazeRight(dir, velocity) {
        if (dir == "forward") {
            this.misty.SetHeadDegrees("yaw", this.mistyRight, velocity)
        } else {
            this.misty.SetHeadDegrees("yaw", 0, velocity)
        }
    }

    /**
     *  @brief      :       Run animation for Misty Gaze Up
     *  @param[in]  :       dir - Direction of Gaze (i.e. forward or back)
     *  @param[in]  :       velocity - Speed of Head Movement
     */
    gazeUp(dir, velocity) {
        if (dir == "forward") {
            this.misty.SetHeadDegrees("pitch", this.mistyUp, velocity)
        } else {
            this.misty.SetHeadDegrees("pitch", 0, velocity)
        }
    }

    /**
     *  @brief      :       Run animation for Misty Gaze Down
     *  @param[in]  :       dir - Direction of Gaze (i.e. forward or back)
     *  @param[in]  :       velocity - Speed of Head Movement
     */
    gazeDown(dir, velocity) {
        if (dir == "forward") {
            this.misty.SetHeadDegrees("pitch", this.mistyDown, velocity)
        } else {
            this.misty.SetHeadDegrees("pitch", 0, velocity)
        }
    }
}