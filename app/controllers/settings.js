import Ember from 'ember';
import Controller from '@ember/controller';

export default Controller.extend({
  isProcessing: false,

  actions: {
    uploadLogo(file) {
      try {
        file.readAsDataURL().then((url) => {
          this.get('user').set('logo', url);
        });
      } catch (e) {
        console.log(e);
      }
    },

    deleteLogo() {
      this.get('user').set('logo', null);
    },

    saveUser(record) {
      this.set('isProcessing', true);
      record.save().then(() => {
        Ember.run.later((() => {
          this.set('isProcessing', false);
        }), 200);
      });
    },

    rollbackUser(record) {
      record.rollbackAttributes();
    }
  }
});
