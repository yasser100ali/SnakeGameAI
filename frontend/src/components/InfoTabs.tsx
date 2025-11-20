import { useState } from 'react'
import './InfoTabs.css'

const tabs = [
  {
    id: 'overview',
    label: 'How it works',
    title: 'Training loop',
    content: [
      '1. Observe state (danger flags, direction, food position).',
      '2. Choose an action via epsilon-greedy policy.',
      '3. Step game, receive reward (+10 food, -10 collision, otherwise -0.1).',
      '4. Store experience and train Q-network on mini-batches.',
      '5. Update stats + repeat until termination.',
    ],
  },
  {
    id: 'ql',
    label: 'Q-learning math',
    title: 'Bellman update',
    content: [
      'Q(s, a) ← Q(s, a) + α [ r + γ · maxₐ′ Q(s′, a′) − Q(s, a) ]',
      'State vector: 11 binary features (danger + direction + food).',
      'Model: Linear_QNet(11 → 256 → 3) optimized with Adam (lr=0.001).',
      'Discount γ = 0.9 balances immediate vs future rewards.',
      'Replay memory (100k) + mini-batch (1k) stabilize updates.',
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

