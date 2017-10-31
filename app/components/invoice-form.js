import Ember from 'ember';
import { statusList } from 'ember-invoice-manager/models/invoice';

const { Component, inject } = Ember;

export default Component.extend({
  store: inject.service('store'),
  isEditRoute: false,
  statusList: statusList,
  newItemDescription: '',
  newItemAmount: '',

  actions: {
    createItem() {
      const { newItemDescription, newItemAmount } = this.getProperties('newItemDescription', 'newItemAmount', 'model');
      
      const record = {
        amount: newItemAmount,
        description: newItemDescription
      };

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
