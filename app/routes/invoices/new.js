import Ember from 'ember';
import moment from 'moment';

import zeroPad from 'ember-invoice-manager/helpers/zero-pad';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      prevInvoice: this.get('store').findAll('invoice'),
      settings: this.get('store').findAll('user'),
      model: this.get('store').createRecord('invoice', {
        'status': 'draft',
        'issuedDate': moment().toDate(),
        'createdDate': moment().toDate(),
        'serviceFromDate': moment().subtract(1, 'month').toDate(),
        'serviceToDate': moment().toDate(),
        'paymentDueDate': moment().add(1, 'month').toDate()
      })
    });
  },

  afterModel(hash) {
    if (hash.settings.get('firstObject')) {  
      // override invoice properties with settings
      const settings = hash.settings.get('firstObject').getProperties(
        'logo',
        'invoiceNumber',
        'senderAddress',
        'taxRate',
        'invoiceTerms',
        'personalData',
        'currency'
      );

      hash.model.setProperties({
        ...settings
      });
    }

    if (hash.prevInvoice.get('lastObject')) {
      // get invoice number of last invoice and increment it
      const prevInvoiceNumber = hash.prevInvoice.get('lastObject').get('invoiceNumber');
      const numberToIncrement = prevInvoiceNumber.match(/\d+$/)[0];
      const increment = zeroPad(parseInt(numberToIncrement, 10) + 1, numberToIncrement.length);
      const invoiceNumber = prevInvoiceNumber.replace(numberToIncrement, increment);
      
      hash.model.setProperties({
        invoiceNumber
      });
    }
  },

  setupController(controller, hash) {
    controller.set('model', hash.model);
  },
  
  renderTemplate() {
    this.render('invoices/form');
  },
  
  actions: {
    willTransition(transition) {
      if(transition.intent.name !== 'invoices.edit') {
        if (!confirm('Are you sure you want to leave? Your changes will be lost.')) {
          transition.abort();
        } else {
          // delete model if user navigates away
          this.controller.get('model').destroyRecord();
        }
      } else {
        return true;
      }
    },

    save(record) {
      this.controller.set('isProcessing', true);
      record.save().then(() => {
        Ember.run.later((() => {
          this.controller.set('isProcessing', false);
          this.transitionTo('invoices.edit', record);
        }), 200);
      });
    },

    cancel() {
      return this.transitionTo('invoices');
    }
  }
});
