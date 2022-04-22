/**
 * Skill for Utterance Aversion Task 4 Question 3 (None)
 */

/** @brief      :       Audio File for Task */
const task4Speech_a = "task4_3a.mp3";
const task4Speech_b = "task4_3b.mp3";
const speechLen = 4;
const volume = 10;

// Determine length of pause between phrases (2 - 4)
let pauseTime = 3 + Math.floor(Math.random() * 2);

// play first phrase
misty.PlayAudio(task4Speech_a, volume);

// pause for duration of audio
misty.Pause(speechLen * 1000);

// pause for a random duration
misty.Pause(pauseTime * 1000);

// play second phrase
misty.PlayAudio(task4Speech_b, volume);