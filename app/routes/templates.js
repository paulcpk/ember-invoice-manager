import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.get('store').findAll('template')
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
