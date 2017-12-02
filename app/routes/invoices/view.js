import Ember from 'ember';

export default Ember.Route.extend({
  
  model(params) {
    return this.get('store').findRecord('invoice', params.invoice_id).then((invoiceModel) => {
      const templateId = invoiceModel.get('templateId');
      return this.get('store').findRecord('template', templateId).then((templateModel) => {
        return invoiceModel.set('template', templateModel);
      })
    })
  },

  // renderTemplate(controller, model) {
  //   const template = model.get('template');
  //   const path = `invoice-templates/${template}`;
  //   this.render(path, {});
  // }
});
