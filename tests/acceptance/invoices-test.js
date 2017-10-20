import { test } from 'qunit';
import moduleForAcceptance from 'ember-invoice-manager/tests/helpers/module-for-acceptance';
import { generateInvoices } from 'ember-invoice-manager/tests/helpers/generate-invoices';

moduleForAcceptance('Acceptance | invoices');

test('visiting /invoices', function(assert) {
  visit('/invoices');

  andThen(function() {
    assert.equal(currentURL(), '/invoices');
  });
});

test("I can view the invoices in the table", function(assert) {
  generateInvoices(server, 25);

  visit('/invoices');

  andThen(function() {
    assert.equal(find('.table .invoice-row').length, 10 );
    assert.equal(find('.table-footer .table-summary').text().trim(), 'Show 1 - 10 of 25' );
  });
});
