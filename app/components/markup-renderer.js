import Component from '@ember/component';
import Ember from 'ember';

const { HTMLBars } = Ember

export default Component.extend({
  html: null,
  didReceiveAttrs() {
    this._super(...arguments);

    const markup = this.get('markup');
    let template = HTMLBars.compile(markup);
    Ember.TEMPLATES['pdf-view'] = template;
  }
});
