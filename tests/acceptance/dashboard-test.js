import { test } from 'qunit';
import moduleForAcceptance from 'ember-invoice-manager/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | invoices');

test('visiting /invoices', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/dashboard');
  });
});
