# Auto-Speed Adjustment Guide

## How the New Auto-Speed Feature Works

### Default Behavior (No User Input)
When you start training and **don't manually click any speed button**, the system automatically adjusts speed based on game progress:

```
Games 1-75:   10X speed (fast training phase)
Games 76+:    3X speed (stable learning phase)
```

This lets the AI quickly explore through early games, then settles into a more stable training speed.

### Manual Speed Override
If you click any speed button (1x, 3x, 10x) **while training is active**, the auto-speed feature is disabled:

```
User clicks [1X] → Auto-speed disabled
               → Speed stays at 1X for entire session
               → Button remains highlighted/active
```

### Starting Fresh Training
When you click "Start Training" (after stopping):
- Auto-speed feature is **re-enabled** 
- Speed resets to default auto-adjustment logic
- Cycle repeats: Games 1-75 at 10X, then 3X onward

## Visual Feedback

The speed buttons now properly highlight to show current speed:

```
Before:
[1X]  [3X*]  [10X]  ← Always showed 3X highlighted (bug)

After:
[1X]  [3X*]  [10X]  ← Highlights the actual current speed
[1X*] [3X]   [10X]  ← During auto-speed, shows correct button
```

## Technical Details

- **Backend tracks**: `user_set_speed` flag to know if user manually changed speed
- **Auto-adjustment happens**: Every frame in training loop based on game count
- **Speed updates emit**: Via WebSocket `speed_update` event to sync UI
- **Session reset**: When you start new training, auto-speed is re-enabled

## Example Scenarios

### Scenario 1: Let Auto-Speed Run
```
1. Click "Start Training"
   → Games 1-75: 10X speed (auto)
   → Games 76+: 3X speed (auto)
2. Click "Stop Training"
3. Click "Start Training" again
   → Same cycle: 10X for early games, 3X after 75
```

### Scenario 2: Manual Override
```
1. Click "Start Training"
   → Games 1-10: 10X speed (auto)
2. Click [1X] button
   → Auto-speed disabled
   → All remaining games: 1X speed
3. Click "Stop Training"
4. Click "Start Training" again
   → Auto-speed re-enabled (back to default behavior)
```

### Scenario 3: Change Speed During Training
```
1. Start training (auto 10X for games 1-75)
2. At game 50: Click [3X]
   → Auto-speed disabled
   → Speed: 3X for games 50+
3. At game 100: Click [10X]
   → Speed: 10X immediately
   → Remains 10X until stop or next training session
```

---

**Refresh your browser** to see the buttons properly highlight based on current speed!

