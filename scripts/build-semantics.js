/* eslint-disable no-console, max-len */
const fs = require('fs');
const path = require('path');
const combos = require('string-combos');

class Semantic {
  constructor(root, type, stems) {
    if (!root) {
      throw new Error('Semantic requires a value for root');
    }
    if (!type) {
      throw new Error('Semantic requires a value for type');
    } else if (
      type !== 'thought' &&
      type !== 'emotion' &&
      type !== 'situation' &&
      type !== 'event'
    ) {
      throw new Error('Invalid semantic type');
    }

    this.root = root;
    this.type = type;
    this.metadata = {};
    this.stems = stems || [];
  }

  addStems(stems) {
    this.stems = this.stems.concat(stems);
  }

  meta(data) {
    if (typeof data !== 'object') {
      throw new Error('Metadata for semantic should be an object');
    }

    this.metadata = data;
  }

  toJSON() {
    return {
      root: this.root,
      type: this.type,
      stems: this.stems,
      meta: this.metadata,
    };
  }
}

const semantics = [];

// =============================================================================

const feelLikeAFailure = new Semantic('I feel like a failure', 'thought');

feelLikeAFailure.addStems([
  'I keep failing',
  'I can not succeed',
  'I always fail',
  ...combos(`I ${combos('feel like', 'think I am', 'must be')} a failure`),
]);

feelLikeAFailure.meta({
  pattern: 'mislabeling',
});

semantics.push(feelLikeAFailure);

// =============================================================================

const feelLikeALoser = new Semantic('I feel like a loser', 'thought');

feelLikeALoser.addStems([
  'I keep losing',
  'I always lose',
  ...combos(`I ${combos('never', 'can not')} ${combos('win', 'succeed')}`),
  ...combos(`I ${combos('feel like', 'think I am', 'must be')} a loser`),
]);

feelLikeALoser.meta({
  pattern: 'mislabeling',
});

semantics.push(feelLikeALoser);

// =============================================================================

const gotRejected = new Semantic('I got rejected', 'event');

gotRejected.addStems([
  ...combos(`I did not get ${combos('selected', 'approved', 'promoted', 'accepted')}`),
  ...combos(`I got ${combos('rejected', 'denied', 'turned down')}`),
]);

semantics.push(gotRejected);

// =============================================================================

const gotIntoArgument = new Semantic('I got into an arguement with someone', 'event');

gotIntoArgument.addStems([...combos(`I got into ${combos('an argument', 'a debate', 'a fight')}`)]);

semantics.push(gotIntoArgument);

// =============================================================================

const triedAndDidNotSucceed = new Semantic('I tried but did not succeed', 'event');

triedAndDidNotSucceed.addStems([
  ...combos(`${combos('I tried but', 'Even though I tried I')} ${combos(
    'did not succeed',
    'failed',
    'did not make it',
  )}`),
]);

semantics.push(triedAndDidNotSucceed);

// =============================================================================

const havingRelationshipIssues = new Semantic("I'm having relationship issues", 'situation');

havingRelationshipIssues.addStems([
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
]);

semantics.push(havingRelationshipIssues);

// =============================================================================

const havingFinancialIssues = new Semantic("I'm having financial issues", 'situation');

havingFinancialIssues.addStems([
  'My finances are struggling',
  'I am having a hard time with money',
  'My savings are dwindling',
  'Have to take out a loan',
  'Not gonna have enough for rent',
  'Rent is due and do not have the money',
  'Budget is tight',
]);

semantics.push(havingFinancialIssues);

// =============================================================================

const outPath = path.resolve(__dirname, '..', 'data', 'semantics.json');
const outText = JSON.stringify(semantics.map(s => s.toJSON()), null, 2);

fs.writeFile(outPath, outText, 'utf8', (err) => {
  if (err) throw err;
});
