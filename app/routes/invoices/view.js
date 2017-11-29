import Ember from 'ember';

export default Ember.Route.extend({
  
  model(params) {
    return this.get('store').findRecord('invoice', params.invoice_id);
  },

  // renderTemplate(controller, model) {
  //   const template = model.get('template');
  //   const path = `invoice-templates/${template}`;
  //   this.render(path, {});
  // }
});
