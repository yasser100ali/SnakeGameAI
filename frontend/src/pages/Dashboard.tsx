import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import GameCanvas from '../components/GameCanvas'
import TrainingStats from '../components/TrainingStats'
import '../App.css'

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

const Dashboard = () => {
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [trainingData, setTrainingData] = useState<TrainingData | null>(null)

  useEffect(() => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001'
    const newSocket = io(backendUrl, {
      transports: ['websocket', 'polling'],
    })

    newSocket.on('game_state', (data: GameState) => {
      setGameState(data)
    })

    newSocket.on('training_update', (data: TrainingData) => {
      setTrainingData(data)
    })

    // Auto-start training when connected
    newSocket.on('connect', () => {
      newSocket.emit('start_training')
    })

    return () => {
      newSocket.close()
    }
  }, [])

  return (
    <div className="app">
      <header className="header">
        <h1>Snake Game AI</h1>
        <p>REALTIME REINFORCEMENT LEARNING, improves over time</p>
      </header>

      <div className="main-content">
        <div className="game-stage">
          <div className="game-section">
            <GameCanvas gameState={gameState} />
          </div>
        </div>

        <div className="stats-section">
          <TrainingStats trainingData={trainingData} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard