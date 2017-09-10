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
      return changeset.save().then(() => this.transitionTo('invoices'));
    },

    rollback(changeset) {
      return changeset.rollback();
    },

    delete(record) {
      this.send('deleteInvoice', record);
    },

    deleteItem(record) {
      this.send('deleteInvoiceItem', record);
    }
  }
});
