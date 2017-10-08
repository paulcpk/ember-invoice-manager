import Ember from 'ember';
import moment from 'moment';

const { RSVP } = Ember;

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
    save(changeset) {
      return RSVP.all(changeset.get('invoiceItems').filterBy('dirtyType', 'created').invoke('save')).then(() => {
        return changeset.save().then(() => this.transitionTo('invoices'));
      });
    },

    rollback() {
      this.transitionTo('invoices');
    }
  }
});
