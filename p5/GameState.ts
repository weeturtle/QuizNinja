export enum GameStates {
  NEW_GAME = 'new_game',
  IN_GAME = 'in_game',
  GAME_OVER = 'game_over',
}

class GameState {
  public state: GameStates = GameStates.NEW_GAME;

  public setState(state: GameStates) {
    this.state = state;
  }
}

export default GameState;