import { useState } from 'react'
import './InfoTabs.css'

const tabs = [
  {
    id: 'overview',
    label: 'How it works',
    title: 'Training loop',
    content: [
      'Observe the 11-feature state vector (danger rays, heading one-hot, food offset).',
      'Select an action with an epsilon-greedy policy to balance exploration vs exploitation.',
      'Advance the environment, collect rewards (+10 food, -10 collision, -0.1 per move).',
      'Store (state, action, reward, next_state, done) tuples inside replay memory.',
      'Sample mini-batches to train the Q-network and repeat for the next frame.',
    ],
  },
  {
    id: 'ql',
    label: 'Q-learning math',
    title: 'Bellman update',
    content: [
      'Q(s, a) ← Q(s, a) + α [ r + γ · maxₐ′ Q(s′, a′) − Q(s, a) ] is the Bellman update.',
      'Input dimension: 11 binary signals → hidden layer 256 ReLU units → 3 Q-values.',
      'Optimizer: Adam (lr 0.001) minimizing SmoothL1 between predicted and target Q.',
      'Discount γ = 0.9 keeps the agent farsighted without ignoring immediate food.',
      'Replay memory (100k) and 1k-sized batches reduce correlation and variance.',
    ],
  },
]

const InfoTabs = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id)
  const currentTab = tabs.find((tab) => tab.id === activeTab) ?? tabs[0]

  return (
    <div className="info-tabs">
      <div className="tab-list">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${tab.id === activeTab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-panel">
        <h4>{currentTab.title}</h4>
        <ul>
          {currentTab.content.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default InfoTabs

