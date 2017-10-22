import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['header-navigation'],
  actions: {
    printInvoice() {
      const iframe = Ember.$('#printFrame')[0].contentWindow;
      iframe.focus();
      iframe.print();
      return false;
    }
  }
});
