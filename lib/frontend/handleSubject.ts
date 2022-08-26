// Used to manage the subjects when the edit or create components are submitted
const handleSubject = async (subjectId: string, name: string): Promise<string> => {
  // If the subject id is present then return the subject id
  if (subjectId) return subjectId;

  // If the name is not present, return an empty string
  if (!name) return '';

  // Creates a new subject in the database
  // Stores the html response in a variable
  const response = await fetch('/api/subjects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name })
  });

  // Extracts the response body as JSON
  const subject = await response.json();

  // Returns the subject id
  return subject.id;
};

export default handleSubject;