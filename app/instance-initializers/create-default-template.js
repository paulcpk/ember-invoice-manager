import defaultTemplate from '../mirage/fixtures/template';

export function initialize(appInstance) {
  let store = appInstance.lookup('service:store');
  // Check if templates are available, if not create one
  store.findAll('template').then((templates) => {
    if (templates.length === 0) {
      store.createRecord('template', defaultTemplate).save();
    }
  })
}


export default {
  name: 'create-default-template',
  after: 'ember-data',
  initialize
};
