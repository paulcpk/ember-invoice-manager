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

  click('.invoice-row .button-edit');

  andThen(function() {
    assert.equal(currentPath(), 'invoices.edit');
  });
});
