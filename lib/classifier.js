const natural = require('natural');
const semantics = require('../data/semantics.json');

const clf = new natural.BayesClassifier();

semantics.forEach(({ root, stems }) => {
  stems.forEach(stem => clf.addDocument(stem, root));
});

clf.train();

module.exports = clf;
