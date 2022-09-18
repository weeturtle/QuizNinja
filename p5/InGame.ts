import p5 from 'p5';
import GameState, { GameStates } from './GameState';
import GameObjectCollection from './lib/GameObjectCollection';
import randomEnum from './lib/GenerateFruitType';
import Fruit, { Fruits } from './objects/Fruit';
import Lives from './objects/Lives';

// Function called once the game is loaded
// Runs every frame
const inGame = (p: p5, gameObjects: GameObjectCollection, gameState: GameState) => {
  // All of the game objects are rendered and updated
  gameObjects.update(p);
  gameObjects.render(p);

  // Gets the lives object from the game object collection
  const lives = gameObjects.query('lives').next().value.object as Lives;

  // If the number of lives is 0
  if (lives.lives === 0) {
    // Changes the game state to the game over state
    gameState.state = GameStates.GAME_OVER;
  }

  // If there is no fruit on the screen
  if ([...gameObjects.query('fruit')].length === 0) {
    // Create a new fruit and
    gameObjects.add(new Fruit(
      // Randomly generate the type of the fruit
      randomEnum(Fruits),
      {
        answer: 'The answer',
        isCorrect: false
      }
    ), 'fruit');
  }
};

export default inGame;