// The possible game states of the game
export enum GameStates {
  NEW_GAME = 'new_game',
  IN_GAME = 'in_game',
  GAME_OVER = 'game_over',
}

// Class to handle the game state
class GameState {
  public state: GameStates = GameStates.NEW_GAME;

  public setState(state: GameStates) {
    this.state = state;
  }
}

export default GameState;