import Ember from 'ember';
import { statusList } from 'ember-invoice-manager/models/invoice';
import moment from 'moment';

const { Component, inject } = Ember;

export default Component.extend({
  store: inject.service('store'),
  isEditRoute: false,
  statusList: statusList,
  newItemDescription: '',
  newItemAmount: '',

  actions: {
    createItem(changeset) {
      const { newItemDescription, newItemAmount, model } = this.getProperties('newItemDescription', 'newItemAmount', 'model');
      
      const record = this.get('store').createRecord('invoice-item', {
        createdAt: moment().toDate(),
        amount: newItemAmount,
        description: newItemDescription,
        invoice: model
      });

      this.setProperties({
        'newItemDescription': '',
        'newItemAmount': ''
      });

      return changeset.get('invoiceItems').addObject(record);
    },

    deleteItem(record) {
      const changeset = this.get('changeset');
      
      // remove target item from hasMany relationship
     return changeset.get('invoiceItems').removeObject(record);
    }
  }
});
