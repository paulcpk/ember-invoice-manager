import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.get('store').findRecord('invoice', params.invoice_id);
  },

  renderTemplate() {
    this.render('invoices/form');
  },

  actions: {
    save(changeset) {
      return changeset.save();
    },

    cancel(changeset) {
      changeset.rollback();
      return this.transitionTo('invoices');
    },

    delete(record) {
      this.send('deleteInvoice', record);
    }
  }
});
