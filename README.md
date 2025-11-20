# 🐍 Snake Game AI

A modern web-based Snake Game with an AI agent that learns to play using reinforcement learning (Deep Q-Learning). Built with React + TypeScript frontend and Python Flask backend with real-time WebSocket communication.

![Snake Game AI Demo](https://img.shields.io/badge/status-active-success.svg)
![Python](https://img.shields.io/badge/python-3.8+-blue.svg)
![React](https://img.shields.io/badge/react-18.3-61dafb.svg)

## ✨ Features

- **🎮 Interactive Web UI**: Beautiful, modern React-based interface with real-time game visualization
- **🤖 AI-Powered Agent**: Deep Q-Learning agent that learns to play Snake autonomously
- **📊 Live Training Statistics**: Real-time charts and metrics showing training progress
- **🔌 WebSocket Communication**: Instant updates between backend and frontend
- **⚡ Fast Training**: Headless mode for efficient AI training
- **🎯 Training Controls**: Start/stop training, reset the game, and adjust speed (1× / 3× / 10×)
- **📚 Learn Page**: Dedicated “How it works” page explaining the full Q-Learning loop and math

## 🏗️ Architecture

```
┌─────────────────┐         WebSocket         ┌──────────────────┐
│  React Frontend │ ◄─────────────────────── │  Flask Backend   │
│   (TypeScript)  │                           │     (Python)     │
│                 │         Socket.IO         │                  │
│  - Game Canvas  │ ─────────────────────► │  - Snake Game    │
│  - Stats Charts │                           │  - AI Agent      │
│  - Controls     │                           │  - Deep Q-Net    │
└─────────────────┘                           └──────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18+) and **pnpm** installed
- **Python** (3.8+) and **pip** installed
- A virtual environment tool (optional but recommended)

### Installation & Setup

1. **Clone the repository** (if not already done):
   ```bash
   git clone <your-repo-url>
   cd SnakeGameAI
   ```

2. **Install all dependencies** (frontend + backend):
   ```bash
   pnpm install
   ```
   
   This will:
   - Install Node.js dependencies for the root workspace
   - Install React frontend dependencies
   
3. **Install Python backend dependencies**:
   ```bash
   cd backend
   python -m venv venv  # Optional: create virtual environment
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   cd ..
   ```

### Running the Application

Start both frontend and backend simultaneously:

```bash
pnpm dev
```

This command will:
- Start the Flask backend on `http://localhost:5001`
- Start the React frontend on `http://localhost:5173`
- Open your browser automatically to the frontend

**Alternative**: Run them separately in different terminals:

```bash
# Terminal 1 - Backend
pnpm dev:backend

# Terminal 2 - Frontend  
pnpm dev:frontend
```

### Using the Application

1. Open `http://localhost:5173` for the dashboard (game, stats, controls).
2. Use the **Start/Stop** buttons to control training.
3. Choose a speed profile (1×, 3×, 10×) to slow down or accelerate the learning loop.
4. Track performance in the live stats and score history chart.
5. Visit `http://localhost:5173/learn` to read the detailed breakdown of the algorithm, reward shaping, and Q-learning math.

## 📦 Project Structure

```
SnakeGameAI/
├── frontend/                 # React TypeScript frontend
│   ├── src/
│   │   ├── components/       # React components (canvas, stats, controls, info tabs)
│   │   ├── pages/            # Routed pages (Dashboard, Learn)
│   │   ├── App.tsx           # Router & navigation shell
│   │   └── main.tsx         # Entry point
│   ├── package.json
│   └── vite.config.ts       # Vite configuration
│
├── backend/                  # Python Flask backend
│   ├── app.py               # Flask server & WebSocket handlers
│   ├── agent.py             # AI agent (Deep Q-Learning)
│   ├── model.py             # Neural network model
│   ├── snake_game_headless.py  # Headless game engine
│   └── requirements.txt     # Python dependencies
│
├── snake_game/              # Original Pygame version (legacy)
│   └── ...
│
├── package.json             # Root workspace config
├── pnpm-workspace.yaml      # pnpm workspace definition
└── README.md                # This file
```

## 🧠 How the AI Works

The AI uses **Deep Q-Learning**, a reinforcement learning technique:

1. **State Representation**: The agent observes 11 features:
   - Danger detection (straight, right, left)
   - Current direction (4 directions)
   - Food location relative to head (4 directions)

2. **Neural Network**: A 3-layer fully connected network:
   - Input: 11 features
   - Hidden: 256 neurons
   - Output: 3 actions (straight, turn right, turn left)

3. **Training Process**:
   - Agent takes actions based on Q-values
   - Receives rewards (+10 for food, -10 for collision)
   - Updates network weights using experience replay
   - Gradually reduces random exploration (epsilon-greedy)

4. **Experience Replay**: Stores past experiences and trains on random batches to improve stability

## 🎮 Game Controls

The AI controls the snake, but you can:
- **Start Training**: Begin the AI training loop
- **Stop Training**: Pause training (keeps progress)
- **Reset Game**: Reset the board (only when idle)
- **Training Speed**: Toggle between 1× (slow/visual), 3×, and 10× playback to match your preference

## 📊 Training Metrics & Learn Page

Dashboard metrics include:
- **Games**: Total episodes completed
- **Last Score**: Score from the most recent episode
- **Best**: Record high score
- **Average**: Rolling mean across games
- **Score History**: Live chart of score vs. average

Need more theory? Navigate to `/learn` for deeper explanations of the observation space, reward shaping, replay buffer, and the Bellman update that powers the Q-network.

## 🛠️ Development

### Frontend Development

```bash
cd frontend
pnpm dev
```

### Backend Development

```bash
cd backend
source venv/bin/activate  # if using venv
python app.py
```

### Build for Production

```bash
pnpm build
```

## 🔧 Configuration

### Game Settings

Edit `backend/snake_game_headless.py`:
- `BLOCK_SIZE = 20` - Size of each grid block
- Grid dimensions: `w=640, h=480`

### AI Hyperparameters

Edit `backend/agent.py`:
- `MAX_MEMORY = 100_000` - Replay buffer size
- `BATCH_SIZE = 1000` - Training batch size
- `LR = 0.001` - Learning rate
- `gamma = 0.9` - Discount factor

### Server Ports

- Frontend: `5173` (Vite default, configurable in `frontend/vite.config.ts`)
- Backend: `5000` (Flask default, configurable in `backend/app.py`)

## 📝 Technologies Used

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Socket.IO Client** - WebSocket communication
- **Recharts** - Data visualization

### Backend
- **Flask** - Web framework
- **Flask-SocketIO** - WebSocket support
- **PyTorch** - Neural network framework
- **NumPy** - Numerical computations
- **Eventlet** - Async networking

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Inspired by classic Snake game mechanics
- Built with reinforcement learning principles
- Uses Deep Q-Learning algorithm

---

**Enjoy watching the AI learn to play Snake! 🐍🎮**
