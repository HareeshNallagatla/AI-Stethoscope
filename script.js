let isAnalysePlaying = false;
let isStreamPlaying = false;
let detections = [];

const analyseBtn = document.getElementById("analyse_button");
const streamBtn = document.getElementById("stream_button");
const ai = document.getElementById("ai");
const steth = document.getElementById("steth");
const analyseLottie = document.getElementById("start_analysis");
const streamLottie = document.getElementById("start_stream");
const detection_class = document.getElementById("det");

$(analyseLottie).hide();
$(streamLottie).hide();
$(detection_class).hide();

analyseBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (isAnalysePlaying) {
    analyseLottie.pause();
    $(analyseLottie).hide();
    $(ai).show();
    isAnalysePlaying = false;
    analyseBtn.classList.remove("btn__secondary");
    analyseBtn.classList.add("btn__primary");
    analyseBtn.innerHTML = "<p>Analyse</p>";
  } else {
    $(ai).hide();
    $(analyseLottie).show();
    analyseLottie.play();
    isAnalysePlaying = true;
    analyseBtn.classList.remove("btn__primary");
    analyseBtn.classList.add("btn__secondary");
    analyseBtn.innerHTML = "<p>Analysing...</p>";
    analyseBtn.disabled = true;

    setTimeout(function () {
      $(analyseBtn).hide();
      $(analyseLottie).hide();
      $(detection_class).show();
      const result = findMostOccurringValue(detections);
      detections = [];
      $(detection_class).text(result);
      console.log("MOST:", result);
    }, 20000);
  }
});

streamBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (isStreamPlaying) {
    streamLottie.pause();
    $(streamLottie).hide();
    $(steth).show();
    isStreamPlaying = false;
    streamBtn.classList.remove("btn__secondary");
    streamBtn.classList.add("btn__primary");
    streamBtn.innerHTML = "<p>Stream</p>";
  } else {
    $(steth).hide();
    $(streamLottie).show();
    streamLottie.play();
    isStreamPlaying = true;
    streamBtn.classList.remove("btn__primary");
    streamBtn.classList.add("btn__secondary");
    streamBtn.innerHTML = "<p>Streaming...</p>";
  }
});

// MQTT Setup
const MQTT_BROKER = 'ws://test.mosquitto.org:8080';
const AUDIO_TOPIC = 'VIAM-AI-STETH/AUDIO_STREAM';
const ANALYSE_TOPIC = 'VIAM-AUDIO-TEST';
const COMMAND_TOPIC = 'VIAM-AI-STETH/COMMAND';

let audioChunks = [];
let audioBlob = null;

const client = mqtt.connect(MQTT_BROKER);

client.on("connect", function () {
  console.log("Connected to MQTT broker");
  client.subscribe(ANALYSE_TOPIC);
  client.subscribe(AUDIO_TOPIC);
});

client.on("message", function (topic, message) {
  if (topic === AUDIO_TOPIC) {
    const audioData = atob(message);
    const dataArray = new Uint8Array(audioData.length);
    for (let i = 0; i < audioData.length; i++) {
      dataArray[i] = audioData.charCodeAt(i);
    }
    audioChunks.push(dataArray);
    audioBlob = new Blob(audioChunks, { type: "audio/wav" });
    const audioURL = URL.createObjectURL(audioBlob);
    const audioPlayer = document.getElementById("audioPlayer");
    audioPlayer.src = audioURL;
  }

  if (topic === ANALYSE_TOPIC) {
    const msg = message.toString();
    detections.push(msg);
  }
});

function sendCommand(command) {
  client.publish(COMMAND_TOPIC, command);
}

function playAudio() {
  const audioPlayer = document.getElementById("audioPlayer");
  audioPlayer.play();
}

function findMostOccurringValue(arr) {
  const counts = {};
  arr.forEach(val => {
    counts[val] = (counts[val] || 0) + 1;
  });

  return Object.keys(counts).reduce((a, b) =>
    counts[a] > counts[b] ? a : b
  );
}
