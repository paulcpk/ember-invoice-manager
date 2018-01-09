export default function() {

  // this.urlPrefix = '';
  this.namespace = '/api';
  this.logging = true;

  this.get('/invoices');
  this.get('/invoices/:id');
  this.post('/invoices');
  this.patch('/invoices/:id');
  this.del('/invoices/:id');
  
  this.get('/users');
  this.post('/users');
  this.patch('/users/:id');

  this.get('/templates');
  this.post('/templates');
  this.get('/templates/:id');
  this.post('/templates/:id');
  this.patch('/templates/:id');
  this.del('/templates/:id');
}
