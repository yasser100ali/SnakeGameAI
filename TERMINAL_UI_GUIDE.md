# 🖥️ Terminal UI Guide

Your Snake Game AI now has a sleek, retro terminal-style interface inspired by classic hacking/cyberpunk themes!

## 🎨 Visual Design Features

### Color Scheme
- **Primary**: Bright Green (#00ff00) - Classic terminal color
- **Accent**: Cyan (#00ffff) - For important values
- **Highlight**: Yellow (#ffff00) - For records and emphasis  
- **Warning**: Red (#ff0000) - For errors and game over
- **Background**: Pure Black (#000000) - Deep dark theme

### Typography
- **Font**: Courier New (monospace) - Typewriter/terminal feel
- **Letter Spacing**: Increased for retro computer aesthetic
- **Text Effects**: Green glow/shadow effects

### UI Elements

#### Header
```
┌─────────────────────────────────────────┐
│ > SNAKE GAME AI            [● CONNECTED] │
└─────────────────────────────────────────┘
```
- Game title with terminal arrow prefix
- Connection status indicator
- Glowing green border

#### Game Canvas
```
┌──────────────────────────────────────────┐
│                                          │
│   🐍 [Green snake with head highlighted] │
│                                          │
│   🟡 [Yellow food target]                │
│                                          │
│ > SCORE: 42          DIR: RIGHT          │
│                                          │
└──────────────────────────────────────────┘
```
- Black background with green grid
- Bright green snake (head brighter)
- Yellow food pellet
- Terminal-style score display
- Glowing text effects

#### Controls Panel
```
┌────────────────────┐
│ > CONTROLS         │
├────────────────────┤
│ [ START_TRAINING ] │
│ [ RESET_GAME ]     │
├────────────────────┤
│ STATUS: [ACTIVE]   │
└────────────────────�────┘
```
- Green bordered container
- Button-style controls with brackets
- Uppercase text labels
- Status indicator with glowing effects

#### Statistics Panel
```
┌────────────────────────┐
│ > STATISTICS           │
├────────────────────────┤
│ GAMES: 42  │ LAST: 15  │
│ RECORD: 89 │ AVG: 22.5 │
├────────────────────────┤
│ ► SCORE_HISTORY        │
│ ┌──────────────────┐   │
│ │ Cyan/Yellow     │   │
│ │ Trend Lines     │   │
│ └──────────────────┘   │
└────────────────────────┘
```
- Stats grid with individual metric cards
- Cyan line for current score trend
- Yellow line for average score trend
- Terminal-style chart axes

## 🌟 Special Effects

### Scanlines Effect
- Subtle animated horizontal lines across entire UI
- Creates authentic CRT monitor feel
- Loops continuously for atmosphere

### Glow Effects
- Text shadows create "neon" appearance
- Container borders have subtle glowing effect
- Important values pulse with emphasis

### Border Styling
- Sharp rectangular borders (no rounded corners)
- Green (#00ff00) for active elements
- Red (#ff0000) for warnings/disconnected
- Cyan (#00ffff) for secondary elements

## 🎮 Interactive States

### Connected State
- All controls enabled
- Green glowing border around containers
- Status shows "CONNECTED"

### Disconnected State
- Controls disabled/grayed out
- Red border warning
- Status shows "DISCONNECTED"

### Training Active
- Status button displays "[ACTIVE]" in green
- Start button changes to "STOP_TRAINING"
- Game canvas updates in real-time
- Charts animate with new data

### Training Inactive
- Status button displays "[IDLE]"
- Start button enabled
- Reset button available

## 💻 Terminal Commands Style

Throughout the UI, you'll notice terminal-like formatting:

- **Prefixes**: `>` for main commands, `$` for waiting
- **Brackets**: `[ ]` for buttons, `( )` for status
- **Separators**: `>>` and `<<` for emphasis
- **Paths**: Directory-like structure with underscores

Example messages:
- `> AWAITING_SIGNAL...` - Waiting for game to start
- `>> GAME_OVER <<` - Game ended
- `[ START_TRAINING ]` - Action button
- `STATUS: [ACTIVE]` - Status indicator

## 🎨 Responsive Design

The layout is responsive and works on:
- **Desktop**: Full side-by-side layout (canvas left, stats right)
- **Tablet**: Stacked layout (canvas on top, stats below)
- **Mobile**: Single column optimized for smaller screens

## 🖱️ Interaction Feedback

All interactive elements provide visual feedback:

### Buttons
- **Hover**: Background brightens, glow intensifies
- **Click**: Immediate response with shadow effects
- **Disabled**: Grayed out with muted colors

### Charts
- **Tooltip**: Terminal-style info box on hover
- **Legend**: Color-coded line indicators
- **Animation**: Smooth line drawing as data updates

## 🌙 Dark Mode (Always On)

The interface is permanently in dark mode with:
- Pure black background for minimal eye strain
- Neon green text for maximum contrast
- Scanline effect adds subtle animation

---

**Enjoy your retro terminal experience! 🚀**

If you'd like to customize colors or effects, check out the CSS files in `frontend/src/components/`

