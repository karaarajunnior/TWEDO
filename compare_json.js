const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'src', 'translations', 'en.json');
const atPath = path.join(__dirname, 'src', 'translations', 'at.json');

const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const at = JSON.parse(fs.readFileSync(atPath, 'utf8'));

function getKeys(obj, prefix = '') {
  let keys = {};
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      Object.assign(keys, getKeys(obj[key], fullKey));
    } else if (Array.isArray(obj[key])) {
      keys[fullKey] = obj[key].map((item, idx) => {
        if (typeof item === 'object') {
          return getKeys(item, `${fullKey}[${idx}]`);
        }
        return `${fullKey}[${idx}]`;
      });
    } else {
      keys[fullKey] = typeof obj[key];
    }
  }
  return keys;
}

const enKeys = getKeys(en);
const atKeys = getKeys(at);

console.log('Comparing English keys to Ateso keys:');
const missingInAt = [];
const typeMismatch = [];

for (const key in enKeys) {
  if (!(key in atKeys)) {
    missingInAt.push(key);
  } else if (typeof enKeys[key] !== typeof atKeys[key]) {
    typeMismatch.push({ key, enType: typeof enKeys[key], atType: typeof atKeys[key] });
  }
}

const extraInAt = [];
for (const key in atKeys) {
  if (!(key in enKeys)) {
    extraInAt.push(key);
  }
}

console.log('\nMissing in Ateso keys count:', missingInAt.length);
console.log('Missing keys in Ateso:\n', JSON.stringify(missingInAt, null, 2));

console.log('\nExtra in Ateso keys count:', extraInAt.length);
console.log('Extra keys in Ateso:\n', JSON.stringify(extraInAt, null, 2));

console.log('\nType mismatch count:', typeMismatch.length);
if (typeMismatch.length > 0) {
  console.log('Type mismatches:\n', JSON.stringify(typeMismatch, null, 2));
}
