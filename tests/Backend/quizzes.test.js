/* eslint-disable no-undef */
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

import Quizzes from '../../pages/api/quizzes/index';
import { sampleQuizzes } from '../sampleData';


describe('Quizzes', () => {
  it('fetches quiz from server', async () => {
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

    await Quizzes(req, res);

    console.log(json.mock.calls[0][0]);
    // expect(json.mock.calls[0][0]).toEqual(sampleQuizzes);
  });
});