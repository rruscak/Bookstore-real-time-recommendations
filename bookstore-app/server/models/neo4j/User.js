const _ = require('lodash');

let Movie = (_node) => {
  _.extend(this, _node.properties);

  if (this.id) {
    this.id = this.id.toNumber();
  }
};

module.exports = Movie;
