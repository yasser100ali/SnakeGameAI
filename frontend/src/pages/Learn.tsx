import InfoTabs from '../components/InfoTabs'
import './Learn.css'

const Learn = () => (
  <div className="learn-page">
    <section className="learn-hero">
      <p className="eyebrow">How it works</p>
      <h1>Inside the Snake Game AI</h1>
      <p>
        This demo trains a Snake-playing agent end-to-end in the browser. The backend runs a
        reinforcement learning loop powered by Deep Q-Learning while the frontend mirrors the game
        state, rewards, and performance metrics in real time.
      </p>
    </section>

    <section className="learn-grid">
      <article>
        <h2>Observation space</h2>
        <ul>
          <li>11 binary features per frame.</li>
          <li>Collision checks (forward, left, right) relative to heading.</li>
          <li>Heading one-hot (up/down/left/right).</li>
          <li>Food position comparisons (food left/right/up/down).</li>
        </ul>
      </article>
      <article>
        <h2>Action space</h2>
        <ul>
          <li>Three discrete actions: keep heading, turn left, turn right.</li>
          <li>Epsilon-greedy exploration: ε = max(5, 80 − games).</li>
          <li>Neural network predicts Q-values for the 3 actions.</li>
        </ul>
      </article>
      <article>
        <h2>Reward signal</h2>
        <ul>
          <li>+10 for eating food.</li>
          <li>−10 for collision or timeout.</li>
          <li>−0.1 per move to encourage shorter routes.</li>
        </ul>
      </article>
      <article>
        <h2>Optimization</h2>
        <ul>
          <li>Linear network: 11 → 256 → 3 with ReLU.</li>
          <li>Adam optimizer (lr = 0.001), γ = 0.9.</li>
          <li>Replay buffer (100k) + batch size 1000.</li>
        </ul>
      </article>
    </section>

    <InfoTabs />

    <section className="formula-card">
      <h2>Bellman update</h2>
      <p>
        Q(s, a) ← Q(s, a) + α [ r + γ · maxₐ′ Q(s′, a′) − Q(s, a) ] ensures the network regresses
        toward bootstrapped targets derived from the next state-action value.
      </p>
      <p>
        We stabilize learning by sampling mini-batches from replay memory, so consecutive updates see
        decorrelated experiences.
      </p>
    </section>
  </div>
)

export default Learn

