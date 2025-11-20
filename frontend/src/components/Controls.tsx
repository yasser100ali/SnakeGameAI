import './Controls.css'

export type SpeedLabel = '1x' | '3x' | '10x'

interface ControlsProps {
  isTraining: boolean
  isConnected: boolean
  speedLabel: SpeedLabel
  onStartTraining: () => void
  onStopTraining: () => void
  onReset: () => void
  onSpeedChange: (label: SpeedLabel) => void
}

const speedOptions: { label: SpeedLabel; caption: string }[] = [
  { label: '1x', caption: 'Normal' },
  { label: '3x', caption: '3x' },
  { label: '10x', caption: '10x' },
]

const Controls = ({
  isTraining,
  isConnected,
  speedLabel,
  onStartTraining,
  onStopTraining,
  onReset,
  onSpeedChange,
}: ControlsProps) => {
  const actionButton = !isTraining ? (
    <button onClick={onStartTraining} disabled={!isConnected} className="btn primary">
      Start training
    </button>
  ) : (
    <button onClick={onStopTraining} disabled={!isConnected} className="btn danger">
      Stop training
    </button>
  )

  return (
    <div className="controls-container">
      <h3>Controls</h3>
      <div className="button-group">
        {actionButton}
        <button onClick={onReset} disabled={!isConnected || isTraining} className="btn muted">
          Reset game
        </button>
      </div>

      <div className="speed-section">
        <div className="speed-label">Training speed</div>
        <div className="speed-buttons">
          {speedOptions.map((option) => (
            <button
              key={option.label}
              className={`speed-btn ${speedLabel === option.label ? 'active' : ''}`}
              onClick={() => onSpeedChange(option.label)}
              disabled={!isConnected}
            >
              <span>{option.label}</span>
              <small>{option.caption}</small>
            </button>
          ))}
        </div>
      </div>

      <div className="training-info">
        <div className="info-item">
          <span className="label">Status</span>
          <span className={`value ${isTraining ? 'active' : 'inactive'}`}>
            {isTraining ? 'Running' : 'Idle'}
          </span>
        </div>
        <div className="info-item">
          <span className="label">Speed</span>
          <span className="value">{speedLabel}</span>
        </div>
      </div>
    </div>
  )
}

export default Controls

