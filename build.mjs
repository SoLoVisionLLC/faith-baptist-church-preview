import { cp, mkdir, rm } from 'node:fs/promises';
import { dirname } from 'node:path';

const files = [
  'index.html',
  'about.html',
  'ministries.html',
  'sermons.html',
  'events.html',
  'visit.html',
  'give.html',
  'contact.html',
  'visit/index.html',
  'beliefs/index.html',
  'ministries/index.html',
  'events/index.html',
  'contact/index.html',
  'css/main.css',
  'js/main.js',
  'assets/images/fbc_logo.png',
  'assets/images/793a0944-867c-4811-85da-ecd4b9fbdb78.jpg',
  'assets/images/church_exterior_front.jpg',
  'assets/images/church_sanctuary_cross.jpg'
];

await rm('dist', { recursive: true, force: true });
for (const file of files) {
  const destination = `dist/${file}`;
  await mkdir(dirname(destination), { recursive: true });
  await cp(file, destination);
}
console.log(`Built ${files.length} public files into dist/`);
