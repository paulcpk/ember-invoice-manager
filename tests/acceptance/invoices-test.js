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
  const NUMBER_OF_INVOICES = 25;

  for (let i = NUMBER_OF_INVOICES; i--;) {
    const randomNumber = Math.floor(Math.random() * 7) + 1;

    let invoice = server.create('invoice');
    server.createList('invoiceItem', randomNumber, { invoiceId: invoice.id });
  }

  visit('/invoices');

  andThen(function() {
    assert.equal(find('.table tbody td').length, 10 );
    assert.equal(find('.table-footer .table-summary').text(), 'Show 1 - 10 of 25' );
  });
});
