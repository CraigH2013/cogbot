const fs = require('fs');
const path = require('path');
const combos = require('string-combos');
const Semantic = require('../lib/semantic');

const semantics = [];

// =============================================================================

const feelLikeAFailure = new Semantic('I feel like a failure', 'thought');

feelLikeAFailure.stems = [
  'I keep failing',
  'I can not succeed',
  'I always fail',
  ...combos(`I ${combos('feel like', 'think I am', 'must be')} a failure`),
];

feelLikeAFailure.meta = {
  pattern: 'mislabeling',
};

semantics.push(feelLikeAFailure);

// =============================================================================

const feelLikeALoser = new Semantic('I feel like a loser', 'thought');

feelLikeALoser.stems = [
  'I keep losing',
  'I always lose',
  ...combos(`I ${combos('never', 'can not')} ${combos('win', 'succeed')}`),
  ...combos(`I ${combos('feel like', 'think I am', 'must be')} a loser`),
];

feelLikeALoser.meta = {
  pattern: 'mislabeling',
};

semantics.push(feelLikeALoser);

// =============================================================================

const gotRejected = new Semantic('I got rejected', 'event');

gotRejected.stems = [
  ...combos(`I did not get ${combos('selected', 'approved', 'promoted', 'accepted')}`),
  ...combos(`I got ${combos('rejected', 'denied', 'turned down')}`),
];

semantics.push(gotRejected);

// =============================================================================

const gotIntoArgument = new Semantic(
  'I got into an arguement with someone',
  'event',
);

gotIntoArgument.stems = [
  ...combos(`I got into ${combos('an argument', 'a debate', 'a fight')}`),
];

semantics.push(gotIntoArgument);

// =============================================================================

const triedAndDidNotSucceed = new Semantic(
  'I tried but did not succeed',
  'event',
);

triedAndDidNotSucceed.stems = [
  ...combos(`${combos('I tried but', 'Even though I tried I')} ${combos(
    'did not succeed',
    'failed',
    'did not make it',
  )}`),
];

semantics.push(triedAndDidNotSucceed);

// =============================================================================

const havingRelationshipIssues = new Semantic(
  "I'm having relationship issues",
  'situation',
);

havingRelationshipIssues.stems = [
  ...combos(`I am having ${combos('issues', 'problems', 'struggles')} in my ${combos(
    'marriage',
    'relationship',
  )}`),
  ...combos(`My ${combos(
    'spouse',
    'partner',
    'husband',
    'wife',
    'girlfriend',
    'boyfriend',
    'significant other',
  )} and I are having ${combos('issues', 'problems', 'struggles')}`),
];

semantics.push(havingRelationshipIssues);

// =============================================================================

const havingFinancialIssues = new Semantic(
  "I'm having financial issues",
  'situation',
);

havingFinancialIssues.stems = [
  'My finances are struggling',
  'I am having a hard time with money',
  'My savings are dwindling',
  'Have to take out a loan',
  'Not gonna have enough for rent',
  'Rent is due and do not have the money',
  'Budget is tight',
];

semantics.push(havingFinancialIssues);

// =============================================================================
const printRoots = true;

const outPath = path.resolve(__dirname, '..', 'data', 'semantics.json');
const outText = JSON.stringify(
  semantics.map((s) => {
    if (printRoots) console.log(s.root);
    return s.toJSON();
  }),
  null,
  2,
);

fs.writeFile(outPath, outText, 'utf8', (err) => {
  if (err) throw err;
});
