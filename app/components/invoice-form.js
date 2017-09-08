import Ember from 'ember';
import { statusList } from 'ember-invoice-manager/models/invoice';

const { Component } = Ember;

export default Component.extend({
  isEditRoute: false,
  statusList: statusList
});
