import { useEffect, useRef } from 'react'
import './GameCanvas.css'

interface GameState {
  snake: Array<{ x: number; y: number }>
  food: { x: number; y: number }
  score: number
  direction: string
  game_over: boolean
}

interface GameCanvasProps {
  gameState: GameState | null
}

const BLOCK_SIZE = 20
const GRID_WIDTH = 640
const GRID_HEIGHT = 480

const GameCanvas = ({ gameState }: GameCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = '#05060c'
    ctx.fillRect(0, 0, GRID_WIDTH, GRID_HEIGHT)

    // Draw grid
    ctx.strokeStyle = '#0f121b'
    ctx.lineWidth = 1
    for (let x = 0; x <= GRID_WIDTH; x += BLOCK_SIZE) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, GRID_HEIGHT)
      ctx.stroke()
    }
    for (let y = 0; y <= GRID_HEIGHT; y += BLOCK_SIZE) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(GRID_WIDTH, y)
      ctx.stroke()
    }

    if (!gameState) {
      ctx.fillStyle = '#9fa5b4'
      ctx.font = '600 18px "Space Mono", monospace'
      ctx.textAlign = 'center'
      ctx.fillText('Waiting for training to start…', GRID_WIDTH / 2, GRID_HEIGHT / 2)
      return
    }

    // Draw food
    ctx.fillStyle = '#f1bf6f'
    ctx.fillRect(gameState.food.x, gameState.food.y, BLOCK_SIZE, BLOCK_SIZE)

    // Draw snake
    gameState.snake.forEach((segment, index) => {
      if (index === 0) {
        ctx.fillStyle = '#f5f6fa'
      } else {
        ctx.fillStyle = '#9fa5b4'
      }
      ctx.fillRect(segment.x, segment.y, BLOCK_SIZE, BLOCK_SIZE)

      ctx.fillStyle = index === 0 ? '#d7dbea' : '#b5bbc9'
      ctx.fillRect(segment.x + 4, segment.y + 4, BLOCK_SIZE - 8, BLOCK_SIZE - 8)
    })

    // Draw score
    ctx.fillStyle = '#f5f6fa'
    ctx.font = '600 16px "Space Mono", monospace'
    ctx.textAlign = 'left'
    ctx.fillText(`Score: ${gameState.score}`, 10, 26)

    // Draw direction indicator
    ctx.fillStyle = '#9fa5b4'
    ctx.font = '12px "Space Mono", monospace'
    ctx.fillText(`Direction: ${gameState.direction}`, 10, 46)

    // Draw game over message
    if (gameState.game_over) {
      ctx.fillStyle = 'rgba(5, 6, 12, 0.85)'
      ctx.fillRect(0, 0, GRID_WIDTH, GRID_HEIGHT)
      ctx.fillStyle = '#ff6b6b'
      ctx.font = '600 36px "Space Mono", monospace'
      ctx.textAlign = 'center'
      ctx.fillText('Game over', GRID_WIDTH / 2, GRID_HEIGHT / 2)
    }
  }, [gameState])

  return (
    <div className="game-canvas-container">
      <canvas
        ref={canvasRef}
        width={GRID_WIDTH}
        height={GRID_HEIGHT}
        className="game-canvas"
      />
    </div>
  )
}

export default GameCanvas

