import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import './TrainingStats.css'

interface TrainingData {
  game_number: number
  score: number
  record: number
  mean_score: number
  scores: number[]
  mean_scores: number[]
}

interface TrainingStatsProps {
  trainingData: TrainingData | null
}

const TrainingStats = ({ trainingData }: TrainingStatsProps) => {
  if (!trainingData) {
    return (
      <div className="stats-container">
        <h3>Training data</h3>
        <div className="no-data">
          <p>Waiting for the first game...</p>
        </div>
      </div>
    )
  }

  // Prepare chart data
  const chartData = trainingData.scores.map((score, index) => ({
    game: index + 1,
    score: score,
    meanScore: trainingData.mean_scores[index] || 0,
  }))

  return (
    <div className="stats-container">
      <h3>Training data</h3>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Games</div>
          <div className="stat-value">{trainingData.game_number}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Last score</div>
          <div className="stat-value">{trainingData.score}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Best</div>
          <div className="stat-value record">{trainingData.record}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Average</div>
          <div className="stat-value">{trainingData.mean_score.toFixed(2)}</div>
        </div>
      </div>

      <div className="chart-container">
        <h4>Score history</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
            <XAxis
              dataKey="game"
              stroke="#9fa5b4"
              label={{ value: 'Games', position: 'insideBottom', offset: -5, fill: '#9fa5b4' }}
            />
            <YAxis
              stroke="#9fa5b4"
              label={{ value: 'Score', angle: -90, position: 'insideLeft', fill: '#9fa5b4' }}
            />
            <Tooltip
              contentStyle={{
                background: '#0b0f16',
                border: '1px solid #1e222c',
                borderRadius: '6px',
                color: '#f5f6fa',
                fontFamily: 'Space Mono, monospace',
              }}
              labelStyle={{ color: '#9fa5b4' }}
            />
            <Legend wrapperStyle={{ color: '#9fa5b4', fontFamily: 'Space Mono, monospace' }} />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#f5f6fa"
              strokeWidth={2}
              dot={false}
              name="Score"
            />
            <Line
              type="monotone"
              dataKey="meanScore"
              stroke="#8e95a9"
              strokeWidth={2}
              dot={false}
              name="Average"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default TrainingStats

