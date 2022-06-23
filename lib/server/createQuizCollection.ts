import { connectToDatabase } from './mongodb';

// Contains a function to set up the quiz collection
// Only runs if the collection does not already exist
export const CreateCollection = async () => {
  const { db } = await connectToDatabase();
  await db.createCollection('Quizzes', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['name', 'questions'],
        properties: {
          name: {
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
                    bsonType: 'object',
                    required: ['answer', 'isCorrect'],
                    properties: {
                      answer: {
                        bsonType: 'string',
                        description: 'must be a string and is required'
                      },
                      isCorrect: {
                        bsonType: 'bool',
                        description: 'must be a bool and is required'
                      }
                    }
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