import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');

test('homepage has one H1 and expected landmarks', () => {
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  for (const landmark of ['<header', '<main', '<nav', '<footer']) {
    assert.match(html, new RegExp(landmark));
  }
});

test('primary navigation anchors resolve', () => {
  for (const id of ['welcome', 'beliefs', 'ministries', 'times', 'visit']) {
    assert.match(html, new RegExp(`id="${id}"`));
    assert.match(html, new RegExp(`href="#${id}"`));
  }
});

test('confirmed contact and schedule facts are present', () => {
  for (const value of ['419-348-2171', '11275 W. Twp. Rd. 116', '9:00', '10:00', '6:00', '7:00']) {
    assert.match(html, new RegExp(value.replaceAll('.', '\\.')));
  }
});

test('referenced local assets exist', async () => {
  const assetPaths = [...html.matchAll(/(?:src|href)="((?:assets|css|js)\/[^"#]+)"/g)].map((match) => match[1]);
  for (const assetPath of new Set(assetPaths)) {
    await access(new URL(`../${assetPath}`, import.meta.url));
  }
});

test('draft contains no known legacy inventions', () => {
  for (const invented of ['Pastor David Miller', 'Galatians: Grace Over Law', 'Family Fellowship Potluck', 'online giving portal']) {
    assert.doesNotMatch(html, new RegExp(invented, 'i'));
  }
});
