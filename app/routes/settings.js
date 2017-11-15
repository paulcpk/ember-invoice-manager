import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      templates: this.get('store').findAll('template'),
      user: this.get('store').findAll('user').then((user) => {
        return user.get('length') ? user.get('firstObject') : this.get('store').createRecord('user', {});
      })
    });
  },

  setupController(controller, hash) {
    controller.set('templates', hash.templates);
    controller.set('user', hash.user);
  },
  
  actions: {
    willTransition(transition) {
      if (this.get('controller.model.hasDirtyAttributes') && 
          !confirm('Are you sure you want to leave? Your changes will be lost.')) {
        transition.abort();
      } else {
        return true;
      }
    }
  }
});
