import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('dashboard');
  this.route('invoices', function() {
    this.route('new');
    this.route('edit', { path: '/edit/:invoice_id' });
    this.route('view', { path: '/view/:invoice_id' });
  });

  this.route('not-found', { path: '/*path' });
  this.route('settings');
  this.route('templates');
});

export default Router;
