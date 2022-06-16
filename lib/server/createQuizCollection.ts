import { connectToDatabase } from './mongodb';

export const CreateCollection = async () => {
  const { db } = await connectToDatabase();
  await db.createCollection('Quizzes', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['title', 'questions'],
        properties: {
          title: {
            bsonType: 'string',
            description: 'must be a string and is required'
          },
          subject: {
            bsonType: 'string',
            description: 'must be a string and is required'
          },
          questions: {
            bsonType: 'array',
            description: 'must be an array and is required',
            items: {
              bsonType: 'object',
              required: ['question', 'answers'],
              properties: {
                question: {
                  bsonType: 'string',
                  description: 'must be a string and is required'
                },
                answers: {
                  bsonType: 'array',
                  description: 'must be an array and is required',
                  items: {
                    bsonType: 'string',
                    description: 'must be a string and is required'
                  }
                }
              }
            }
          }
        }
      }
    }

  });
};