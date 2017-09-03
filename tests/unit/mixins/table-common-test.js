import Ember from 'ember';
import TableCommonMixin from 'ember-invoice-manager/mixins/table-common';
import { module, test } from 'qunit';

module('Unit | Mixin | table common');

// Replace this with your real tests.
test('it works', function(assert) {
  let TableCommonObject = Ember.Object.extend(TableCommonMixin);
  let subject = TableCommonObject.create();
  assert.ok(subject);
});
