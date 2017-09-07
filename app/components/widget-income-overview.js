import Ember from 'ember';
import {getStyleClassByStatus} from 'ember-invoice-manager/models/invoice';

const {computed, Component} = Ember;

export function getTotalByStatus(model, status) {
  const filteredModel = model.filterBy('status', status);

  return filteredModel.reduce(function(sum, item) {
    return sum + item.get('total');
  }, 0);
}

export default Component.extend({
  classNames: ['widget-income-overview'],

  init() {
    this._super(...arguments);
  },

  getTotalList: computed('model.@each.status', function() {
    const model = this.get('model');
    const statusList = model.mapBy('status').uniq();
    let totalList = [];

    statusList.map((status) => {
      const total = getTotalByStatus(model, status);
      const style = getStyleClassByStatus(status);

      totalList.push({
        'status': status,
        'total': total,
        'style': style
      });
    });

    return totalList;
  })
});
