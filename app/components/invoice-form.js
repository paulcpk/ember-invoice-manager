import Ember from 'ember';
import { statusList } from 'ember-invoice-manager/models/invoice';
import moment from 'moment';
import Changeset from 'ember-changeset';

const { Component, inject, computed } = Ember;

export default Component.extend({
  store: inject.service('store'),
  isEditRoute: false,
  statusList: statusList,
  newItemDescription: '',
  newItemAmount: '',
  changes: computed.alias('changeset.changes'),

  init() {
    this._super(...arguments);
    let model = this.get('model');
    this.changeset = new Changeset(model);
  },

  actions: {
    createItem() {
      const { newItemDescription, newItemAmount, model } = this.getProperties('newItemDescription', 'newItemAmount', 'model');
      
      const record = this.get('store').createRecord('invoice-item', {
        createdAt: moment().toDate(),
        amount: newItemAmount,
        description: newItemDescription
      });

      this.setProperties({
        'newItemDescription': '',
        'newItemAmount': ''
      });

      let changeset = this.get('changeset');
      const invoiceItems = changeset.get('invoiceItems').toArray().addObject(record);
      return changeset.set('invoiceItems', invoiceItems);
    },

    deleteItem(record) {
      let changeset = this.get('changeset');
      
      // remove target item from hasMany relationship
      const invoiceItems = changeset.get('invoiceItems').toArray().removeObject(record);
      return changeset.set('invoiceItems', invoiceItems);
    }
  }
});
