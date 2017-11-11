import Controller from '@ember/controller';

export default Controller.extend({
  isProcessing: false,

  actions: {
    uploadLogo(file) {
      try {
        file.readAsDataURL().then((url) => {
          this.get('model').set('logo', url);
        });
      } catch (e) {
        console.log(e);
      }
    },

    deleteLogo() {
      this.get('model').set('logo', null);
    }
  }
});
