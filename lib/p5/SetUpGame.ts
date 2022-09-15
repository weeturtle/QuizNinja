import p5 from 'p5';
import GameObjectCollection from './GameObjectCollection';
import PlayerCursor from './PlayerCursor';

const SetupGame = (p: p5, collection: GameObjectCollection) => {
  collection.add(new PlayerCursor(
    25,
    p.color(60, 60, 60)
  ), 'player');
};

export default SetupGame;