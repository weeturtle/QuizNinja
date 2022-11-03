// Function to pick a random fruit type
const randomEnum = <T extends {[key: string]: string}>(anEnum: T): T[keyof T] => {
  // Fetches the possible values of the enum as an array
  const enumValues = (Object.values(anEnum) as unknown) as T[keyof T][];

  // Picks a random value from the array
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  
  // Returns the fruit type at the random index
  return enumValues[randomIndex];
};

export default randomEnum;