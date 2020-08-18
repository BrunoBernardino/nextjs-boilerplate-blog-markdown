import expect from 'expect';

import { markdownToHtml } from '../utils';

describe('lib/utils', () => {
  it('markdownToHtml', async () => {
    const tests = [
      {
        input: '## hello',
        expected: '<h2>hello</h2>\n',
      },
      {
        input: '_something_ **nice**',
        expected: '<p><em>something</em> <strong>nice</strong></p>\n',
      },
    ];

    for (const test of tests) {
      const result = await markdownToHtml(test.input);
      expect(result).toEqual(test.expected);
    }
  });
});
