import Ember from 'ember';
import Controller from '@ember/controller';

export default Controller.extend({
  isProcessing: false,

  actions: {
    createTemplate() {
      this.get('store').createRecord('template', {
        title: 'My new template',
        markup: '// Put some HTML here'
      })
    },

    saveTemplate(record) {
      this.set('isProcessing', true);
      record.save().then(() => {
        Ember.run.later((() => {
          this.set('isProcessing', false);
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
