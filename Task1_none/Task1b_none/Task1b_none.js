/**
 * Skill for Cognitive Aversion Task 1 Question 2 (Head)
 */

/** @brief      :       Audio File for Task */
const task1Speech = "Task1b.mp3"
const volume = 10;

/** Main calling sequence */

// Determine length of pause before aversion
let pauseTime = 7 + Math.floor(Math.random() * 4);

// Play Audio
misty.Pause(pauseTime * 1000);

misty.PlayAudio(task1Speech, volume);
