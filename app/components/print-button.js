import Ember from 'ember';

const { inject } = Ember;

export default Ember.Component.extend({
  router: inject.service(),
  
  didInsertElement() {
    const router = this.get('router');
    const invoiceId = router._router.currentState.routerJsState.params['invoices.edit'].invoice_id;
    const url = location.origin + router.urlFor('invoices.view', { id: invoiceId });
    Ember.$('#printFrame').attr('src', url);
  },
  
  actions: {
    printInvoice() {
      const printFrame = Ember.$('#printFrame');
      printFrame[0].contentWindow.print();
    }
  }
});
