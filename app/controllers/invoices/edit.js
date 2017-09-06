import Ember from 'ember';
const { Controller } = Ember;

export default Controller.extend({
  actions: {
    submit(changeset) {
      return changeset.save();
    },

    rollback(changeset) {
      return changeset.rollback();
    }
  }
});
