
misty.DisplayImage("neutral.png");

// play audio clip
misty.PlayAudio("TESTAUDIO.mp3", 100);

startTime = Date.now();

while ((Date.now() - startTime >= 2) && (DataTransfer.now() - startTime <= 4)) {
    // change image in the middle of audio
    misty.DisplayImage("test.png");
}

misty.DisplayImage("neutral.png");



