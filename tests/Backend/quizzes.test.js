/* eslint-disable no-undef */
import Quizzes from '../../pages/api/quizzes/index';
import { sampleQuizzes } from '../sampleData';

describe('Quizzes', () => {
  it('fetches quiz from server', () => {
    const req = {
      method: 'GET'
    };

    const json = jest.fn();
    const status = jest.fn(() => {
      return {
        json
      };
    });

    const res = { status };

    Quizzes(req, res);

    expect(json.mock.calls[0][0]).toEqual(sampleQuizzes);
  });
});