import Ember from 'ember';
import { getStyleClassByStatus, statusList } from 'ember-invoice-manager/models/invoice';

const { computed, Component } = Ember;

export function getTotalByStatus(model, status) {
  const filteredModel = model.filterBy('status', status);

  return filteredModel.length;
}

export default Component.extend({
  classNames: ['widget-income-overview'],

  init() {
    this._super(...arguments);
  },

  getInvoiceStats: computed('model.@each.status', function() {
    const model = this.get('model');
    let invoiceStats = [];

    statusList.map((status) => {
      const sum = getTotalByStatus(model, status);
      const style = getStyleClassByStatus(status);

      invoiceStats.push({
        'status': status,
        'sum': sum,
        'style': style
      });
    });

    return invoiceStats;
  })
});
