import './Controls.css'

interface ControlsProps {
  isTraining: boolean
  isConnected: boolean
  onStartTraining: () => void
  onStopTraining: () => void
  onReset: () => void
}

const Controls = ({
  isTraining,
  isConnected,
  onStartTraining,
  onStopTraining,
  onReset,
}: ControlsProps) => {
  return (
    <div className="controls-container">
      <h3>Controls</h3>
      <div className="button-group">
        {!isTraining ? (
          <button
            onClick={onStartTraining}
            disabled={!isConnected}
            className="btn btn-primary"
          >
            Start training
          </button>
        ) : (
          <button
            onClick={onStopTraining}
            disabled={!isConnected}
            className="btn btn-danger"
          >
            Stop training
          </button>
        )}
        <button
          onClick={onReset}
          disabled={!isConnected || isTraining}
          className="btn btn-secondary"
        >
          Reset game
        </button>
      </div>
      <div className="training-info">
        <div className="info-item">
          <span className="label">Status</span>
          <span className={`value ${isTraining ? 'active' : 'inactive'}`}>
            {isTraining ? 'Running' : 'Idle'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Controls

