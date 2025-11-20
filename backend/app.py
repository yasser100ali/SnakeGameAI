from flask import Flask
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import threading
import time
from snake_game_headless import SnakeGameAI, Direction, Point
from agent import Agent

app = Flask(__name__)
app.config['SECRET_KEY'] = 'snake-game-ai-secret'
CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='threading')

# Global state
training_thread = None
training_active = False
training_speed = 1.0  # Speed multiplier (1x, 3x, 10x)
user_set_speed = False  # Track if user manually set speed (disables auto-adjust)
agent = None
game = None
training_stats = {
    'game_number': 0,
    'score': 0,
    'record': 0,
    'mean_score': 0.0,
    'scores': [],
    'mean_scores': []
}

BASE_DELAY = 0.06  # seconds
SPEED_OPTIONS = {
    '1x': {'label': '1x', 'multiplier': 1},
    '3x': {'label': '3x', 'multiplier': 3},
    '10x': {'label': '10x', 'multiplier': 10},
}
current_speed = SPEED_OPTIONS['1x']


def get_speed_payload():
    return {
        'label': current_speed['label'],
        'multiplier': current_speed['multiplier'],
    }


def serialize_game_state(game):
    """Convert game state to JSON-serializable format"""
    return {
        'snake': [{'x': int(pt.x), 'y': int(pt.y)} for pt in game.snake],
        'food': {'x': int(game.food.x), 'y': int(game.food.y)},
        'score': int(game.score),
        'direction': game.direction.name,
        'game_over': False
    }


def training_loop():
    """Main training loop that runs in a separate thread"""
    global training_active, training_speed, agent, game, training_stats, current_speed, user_set_speed
    
    plot_scores = []
    plot_mean_scores = []
    total_score = 0
    record = 0
    user_set_speed = False  # Reset flag at start of training
    
    agent = Agent()
    game = SnakeGameAI(headless=True)
    
    print("Training started...")
    
    while training_active:
        # Auto-adjust speed if user hasn't manually set it
        if not user_set_speed:
            if agent.n_games < 75:
                # Games 1-75: Use 10x speed
                if current_speed['label'] != '10x':
                    current_speed = SPEED_OPTIONS['10x']
                    socketio.emit('speed_update', get_speed_payload(), broadcast=True)
            else:
                # After game 75: Use 3x speed
                if current_speed['label'] != '3x':
                    current_speed = SPEED_OPTIONS['3x']
                    socketio.emit('speed_update', get_speed_payload(), broadcast=True)
        
        # Get old state
        state_old = agent.get_state(game)
        
        # Get move
        final_move = agent.get_action(state_old)
        
        # Perform move and get new state
        reward, done, score = game.play_step(final_move)
        state_new = agent.get_state(game)
        
        # Emit game state to all connected clients
        game_state = serialize_game_state(game)
        socketio.emit('game_state', game_state)
        
        # Train short memory
        agent.train_short_memory(state_old, final_move, reward, state_new, done)
        
        # Remember
        agent.remember(state_old, final_move, reward, state_new, done)
        
        if done:
            # Train long memory, update stats
            game.reset()
            agent.n_games += 1
            agent.train_long_memory()
            
            if score > record:
                record = score
            
            print(f'Game {agent.n_games} Score {score} Record: {record}')
            
            plot_scores.append(score)
            total_score += score
            mean_score = total_score / agent.n_games
            plot_mean_scores.append(mean_score)
            
            # Update training stats
            training_stats['game_number'] = agent.n_games
            training_stats['score'] = score
            training_stats['record'] = record
            training_stats['mean_score'] = mean_score
            training_stats['scores'] = plot_scores[-50:]  # Keep last 50 scores
            training_stats['mean_scores'] = plot_mean_scores[-50:]
            
            # Emit training update
            socketio.emit('training_update', training_stats)
        
        # Small delay to control speed and reduce CPU usage
        delay = max(BASE_DELAY / current_speed['multiplier'], 0.002)
        time.sleep(delay)
    
    print("Training stopped.")


@socketio.on('connect')
def handle_connect():
    print('Client connected')
    emit('training_status', {'is_training': training_active})
    emit('speed_update', get_speed_payload())
    if training_stats['game_number'] > 0:
        emit('training_update', training_stats)


@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')


@socketio.on('start_training')
def handle_start_training():
    global training_thread, training_active, agent, game, user_set_speed
    
    if not training_active:
        # Reset training state for fresh start
        agent = None
        game = None
        user_set_speed = False  # Reset speed flag for new training session
        training_active = True
        training_thread = threading.Thread(target=training_loop, daemon=True)
        training_thread.start()
        socketio.emit('training_status', {'is_training': True}, broadcast=True)
        print("Training started by client")


@socketio.on('stop_training')
def handle_stop_training():
    global training_active
    
    if training_active:
        training_active = False
        socketio.emit('training_status', {'is_training': False}, broadcast=True)
        print("Training stopped by client")


@socketio.on('set_speed')
def handle_set_speed(data):
    global current_speed, training_active, user_set_speed
    label = data.get('label')
    if not label:
        return
    if label not in SPEED_OPTIONS:
        return
    current_speed = SPEED_OPTIONS[label]
    
    # Mark that user manually set speed (disable auto-speed adjustment)
    if training_active:
        user_set_speed = True
        print(f"User manually set speed to {label} - disabling auto-adjust")
    
    socketio.emit('speed_update', get_speed_payload(), broadcast=True)
    print(f"Training speed set to {label}")


@app.route('/')
def index():
    return {'status': 'Snake Game AI Backend Running', 'training': training_active}


@app.route('/health')
def health():
    return {'status': 'healthy'}


if __name__ == '__main__':
    print("Starting Snake Game AI Backend on http://localhost:5001")
    socketio.run(app, host='0.0.0.0', port=5001, debug=False, allow_unsafe_werkzeug=True)

