import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (fs.existsSync(indexHtmlPath)) {
  const routes = [
    'visit.html',
    'beliefs.html',
    'ministries.html',
    'events.html',
    'sermons.html',
    'contact.html',
    'plan-of-salvation.html',
    '404.html'
  ];

  const htmlContent = fs.readFileSync(indexHtmlPath, 'utf8');

  for (const route of routes) {
    const target = path.join(distDir, route);
    fs.writeFileSync(target, htmlContent, 'utf8');
  }

  console.log(`✓ Postbuild: Generated ${routes.length} static route entry points in dist/`);
} else {
  console.warn('⚠️ Postbuild: dist/index.html not found, skipping postbuild route generation');
}
