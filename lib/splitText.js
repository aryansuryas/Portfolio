/**
 * Dependency-free text splitter for reveal animations.
 * Splits an element's text into <span class="split-word"><span class="split-inner">…
 * so words can slide out of clip masks. Returns the inner spans for GSAP to animate.
 */
export function splitWords(el) {
  const text = el.textContent;
  el.textContent = '';
  el.setAttribute('aria-label', text);

  const inners = [];
  text.split(/\s+/).filter(Boolean).forEach((word, i, arr) => {
    const mask = document.createElement('span');
    mask.className = 'split-word';
    mask.setAttribute('aria-hidden', 'true');

    const inner = document.createElement('span');
    inner.className = 'split-inner';
    inner.textContent = word;

    mask.appendChild(inner);
    el.appendChild(mask);
    if (i < arr.length - 1) el.appendChild(document.createTextNode(' '));
    inners.push(inner);
  });
  return inners;
}

/** Same idea at character level (used by section headings). */
export function splitChars(el) {
  const text = el.textContent;
  el.textContent = '';
  el.setAttribute('aria-label', text);

  const chars = [];
  for (const ch of text) {
    if (ch === ' ') {
      el.appendChild(document.createTextNode(' '));
      continue;
    }
    const span = document.createElement('span');
    span.className = 'split-char';
    span.setAttribute('aria-hidden', 'true');
    span.textContent = ch;
    el.appendChild(span);
    chars.push(span);
  }
  return chars;
}
