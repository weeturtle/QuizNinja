import GameObjectCollection from './lib/GameObjectCollection';
import PlayerCursor from './objects/PlayerCursor';
import Floor from './objects/Floor';
import Lives from './objects/Lives';
import Score from './objects/Score';
import Questions from './Questions';
import Question from './objects/Question';

// Function which creates the basic game objects
// and adds them to the game object collection
// This function is called once at the start of the game
const SetupGame = (collection: GameObjectCollection, questions: Questions) => {
  // Create a new player cursor object
  // Adds it to the game object collection with the tag 'player'
  collection.add(new PlayerCursor(), 'player');

  // Create a new floor object
  // Adds it to the game object collection with the tag 'floor'
  collection.add(new Floor(), 'floor');

  // Create a new lives object
  // Adds it to the game object collection with the tag 'lives'
  collection.add(new Lives(
    4
  ), 'lives');

  // Creates a new score object
  // Adds it to the game object collection with the tag 'score'
  collection.add(new Score(), 'score');

  // Creates a new question object
  // Adds it to the game object collection with the tag 'question'
  collection.add(new Question(questions.getCurrentQuestion().question), 'question');

};

export default SetupGame;