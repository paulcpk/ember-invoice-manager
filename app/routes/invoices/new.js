import Ember from 'ember';
import moment from 'moment';

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
      const settings = hash.settings.get('firstObject').getProperties(
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
          this.transitionTo('invoices.edit');
        }), 200);
      });
    },

    cancel() {
      return this.transitionTo('invoices');
    }
  }
});
