import Ember from 'ember';
import moment from 'moment';

export default Ember.Route.extend({
  model() {
    return this.get('store').createRecord('invoice', {
      'status': 'draft',
      'issuedDate': moment().toDate(),
      'serviceFromDate': moment().subtract(1, 'month').toDate(),
      'serviceToDate': moment().toDate(),
      'paymentDueDate': moment().add(1, 'month').toDate()
    });
  },
  
  renderTemplate() {
    this.render('invoices/form');
  },
  
  actions: {
    willTransition(transition) {
      if(transition.intent.name !== 'invoices.edit') {
        if (!confirm('Are you sure you want to leave? Your changes will be lost.')) {
          transition.abort();
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
          this.transitionTo('invoices');
        }), 200);
      });
    },

    cancel(model) {
      model.destroyRecord();
      return this.transitionTo('invoices');
    }
  }
});
