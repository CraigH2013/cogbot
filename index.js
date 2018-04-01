const clf = require('./lib/classifier');

const text = 'Having issues with my spouse';

const scores = clf.getClassifications(text);

scores.sort((a, b) => b.value - a.value);

/* eslint-disable no-console */
console.log('\n', text, '\n');

scores.forEach(({ label, value }) => {
  console.log(`  - ${label} (${value})`);
});
