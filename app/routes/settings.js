import Ember from 'ember';
import Route from '@ember/routing/route';

export default Route.extend({
  model() {
		return this.get('store').findAll('user').then((model) => {
      console.log(model.get('length'));
      return model.get('length') ? model.get('firstObject') : this.get('store').createRecord('user', {});
    });
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
    
    save(model) {
      this.controller.set('isProcessing', true);
      model.save().then(() => {
        Ember.run.later((() => {
          this.controller.set('isProcessing', false);
        }), 200);
      });
    },

    cancel(model) {
      model.rollbackAttributes();
    }
  }
});
