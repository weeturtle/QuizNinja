const handleSubject = async (subjectId: string, name: string): Promise<string> => {
  if (subjectId) return subjectId;
  if (!name) return '';

  const response = await fetch('/api/subjects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name })
  });

  const subject = await response.json();

  return subject.id;
};

export default handleSubject;