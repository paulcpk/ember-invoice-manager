import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.get('store').findRecord('invoice', params.invoice_id);
  },

  renderTemplate() {
    this.render('invoices/form');
  },

  actions: {
    willTransition(transition) {
      if (!confirm('Are you sure you want to leave? Your changes will be lost.')) {
        transition.abort();
      } else {
        return true;
      }
    },
    
    save(model) {
      return model.save();
    },

    cancel(model) {
      model.rollback();
      return this.transitionTo('invoices');
    },

    delete(record) {
      this.send('deleteInvoice', record);
      return this.transitionTo('invoices');
    }
  }
});
