import { test } from 'qunit';
import moduleForAcceptance from 'ember-invoice-manager/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | invoices');

test('visiting /invoices', function(assert) {
  visit('/invoices');

  andThen(function() {
    assert.equal(currentURL(), '/invoices');
  });
});

test("I can view the invoices in the table", function(assert) {
  server.createList('invoice', 25);

  visit('/invoices');

  andThen(function() {
    assert.equal(find('.table .invoice-row').length, 10 );
    assert.equal(find('.table-footer .table-summary').text().trim(), 'Show 1 - 10 of 25' );
  });
});

test("I can click an invoice's edit button to be redirected", function(assert) {
  server.createList('invoice', 25);
  visit('/invoices');

  click('.invoice-row:first-child .edit-button');
  andThen(function() {
    assert.equal(currentPath(), 'invoices.edit');
  });
});

test("I can edit the invoice, save it and the changes will be reflected in the table", function(assert) {
  server.createList('invoice', 1);
  visit('/invoices/edit/1');
  fillIn('textarea[name="recipientAddress"]', 'Donnie Darko');
  click('.save-button');

  andThen(() => { 
    assert.equal(find('.invoice-row:first-child .recipient-address').text().trim(), 'Donnie Darko');
  });
});

test("I can click the 'New Invoice' button and will be redirected", function(assert) {
  visit('/invoices/');
  click('.new-invoice-button');

  andThen(() => { 
    assert.equal(currentPath(), 'invoices.new');
  });
});

test("I can create a new invoice, save it and it will be visible in the table", function(assert) {
  visit('/invoices/new');
  fillIn('textarea[name="recipientAddress"]', 'Friedrich Nietzsche');
  click('.save-button');

  andThen(() => click('.invoices-link'));

  andThen(() => { 
    assert.equal(find('.invoice-row:first-child .recipient-address').text().trim(), 'Friedrich Nietzsche');
  });
});
