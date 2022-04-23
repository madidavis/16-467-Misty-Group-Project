/**
 * Skill for Cognitive Aversion Task 2 Question 3 (None)
 */

/** @brief      :       Audio File for Task */
const task1Speech = "Task2c.mp3"
const volume = 10;

/** Main calling sequence */

// Determine length of pause before aversion
let pauseTime = 2;

// Play Audio
misty.Pause(pauseTime * 1000);

misty.PlayAudio(task1Speech, volume);