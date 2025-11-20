import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import './App.css'
import GameCanvas from './components/GameCanvas'
import TrainingStats from './components/TrainingStats'
import Controls from './components/Controls'

interface GameState {
  snake: Array<{ x: number; y: number }>
  food: { x: number; y: number }
  score: number
  direction: string
  game_over: boolean
}

interface TrainingData {
  game_number: number
  score: number
  record: number
  mean_score: number
  scores: number[]
  mean_scores: number[]
}

function App() {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [trainingData, setTrainingData] = useState<TrainingData | null>(null)
  const [isTraining, setIsTraining] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const newSocket = io('http://localhost:5001', {
      transports: ['websocket', 'polling'],
    })

    newSocket.on('connect', () => {
      console.log('Connected to backend')
      setIsConnected(true)
    })

    newSocket.on('disconnect', () => {
      console.log('Disconnected from backend')
      setIsConnected(false)
    })

    newSocket.on('game_state', (data: GameState) => {
      setGameState(data)
    })

    newSocket.on('training_update', (data: TrainingData) => {
      setTrainingData(data)
    })

    newSocket.on('training_status', (data: { is_training: boolean }) => {
      setIsTraining(data.is_training)
    })

    setSocket(newSocket)

    return () => {
      newSocket.close()
    }
  }, [])

  const handleStartTraining = () => {
    if (socket) {
      socket.emit('start_training')
    }
  }

  const handleStopTraining = () => {
    if (socket) {
      socket.emit('stop_training')
    }
  }

  const handleReset = () => {
    if (socket) {
      socket.emit('reset_game')
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🐍 Snake Game AI</h1>
        <div className={`status ${isConnected ? 'connected' : 'disconnected'}`}>
          {isConnected ? '● Connected' : '○ Disconnected'}
        </div>
      </header>

      <div className="main-content">
        <div className="game-section">
          <GameCanvas gameState={gameState} />
          <Controls
            isTraining={isTraining}
            isConnected={isConnected}
            onStartTraining={handleStartTraining}
            onStopTraining={handleStopTraining}
            onReset={handleReset}
          />
        </div>

        <div className="stats-section">
          <TrainingStats trainingData={trainingData} />
        </div>
      </div>
    </div>
  )
}

export default App
