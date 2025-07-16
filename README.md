
# AI Stethoscope 🩺

An AI-powered stethoscope that records heart sounds, streams them live, performs real-time inference using a trained machine learning model (YAMNet), and displays predictions on a web interface. The system uses VIAM's cloud platform for device communication and MQTT for real-time data exchange between backend and frontend.

---

## 🔧 Features

- 🎙️ Real-time heart sound recording via microphone.
- 🧠 On-device inference using a VIAM-integrated TensorFlow model (YAMNet).
- 📡 MQTT-based real-time messaging between Python backend and frontend.
- 💬 Display of predicted heart condition: AS, MR, MS, MVP, or Normal.
- 📈 Live waveform audio streaming in browser (frontend).
- 🔘 Button-based UI to control "Analyse" and "Stream" modes.

---

## 🗂 Project Structure

### Backend
- **`main.py`**: Records and processes audio, performs inference, and publishes results/audio to MQTT topics using VIAM.
- **VIAM SDK** and **Pubsub** used for robot client and message broker integration.

### Frontend
- **`index.html`**: UI layout using responsive cards, buttons, and lottie animations.
- **`style.css`**: Clean and responsive design using CSS variables and media queries.
- **`script.js`**: Connects to MQTT broker, receives predictions/audio, updates UI dynamically.

---

## ⚙️ Setup Instructions

### 🔹 Backend

1. **Install Dependencies**
   ```bash
   pip install sounddevice numpy scipy viam-sdk pubsub-python
   ```

2. **Run the Inference Server**
   ```bash
   python main.py
   ```

### 🔹 Frontend

1. Use **Live Server** in VSCode or open `index.html` directly in your browser.

2. Ensure MQTT broker is accessible (e.g., `test.mosquitto.org:8080`), and topics match those in `main.py`.

---

## 🧠 Prediction Labels

The model classifies input into:

- `AS` – Aortic Stenosis  
- `MR` – Mitral Regurgitation  
- `MS` – Mitral Stenosis  
- `MVP` – Mitral Valve Prolapse  
- `N` – Normal  

---

## 📡 MQTT Topics Used

- `VIAM-ANALYSE` – Publishes prediction result.
- `VIAM-AUDIO-STREAM` – Publishes base64-encoded audio data.
- `VIAM-AI-STETH/COMMAND` – Frontend to backend control commands.
- `VIAM-AUDIO-TEST` – Frontend receives predictions from backend.

---

## 🚀 Future Work

- Add waveform visualizer in frontend.
- Enable secure MQTT broker authentication.
- Model retraining on real stethoscope recordings.
- Integrate with mobile app for telemedicine.

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙋‍♂️ Author

- **Hareesh Nallagatla** – Full Stack Developer & ML Engineer

