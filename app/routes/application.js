import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    error(error) {
      if (error.status === '403') {
        this.replaceWith('dashboard');
      } else {
        // Let the route above this handle the error.
        return true;
      }
    }
  }
});