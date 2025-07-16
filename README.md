
# AI Stethoscope 🩺

An AI-powered stethoscope that records heart sounds, performs real-time inference using a trained machine learning model (YAMNet), and classifies heart conditions like Aortic Stenosis (AS), Mitral Regurgitation (MR), Mitral Stenosis (MS), Mitral Valve Prolapse (MVP), and Normal heartbeats (N). This system leverages the VIAM robotics platform for connectivity and MQTT for real-time communication.

## Features

- 🔊 Real-time audio recording using microphone input.
- 🧠 On-device audio classification using a TensorFlow Lite model (YAMNet).
- ☁️ Remote inference and messaging via VIAM cloud services.
- 📡 MQTT-based Pub/Sub messaging for analysis results and audio streams.
- 💬 Automatic publishing of diagnostic labels to `VIAM-ANALYSE` topic.
- 🔁 Continuous loop for monitoring and diagnosis every 2 seconds.

## Technologies Used

- Python 3.8+
- VIAM SDK (robot client, MLModelClient, Pubsub)
- `sounddevice` for audio recording
- `scipy.signal.resample` for downsampling audio to 16kHz
- `base64` for encoding audio
- AsyncIO for asynchronous operations

## File Structure

- `main.py`: Main script to record audio, perform inference, publish results.
- `AI_Stethoscope.ipynb`: Jupyter notebook (not shown here) likely used for model development and evaluation.

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/ai-stethoscope.git
   cd ai-stethoscope
   ```

2. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```
   *(Ensure `viam-sdk`, `sounddevice`, `scipy`, `numpy`, etc. are included in `requirements.txt`)*

3. **Run the Application**
   ```bash
   python main.py
   ```

> Note: Make sure your VIAM API keys are valid and that the robot and MQTT services are correctly configured on your VIAM account.

## Labels

The following classes are predicted by the AI model:

- `AS` – Aortic Stenosis  
- `MR` – Mitral Regurgitation  
- `MS` – Mitral Stenosis  
- `MVP` – Mitral Valve Prolapse  
- `N` – Normal  

## Future Improvements

- Add GUI interface for diagnosis display.
- Support for Bluetooth connection to stethoscope hardware.
- Extended model training for additional heart conditions.
- Integration with mobile app for remote monitoring.

## License

This project is licensed under the MIT License.

## Contributors

- **Hareesh Nallagatla** – Developer & Researcher
