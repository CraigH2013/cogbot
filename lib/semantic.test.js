/* eslint-env jest */
const Semantic = require('./semantic');

test('fails for bad contructor parameters', () => {
  /* eslint-disable no-unused-vars */
  expect(() => {
    const semantic = new Semantic();
  }).toThrow('Semantic requires a value for root');

  expect(() => {
    const semantic = new Semantic('Root');
  }).toThrow('Semantic requires a value for type');

  expect(() => {
    const semantic = new Semantic('Root', 'bad type');
  }).toThrow('Invalid semantic type');
  /* eslint-enable no-unused-vars */
});

test('semantic with only root and type', () => {
  const semantic = new Semantic('Root', 'situation');

  expect(semantic.root).toBe('Root');
  expect(semantic.type).toBe('situation');
  expect(semantic.stems).toEqual([]);
  expect(semantic.meta).toEqual({});
});

test('semantic with initial stems and meta', () => {
  const semantic = new Semantic('Foo', 'emotion', ['one', 'two'], {
    one: 'one',
  });

  expect(semantic.root).toBe('Foo');
  expect(semantic.type).toBe('emotion');
  expect(semantic.stems).toEqual(['one', 'two']);
  expect(semantic.meta).toEqual({ one: 'one' });
});

test('adding stems and meta to semantic', () => {
  const semantic = new Semantic('Root', 'event');

  semantic.stems = ['one', 'two'];
  semantic.meta = { one: 'one' };

  expect(semantic.stems).toEqual(['one', 'two']);
  expect(semantic.meta).toEqual({ one: 'one' });

  semantic.stems = ['three', 'four'];
  semantic.meta = { two: 'two' };

  expect(semantic.stems).toEqual(['one', 'two', 'three', 'four']);
  expect(semantic.meta).toEqual({ one: 'one', two: 'two' });
});
