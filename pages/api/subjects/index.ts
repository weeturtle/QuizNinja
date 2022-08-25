import { NextApiHandler } from 'next';
import { createSubject, getAllSubjects } from '../../../prisma/subjects';

const SubjectHandler: NextApiHandler = async (req, res) => {
  switch (req.method) {
  case 'GET': {
    const subjects = await getAllSubjects();
    return res.status(200).json(subjects);
  }

  case 'POST': {
    const subject = await createSubject(req.body.name);
    return res.status(200).json(subject);
  }

  default:
    return res.status(405).json({
      message: 'Method not allowed',
    });
  }
};

export default SubjectHandler;