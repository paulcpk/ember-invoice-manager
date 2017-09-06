export default function() {

  // this.urlPrefix = '';
  this.namespace = '/api';
  this.logging = true;

  this.get('/invoices');
  this.get('/invoices/:id');
  this.del('/invoices/:id');

  this.get('/invoice-items');
  this.get('/invoice-items/:id');

}
