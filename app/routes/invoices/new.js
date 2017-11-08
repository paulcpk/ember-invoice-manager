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
      hash.model.setProperties({
        ...hash.settings.get('firstObject')
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

    save(model) {
      this.controller.set('isProcessing', true);
      model.save().then(() => {
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
