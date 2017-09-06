import Ember from 'ember';
import Changeset from 'ember-changeset';

const { Component } = Ember;

export default Component.extend({
  init() {
    this._super(...arguments);
    let model = this.get('model');
    this.changeset = new Changeset(model);
  }
});
