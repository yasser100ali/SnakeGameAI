import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import GameCanvas from '../components/GameCanvas'
import Controls, { type SpeedLabel } from '../components/Controls'
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

const SPEED_CHOICES: SpeedLabel[] = ['1x', '3x', '10x']

const Dashboard = () => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [trainingData, setTrainingData] = useState<TrainingData | null>(null)
  const [isTraining, setIsTraining] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [speed, setSpeed] = useState<SpeedLabel>('1x')

  useEffect(() => {
    const newSocket = io('http://localhost:5001', {
      transports: ['websocket', 'polling'],
    })

    newSocket.on('connect', () => {
      setIsConnected(true)
    })

    newSocket.on('disconnect', () => {
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

    newSocket.on('speed_update', (data: { label: string }) => {
      const label = SPEED_CHOICES.includes(data.label as SpeedLabel)
        ? (data.label as SpeedLabel)
        : '1x'
      setSpeed(label)
    })

    setSocket(newSocket)

    return () => {
      newSocket.close()
    }
  }, [])

  const handleStartTraining = () => {
    socket?.emit('start_training')
  }
  
  const handleStopTraining = () => {
    socket?.emit('stop_training')
  }
  
  const handleSpeedChange = (label: SpeedLabel) => {
    console.log('Speed change requested:', label)
    socket?.emit('set_speed', { label })
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Snake Game AI</h1>
        <p>REALTIME REINFORCEMENT LEARNING</p>
      </header>

      <div className="main-content">
        <div className="game-stage">
          <div className="game-section">
            <GameCanvas gameState={gameState} />
          </div>
          <div className="controls-section">
            <Controls
              isTraining={isTraining}
              isConnected={isConnected}
              onStartTraining={handleStartTraining}
              onStopTraining={handleStopTraining}
              speedLabel={speed}
              onSpeedChange={handleSpeedChange}
            />
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