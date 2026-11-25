const inlinePattern =
  /\*\*([^*\n]+)\*\*|__([^_\n]+)__|\*([^*\n]+)\*|_([^_\n]+)_|`([^`\n]+)`|\[([^\]]+)\]\([^)]+\)|([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})|(\+?\d[\d\s().-]*\d)/gi;

function parseInlineText(text) {
  const segments = [];
  let lastIndex = 0;
  let match;

  while ((match = inlinePattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ text: text.slice(lastIndex, match.index) });
    }

    const boldText = match[1] || match[2];
    const italicText = match[3] || match[4];
    const codeText = match[5];
    const linkText = match[6];
    const email = match[7];
    const number = match[8];

    if (boldText) {
      segments.push({ text: boldText, format: 'strong' });
    } else if (italicText) {
      segments.push({ text: italicText, format: 'em' });
    } else if (codeText) {
      segments.push({ text: codeText, format: 'code' });
    } else if (linkText) {
      segments.push({ text: linkText });
    } else if (email) {
      segments.push({ text: email, format: 'email' });
    } else if (number && number.replace(/\D/g, '').length >= 10) {
      segments.push({ text: number.trim(), format: 'phone' });
    } else {
      segments.push({ text: match[0] });
    }

    lastIndex = inlinePattern.lastIndex;
  }

  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex) });
  }

  return segments;
}

export function parseChatText(text) {
  const lines = String(text ?? '')
    .replace(/\r\n?/g, '\n')
    .replace(/```[^\n]*\n?/g, '')
    .replace(/\s+(?=📍|📧|📞|✉️|☎️)/g, '\n')
    .replace(
      /\s+((?:Office|Location|Contact|Email|Phone|Telephone)(?:\s+(?:details?|number|address))?\s*[-–—:])/gi,
      (match, label, offset, source) =>
        /(?:📍|📧|📞|✉️|☎️)\s*$/.test(source.slice(0, offset)) ? match : `\n${label}`,
    )
    .split('\n');
  const blocks = [];
  let paragraph = [];
  let list = [];

  function flushParagraph() {
    if (paragraph.length) {
      blocks.push({ type: 'paragraph', segments: parseInlineText(paragraph.join(' ')) });
      paragraph = [];
    }
  }

  function flushList() {
    if (list.length) {
      blocks.push({ type: 'list', items: list.map(parseInlineText) });
      list = [];
    }
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || /^(-{3,}|\*{3,}|_{3,})$/.test(line)) {
      flushParagraph();
      flushList();
      continue;
    }

    const plainLine = line.replace(/[*_`]/g, '');
    const contactLine =
      /^(?:📍|📧|📞|✉️|☎️)/.test(line) ||
      /^(?:Office|Location|Contact|Email|Phone|Telephone)(?:\s+(?:details?|number|address))?\s*[-–—:]/i.test(plainLine);
    if (contactLine) {
      flushParagraph();
      flushList();
      blocks.push({ type: 'paragraph', segments: parseInlineText(line) });
      continue;
    }

    const heading = line.match(/^#{1,6}\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      blocks.push({ type: 'heading', segments: parseInlineText(heading[1]) });
      continue;
    }

    const listItem = line.match(/^(?:[-*+]|\d+[.)]|•)\s+(.+)$/);
    if (listItem) {
      flushParagraph();
      list.push(listItem[1]);
      continue;
    }

    flushList();
    paragraph.push(line.replace(/^>\s?/, ''));
  }

  flushParagraph();
  flushList();
  return blocks;
}
