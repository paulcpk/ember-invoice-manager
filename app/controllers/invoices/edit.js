import Ember from 'ember';

const { computed } = Ember;
const { alias, readOnly } = computed;

export default Ember.Controller.extend({
  title: computed('model', function() {
    console.log(this.get('model'))
  })
});
