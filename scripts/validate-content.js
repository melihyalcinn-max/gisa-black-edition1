const fs = require('fs');
const path = require('path');
const files = ['site.json','fragrances.json','sectors.json','blog.json','faqs.json'];
for (const file of files) {
  const full = path.join(process.cwd(), 'content', file);
  try {
    JSON.parse(fs.readFileSync(full, 'utf8'));
    console.log('OK', file);
  } catch (err) {
    console.error('JSON HATASI:', file, err.message);
    process.exit(1);
  }
}
