import Ember from 'ember';
import moment from 'moment';

export default Ember.Route.extend({
  model(params) {
    return Ember.RSVP.hash({
      invoice: this.get('store').findRecord('invoice', params.invoice_id),
      templates: this.get('store').findAll('template')
    });
  },

  setupController(controller, hash) {
    controller.set('invoice', hash.invoice);
    controller.set('templates', hash.templates);
  },

  renderTemplate() {
    this.render('invoices/form');
  },

  actions: {
    willTransition(transition) {
      if (this.get('controller.model.hasDirtyAttributes') && 
          !confirm('Are you sure you want to leave? Your changes will be lost.')) {
        transition.abort();
      } else {
        return true;
      }
    },
    
    save(record) {
      this.controller.set('isProcessing', true);
      record.set('editedDate', moment().toDate());
      record.save().then(() => {
        Ember.run.later((() => {
          this.controller.set('isProcessing', false);
          this.transitionTo('invoices');
        }), 200);
      });
    },

    cancel(record) {
      record.rollbackAttributes();
      return this.transitionTo('invoices');
    },

    delete(record) {
      this.send('deleteInvoice', record);
      return this.transitionTo('invoices');
    }
  }
});
