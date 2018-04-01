class Semantic {
  constructor(root, type, stems, meta) {
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
    this.metadata = meta || {};
    this.stemsdata = stems || [];
  }

  stems(stems) {
    this.stemsdata = [...this.stemsdata, ...stems];
  }

  meta(data) {
    if (typeof data !== 'object') {
      throw new Error('Metadata for semantic should be an object');
    }

    this.metadata = { ...this.metadata, ...data };
  }

  toJSON() {
    return {
      root: this.root,
      type: this.type,
      stems: this.stems,
      meta: this.metadata
    };
  }
}

module.exports = Semantic;
