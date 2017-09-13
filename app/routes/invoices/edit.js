import Ember from 'ember';

const { RSVP } = Ember;

export default Ember.Route.extend({
  model(params) {
    return this.get('store').findRecord('invoice', params.invoice_id);
  },

  renderTemplate() {
    this.render('invoices/form');
  },

  actions: {
    save(changeset) {
      return RSVP.all(changeset.get('invoiceItems').filterBy('dirtyType', 'created').invoke('save')).then(() => {
        return changeset.save().then(() => this.transitionTo('invoices'));
      });
    },

    rollback(changeset) {
      return changeset.rollback();
    },

    delete(record) {
      this.send('deleteInvoice', record);
    }
  }
});
