import levenshteinDistance from '.';

// Takes an array, data, of a generic type T which is specified or inferred
// Takes a function which takes a generic type T and returns a string
// Takes a string, searchTerm, and returns a filtered array of T
export const MapToOpject = <T>(data: T[], dataProperty: (data: T) => string, compareTerm: string) => {

  // Create an array of objects with the data property and the levenshtein distance
  const dataMap = data.map(data => {
    // Generates the levenshtein distance between the data property and the search term
    const levDistance = levenshteinDistance(
      // The data property is a function which takes a generic type T and returns a string
      // The string is sliced reducing the length of the string to the length of the search term
      // This is to match the length of the search term when the levenshtein distance is calculated
      dataProperty(data).slice(0, compareTerm.length).toLowerCase(),
      // The search term converted to lowercase
      compareTerm.toLowerCase()
    );

    // Returns an object with the data property and the levenshtein distance
    return {levDistance, data};
  });

  // Returns the filtered array of objects with the data property and the levenshtein distance
  return dataMap;
};