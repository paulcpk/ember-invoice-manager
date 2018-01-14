import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.get('store').findAll('user').then(user => user.get('firstObject'));
  },

  actions: {
    willTransition(transition) {
      if (this.get('controller.model.hasDirtyAttributes') && 
          !confirm('Are you sure you want to leave? Your changes will be lost.')) {
        transition.abort();
      } else {
        return true;
      }
    },

    saveUser(record) {
      this.controller.set('isProcessing', true);
      record.save().then(() => {
        Ember.run.later((() => {
          this.controller.set('isProcessing', false);
        }), 200);
      });
    },

    rollbackUser(record) {
      record.rollbackAttributes();
    }
  }
});
