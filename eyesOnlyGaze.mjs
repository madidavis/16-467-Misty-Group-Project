import { readFileSync } from 'fs'
import * as path from 'path'
//const path = require('path')

export default class EyesOnlyGaze {
    constructor(misty) {
        this.misty = misty;                                        /**< Reference to Misty object class */

        this.imgFolderPath = "eyeImages/",                        /**< Path to folder of Eye Gaze Images */

        this.gazeLeftImgs = [];                                     /**< Ordered Array of Image Files for Left Gaze Animation */
        this.gazeRightImgs = [];                                    /**< Ordered Array of Image Files for Right Gaze Animation */
        this.gazeUpImgs = [];                                       /**< Ordered Array of Image Files for Up Gaze Animation */
        this.gazeDownImgs = [];                                     /**< Ordered Array of Image Files for Down Gaze Animation */
    }


    /**
     *  @brief      :       Upload all image files for eyes-only gaze and store in class attributes
     */
    loadEyeGazeImages() {
        /* Define Paths to each folder of images */
        let pathLeft = this.imgFolderPath + "left/";
        let pathRight = this.imgFolderPath + "right/";
        let pathUp = this.imgFolderPath + "up/";
        let pathDown = this.imgFolderPath + "down/";
        
        /* Temporary arrays to store images */
        let left = [];
        let right = [];
        let up = [];
        let down = [];
        
        /* Upload all images for left */
        fs.readdir(pathLeft, function(err, files) {
            if (err) {
                console.error("Could not list the directory ",err);
                process.exit(1);
            }

            files.forEach(function (file) {
                left.push(file);
            })
        })
        this.gazeLeftImgs = left;

        /* Upload all images for right */
        fs.readdir(pathRight, function(err, files) {
            if (err) {
                console.error("Could not list the directory ",err);
                process.exit(1);
            }

            files.forEach(function (file) {
                right.push(file);
            })
        })
        this.gazeRightImgs = right;

        /* Upload all images for up */
        fs.readdir(pathUp, function(err, files) {
            if (err) {
                console.error("Could not list the directory ",err);
                process.exit(1);
            }

            files.forEach(function (file) {
                up.push(file);
                console.log(up);
            })
        })
        this.gazeUpImgs = up;

        /* Upload all images for down */
        fs.readdir(pathDown, function(err, files) {
            if (err) {
                console.error("Could not list the directory ",err);
                process.exit(1);
            }

            files.forEach(function (file) {
                down.push(file);
            })
        })
        this.gazeDownImgs = down;
    }

    /**
     *  @brief      :       Run animation for Misty Gaze Left
     *  @param[in]  :       dir - Direction of Gaze (i.e. forward or back)
     */
    gazeLeft(dir) {
        let lstLen = this.gazeLeftImgs.length;

        /** Loop through all Left Images and Display on Misty */
        if (dir == "forward") {
            for (let idx=0; idx<lstLen; idx++) {
                this.misty.DisplayImage(this.gazeLeftImgs[idx]);
            }
        } else {
            for (let idx=(lstLen-1); idx>=0; idx--) {
                this.misty.DisplayImage(this.gazeLeftImgs[idx]);
            }
        }
    }

    /**
     *  @brief      :       Run animation for Misty Gaze Right
     *  @param[in]  :       dir - Direction of Gaze (i.e. forward or back)
     */
    gazeRight(dir) {
        let lstLen = this.gazeRightImgs.length;

        /** Loop through all Left Images and Display on Misty */
        if (dir == "forward") {
            for (let idx=0; idx<lstLen; idx++) {
                this.misty.DisplayImage(this.gazeRightImgs[idx]);
            }
        } else {
            for (let idx=(lstLen-1); idx>=0; idx--) {
                this.misty.DisplayImage(this.gazeRightImgs[idx]);
            }
        }
    }

    /**
     *  @brief      :       Run animation for Misty Gaze Right
     *  @param[in]  :       dir - Direction of Gaze (i.e. forward or back)
     */
    gazeUp(dir) {
        let lstLen = this.gazeUpImgs.length;

        /** Loop through all Left Images and Display on Misty */
        if (dir == "forward") {
            for (let idx=0; idx<lstLen; idx++) {
                this.misty.DisplayImage(this.gazeUpImgs[idx]);
            }
        } else {
            for (let idx=(lstLen-1); idx>=0; idx--) {
                this.misty.DisplayImage(this.gazeUpImgs[idx]);
            }
        }
    }

    /**
     *  @brief      :       Run animation for Misty Gaze Right
     *  @param[in]  :       dir - Direction of Gaze (i.e. forward or back)
     */
    gazeDown(dir) {
        let lstLen = this.gazeDownImgs.length;

        /** Loop through all Left Images and Display on Misty */
        if (dir == "forward") {
            for (let idx=0; idx<lstLen; idx++) {
                this.misty.DisplayImage(this.gazeDownImgs[idx]);
            }
        } else {
            for (let idx=(lstLen-1); idx>=0; idx--) {
                this.misty.DisplayImage(this.gazeDownImgs[idx]);
            }
        }
    }

}
