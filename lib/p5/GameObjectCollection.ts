import p5 from 'p5';
import GameObject from './GameObject';

type GameObjectCollectionInternal<T extends GameObject> = {
  tags: Set<string>,
  object: T
}

type GameObjectIterableResult<T extends GameObject> = {
  id: number,
  object: T
}

type GameObjectIterable<T extends GameObject> = IterableIterator<GameObjectIterableResult<T>>

class GameObjectCollection<T extends GameObject = GameObject> {
  // Stores a hash map of all the objects in the collection
  private objects: Map<number, GameObjectCollectionInternal<T>>;

  // Stores an array of the tags that the object has with object ids
  // That have the same tag
  private tags: { [id: string]: Set<number> };

  // Manages the id of the next object to be added
  private nextId: number;

  constructor() {
    // Creates an empty hash map for the objects
    this.objects = new Map();
    // Creates an empty object for the tags
    this.tags = {};

    // Sets the next id to 0
    this.nextId = 0;
  }

  // Add an object to the collection
  // If the object has a tag, add it to the tag index
  // Return the id of the object
  add(object: T, tag?: string) {
    // Creates an instance of the internal object that will be stored in the collection
    const item: GameObjectCollectionInternal<T> = { tags: new Set, object };

    // If the object has a tag, add it to the tag index
    if (tag) {
      // Split up the tag string into an array of tags by .
      const tags = tag.split('.');

      // Add the tag to the new item's tag set
      item.tags = new Set(tags);

      // Iterate over the tags
      for (const tag of tags) {
        // If the tag doesn't exist in the tag array of the collection
        // Create a new set for the tag
        if (!this.tags[tag]) {
          this.tags[tag] = new Set();
        }

        // Add the new items id to the tag set
        this.tags[tag].add(this.nextId);
      }
    }

    // Add the new item to the collection at the next id
    this.objects.set(this.nextId, item);

    // Return the id of the new item
    // Increment the next id
    return this.nextId++;
  }

  // Remove an object from the collection
  // If the object has a tag, remove it from the tag index
  remove(id: number) {
    // Get the object from the collection
    const item = this.objects.get(id);

    // If the object doesn't exist, return
    if (!item) {
      return;
    }

    // Iterate over the tags in the object
    for (const tag of item.tags) {
      // Remove the object id from the tag set
      this.tags[tag].delete(id);
    }

    // Remove the object from the collection
    this.objects.delete(id);
  }

  // Get an object from the collection
  get(id: number) {
    // Get the object from the collection
    return this.objects.get(id);
  }

  // Get objects from the collection by tag
  // If tag is not provided, return all objects
  query(tag?: string): GameObjectIterable<T> {
    // Declare the next function for the iterator, but do not define it yet
    let next: () => IteratorResult<GameObjectIterableResult<T>>;

    // If the tag is not provided
    if (!tag) {
      // Create an iterator for the collection of objects
      const entries = this.objects.entries();

      // Define the next function
      next = () => {
        // Get the next entry in the collection
        const entry = entries.next();

        return {
          // If there are no more entries, return done
          done: entry.done,
          // The value of the item
          value: {
            // The GameObject
            object: entry.value[1]?.object,
            // The id of the GameObject
            id: entry.value[0],
          },
        };
      };
    } else {
      // Split the different tags up by a . but dont split any elements split by a \.
      const tags = tag.split('.');

      // start I at 0
      let i = 0;

      // Get the first tag in the list
      let current = this.tags[tags[i]]?.values();

      // Discard tags until a tag is found in the collection
      while (!current && i < tags.length) {
        current = this.tags[tags[i++]]?.values();
      }
          
      // Define the next function
      next = () => {
        // If there are no more tags, return done
        if (i >= tags.length)
          return { value: null, done: true };

        // Get the next id from the objects attributed with the current tag
        const id = current.next();

        // If there are no ids left attributed to the current tag and there are still tags left
        if (id.done && i < tags.length)  {
          // Get the next tag
          current = this.tags[tags[i++]]?.values();

          // Discard tags until a tag is found in the collection
          while (current === undefined && i < tags.length) {
            current = this.tags[tags[i++]]?.values();
          }
        }

        return {
          // The value of the item
          value: {
            // The GameObject
            object: this.objects.get(id.value)?.object,
            // The id of the GameObject
            id: id.value,
          },
          // If there are no more ids left attributed to the current tag and there are no more tags left, return done
          done: (i >= tags.length),
        } as IteratorResult<GameObjectIterableResult<T>>;
      };
    }

    // Return the iterator object
    return {
      next,
      [Symbol.iterator]: function() { return this; },
    };
  }


  render(p: p5) {
    // Creates an iterator for the collection of objects
    const GameObjectIterator = this.objects.entries();

    // Iterate over the objects in the collection
    let currentIterationObject = GameObjectIterator.next();
    while (!currentIterationObject.done) {
      // Get the current object
      const currentGameObject = currentIterationObject.value[1].object;

      // Render the object
      currentGameObject.render(p, this, currentIterationObject.value[0]);

      // Get the next object
      currentIterationObject = GameObjectIterator.next();
    }
  }

  update(p: p5) {
    // Creates an iterator for the collection of objects
    const GameObjectIterator = this.objects.entries();

    // Iterate over the objects in the collection
    let currentIterationObject = GameObjectIterator.next();
    while (!currentIterationObject.done) {
      // Get the current object
      const currentGameObject = currentIterationObject.value[1].object;

      // update the object
      currentGameObject.update(p, this, currentIterationObject.value[0]);

      // Get the next object
      currentIterationObject = GameObjectIterator.next();
    }
  }
}

export default GameObjectCollection;