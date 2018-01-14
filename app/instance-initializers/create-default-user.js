import defaultUser from '../mirage/fixtures/user';

export function initialize(appInstance) {
  let store = appInstance.lookup('service:store');
  // Check if templates are available, if not create one
  store.findAll('user').then((users) => {
    if (users.length === 0) {
      store.createRecord('user', defaultUser).save();
    }
  })
}


export default {
  name: 'create-default-user',
  after: 'ember-data',
  initialize
};
