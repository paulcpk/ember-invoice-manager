import { skip } from 'qunit';
import moduleForAcceptance from 'ember-invoice-manager/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | Settings');

skip("I can set properties in the settings and they will be used as defaults in a new invoice", function(assert) {
  visit('/settings');
  fillIn('textarea[name="senderAddress"]', 'Harry Potter');
  fillIn('input[name="invoiceNumber"]', 'A0000-B0000');
  fillIn('input[name="currency"]', 'USD');
  fillIn('input[name="taxRate"]', '8.5');
  fillIn('textarea[name="invoiceTerms"]', 'Standard terms apply');
  fillIn('textarea[name="personalData"]', '+(0)1-555-555');
  click('.save-button');

  andThen(() => visit('/invoices/new'));

  andThen(() => {
    assert.equal(find('textarea[name="senderAddress"]').text().trim(), 'Harry Potter');
    assert.equal(find('input[name="invoiceNumber"]').text().trim(), 'A0000-B0000');
    assert.equal(find('input[name="currency"]').text().trim(), 'USD');
    assert.equal(find('input[name="taxRate"]').text().trim(), '8,5');
    assert.equal(find('textarea[name="invoiceTerms"]').text().trim(), 'Standard terms apply');
    assert.equal(find('textarea[name="personalData"]').text().trim(), '+(0)1-555-555');
  });
});
