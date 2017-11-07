import Ember from 'ember';
import { templateList, statusList } from 'ember-invoice-manager/models/invoice';

const { Component, inject } = Ember;

export default Component.extend({
  store: inject.service('store'),
  isEditRoute: false,
  statusList,
  templateList,
  newItemDescription: '',
  newItemAmount: '',
  isProcessing: false,
  
  actions: {
    uploadLogo(file) {
      try {
        file.readAsDataURL().then((url) => {
          this.get('model').set('logo', url);
        });
      } catch (e) {
        console.log(e);
      }
    },

    deleteLogo() {
      this.get('model').set('logo', null);
    },

    createItem() {
      const { newItemDescription, newItemAmount, model } = this.getProperties('newItemDescription', 'newItemAmount', 'model');
      
      const record = {
        amount: newItemAmount,
        description: newItemDescription
      };

      this.setProperties({
        'newItemDescription': '',
        'newItemAmount': ''
      });

      const invoiceItems = model.get('invoiceItems').toArray().addObject(record);
      return model.set('invoiceItems', invoiceItems);
    },

    deleteItem(record) {
      let model = this.get('model');
      
      // remove target item from hasMany relationship
      const invoiceItems = model.get('invoiceItems').toArray().removeObject(record);
      return model.set('invoiceItems', invoiceItems);
    }
  }
});
