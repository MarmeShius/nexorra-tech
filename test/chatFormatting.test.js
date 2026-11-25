import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parseChatText } from '../src/utils/formatChatText.js';

test('preserves paragraphs and renders Markdown lists and emphasis as structured content', () => {
  const blocks = parseChatText(
    'Nexora offers thoughtful solutions.\n\nOur services:\n- **Product strategy & design**\n- **Web development**\n\n## Contact\n> _Verified details_\nEmail us at hello@example.com or call 03035862728.',
  );

  assert.deepEqual(blocks.map(({ type }) => type), ['paragraph', 'paragraph', 'list', 'heading', 'paragraph']);
  assert.deepEqual(blocks[2].items.map((segments) => segments.map(({ text }) => text).join('')), [
    'Product strategy & design',
    'Web development',
  ]);
  assert.deepEqual(
    blocks[4].segments.filter(({ format }) => ['email', 'phone'].includes(format)).map(({ text, format }) => ({ text, format })),
    [
      { text: 'hello@example.com', format: 'email' },
      { text: '03035862728', format: 'phone' },
    ],
  );
});

test('preserves ordinary punctuation and normalizes excessive whitespace', () => {
  assert.equal(
    parseChatText('The API supports GET / POST.\r\n\r\n\r\nPlease contact us.').map(({ segments }) => segments.map(({ text }) => text).join('')).join('\n\n'),
    'The API supports GET / POST.\n\nPlease contact us.',
  );
});

test('puts office, email, and phone details on separate lines', () => {
  const blocks = parseChatText(
    'Enterprise technology solutions\n📍 Office – Faisalabad, Pakistan 📧 Contact – eng.maryamshah@gmail.com 📞 Phone – 03035862728 (by appointment)',
  );

  assert.deepEqual(blocks.map(({ segments }) => segments.map(({ text }) => text).join('')), [
    'Enterprise technology solutions',
    '📍 Office – Faisalabad, Pakistan',
    '📧 Contact – eng.maryamshah@gmail.com',
    '📞 Phone – 03035862728 (by appointment)',
  ]);
});
