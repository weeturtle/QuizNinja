import p5 from 'p5';
import GameObjectCollection from './lib/GameObjectCollection';
import PlayerCursor from './objects/PlayerCursor';
import Floor from './objects/Floor';
import Vector from './Vector';
import Lives from './objects/Lives';

// Function which creates the basic game objects
// and adds them to the game object collection
// This function is called once at the start of the game
const SetupGame = (p: p5, collection: GameObjectCollection) => {
  // Create a new player cursor object
  // Adds it to the game object collection with the tag 'player'
  collection.add(new PlayerCursor(
    25,
    p.color(60, 60, 60)
  ), 'player');

  // Create a new floor object
  // Adds it to the game object collection with the tag 'floor'
  collection.add(new Floor(
    new Vector(0, 680)
  ), 'floor');

  // Create a new lives object
  // Adds it to the game object collection with the tag 'lives'
  collection.add(new Lives(
    4
  ), 'lives');
};

export default SetupGame;