import Ember from 'ember';
import Controller from '@ember/controller';

export default Controller.extend({
  isProcessingSettings: false,
  isProcessingTemplates: false,

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
      this.set('isProcessingSettings', true);
      record.save().then(() => {
        Ember.run.later((() => {
          this.set('isProcessingSettings', false);
        }), 200);
      });
    },

    rollbackUser(record) {
      record.rollbackAttributes();
    },

    createTemplate() {
      this.get('store').createRecord('template', {
        title: 'My new template',
        markup: '// Put some HTML here'
      })
    },

    saveTemplate(record) {
      this.set('isProcessingTemplates', true);
      record.save().then(() => {
        Ember.run.later((() => {
          this.set('isProcessingTemplates', false);
        }), 200);
      });
    },

    rollbackTemplate(record) {
      record.rollbackAttributes();
    },

    deleteTemplate(record) {
      let confirmation = confirm("Are you sure you want to delete this template?");
			
			if (confirmation) {
				record.destroyRecord();
			}
    }
  }
});
