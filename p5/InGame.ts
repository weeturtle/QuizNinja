import p5 from 'p5';
import GameState, { GameStates } from './GameState';
import GameObjectCollection from './lib/GameObjectCollection';
import randomEnum from './lib/GenerateFruitType';
import Fruit, { Fruits } from './objects/Fruit';
import Lives from './objects/Lives';
import Question from './objects/Question';
import Questions from './Questions';

// Function called once the game is loaded
// Runs every frame
const inGame = (p: p5, gameObjects: GameObjectCollection, gameState: GameState, questions: Questions) => {
  // All of the game objects are rendered and updated
  gameObjects.update(p);
  gameObjects.render(p);

  // Gets the lives object from the game object collection
  const lives = gameObjects.query('lives').next().value.object as Lives;

  // If the number of lives is 0
  if (lives.lives === 0) {
    // Changes the game state to the game over state
    gameState.state = GameStates.GAME_OVER;
    return;
  }

  // Gets the current fruit from the game object collection
  const currentFruit = gameObjects.query('fruit').next().value?.object;

  // Fetch question object from the game collection
  const question = gameObjects.query('question').next().value.object as Question;
  // Set the question text to the current question
  question.newQuestion(questions.CurrentQuestion.question);
  
  // If no fruit is being displayed
  if (!currentFruit) {
    
    // If there are no more answers to the current question
    if (questions.isAnswersFinished) {
      // Go to the next question
      questions.nextQuestion();
      
      // If there are no more questions
      if (questions.isQuestionsFinished) {
        // Change the game state to game over
        gameState.state = GameStates.GAME_OVER;
        // Return so no question is fetched
        return;
      }
    
    }

    // Creates a new fruit
    // Adds it to the game object collection with the tag 'fruit'
    gameObjects.add(new Fruit(randomEnum(Fruits), questions.CurrentAnswer), 'fruit');
    // Increments the current answer
    questions.nextAnswer();
  }



};

export default inGame;