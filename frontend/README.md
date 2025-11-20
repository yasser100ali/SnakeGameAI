# Frontend (React + TypeScript)

This Vite app renders the live Snake Game AI dashboard and the “How it works” documentation page. It connects to the Flask backend via Socket.IO to stream game state, stats, and speed changes.

## Scripts

```bash
pnpm dev          # Start Vite dev server (http://localhost:5173)
pnpm build        # Type-check + production build
pnpm preview      # Preview the production build
```

## Routes

- `/` – dashboard with canvas, controls (start/stop/reset, speed selector), and live stats
- `/learn` – explanatory page detailing the RL loop, reward shaping, and Bellman update

## Structure highlights

- `src/components` – shared UI building blocks (GameCanvas, TrainingStats, Controls, InfoTabs)
- `src/pages` – routed views (`Dashboard`, `Learn`)
- `src/App.tsx` – router shell + navigation bar

Controls emit socket events (`start_training`, `stop_training`, `reset_game`, `set_speed`). The backend responds with `game_state`, `training_update`, `training_status`, and `speed_update`, keeping the UI synchronized in real time.
