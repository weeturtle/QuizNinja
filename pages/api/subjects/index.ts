import { NextApiHandler } from 'next';
import { createSubject, getAllSubjects } from '../../../prisma/subjects';

// Handles API requests made to /api/subjects
const SubjectHandler: NextApiHandler = async (req, res) => {
  switch (req.method) {
  case 'GET': {
    // Gets all the subjects from the database
    const subjects = await getAllSubjects();
    // Returns the subjects
    return res.status(200).json(subjects);
  }

  case 'POST': {
    // Creates a new subject
    const subject = await createSubject(req.body.name);
    // Returns the subject
    return res.status(200).json(subject);
  }

  default:
    return res.status(405).json({
      message: 'Method not allowed',
    });
  }
};

export default SubjectHandler;