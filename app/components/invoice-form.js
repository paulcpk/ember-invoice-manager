import Ember from 'ember';
import { statusList } from 'ember-invoice-manager/models/invoice';

const { Component, computed } = Ember;

export default Component.extend({
  statusList: statusList
});
