import Ember from 'ember';

export default Ember.Route.extend({
  
  model(params) {
    return this.get('store').findRecord('invoice', params.invoice_id).then((invoiceModel) => {
      const templateId = invoiceModel.get('templateId');
      return this.get('store').findRecord('template', templateId).then((templateModel) => {
        invoiceModel.set('template', templateModel);
        return {
          invoice: invoiceModel,
          template: templateModel
        }
      })
    })
  },

  setupController(controller, hash) {
    controller.set('invoice', hash.invoice);
    controller.set('template', hash.template);
  }
});
