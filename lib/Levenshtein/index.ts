// Function that returns the Levenshtein distance between two strings
// The Levenshtein distance is the number of edits needed to transform one string into another
// s: string - The first string
// t: string - The second string
const levenshteinDistance = (s: string, t: string): number => {
  // If either of the strings are empty, returns the length of the other string
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  
  // Creates an empty array
  const arr = [];

  // Loops through the second string
  for (let i = 0; i <= t.length; i++) {
    // Sets the value at the index of the array to the index
    arr[i] = [i];

    // Loops through the first string
    for (let j = 1; j <= s.length; j++) {
      // Sets the value at index j within the array within the array of i
      // 
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
            // If a character needs to be inserted
            arr[i - 1][j] + 1,
            // If a character needs to be deleted
            arr[i][j - 1] + 1,
            // If a character needs to be replaced
            arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
          );
    }
  }
  
  // Returns the value at the length of s's index
  // At the address of the array, the value at the length of t's index is returned
  return arr[t.length][s.length];
};

export default levenshteinDistance;