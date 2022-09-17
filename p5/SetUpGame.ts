import p5 from 'p5';
import Fruit, { FruitType } from './objects/Fruit';
import GameObjectCollection from './lib/GameObjectCollection';
import PlayerCursor from './objects/PlayerCursor';

const SetupGame = (p: p5, collection: GameObjectCollection) => {
  collection.add(new PlayerCursor(
    25,
    p.color(60, 60, 60)
  ), 'player');

  collection.add(new Fruit(
    FruitType.MELON,
    100), 'fruit');
};

export default SetupGame;