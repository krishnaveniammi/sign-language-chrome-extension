let videos = document.querySelectorAll("video");
if (videos.length > 0) {
    videos.forEach(video => {
        video.addEventListener("play", () => {
            captureAudio(video);
        });
    });
}

function captureAudio(video) {
    let audioContext = new AudioContext();
    let source = audioContext.createMediaElementSource(video);
    let analyser = audioContext.createAnalyser();

    source.connect(analyser);
    analyser.connect(audioContext.destination);

    // Send audio data for speech-to-text processing
    sendAudioForProcessing(video);
}

function sendAudioForProcessing(video) {
    chrome.runtime.sendMessage({ action: "process_audio", videoSrc: video.src });
}
