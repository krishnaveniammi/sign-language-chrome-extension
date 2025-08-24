chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "process_audio") {
      let audioURL = message.videoSrc;
      convertSpeechToText(audioURL);
  }
});

async function convertSpeechToText(audioURL) {
  let response = await fetch("https://speech-to-text-api.com/process", {
      method: "POST",
      body: JSON.stringify({ audio: audioURL }),
      headers: { "Content-Type": "application/json" }
  });
  let data = await response.json();
  chrome.runtime.sendMessage({ action: "text_generated", transcript: data.transcript });
}
