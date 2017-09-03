import Ember from 'ember';

const { computed, Component } = Ember;

export default Component.extend({
  columns: computed(function() {
    return [{
      title: 'Status',
      propertyName: 'status',
    }, {
      title: 'Customer',
      propertyName: 'recipientAddress'
    }, {
      title: 'Issued',
      propertyName: 'issuedDate'
    }, {
      title: 'Due',
      propertyName: 'paymentDueDate'
    }, {
      title: 'Total',
      propertyName: 'total'
    },{
      title: 'Edit',
      template: "components/ember-models-table/edit-button"
    },{
      title: 'Delete',
      template: "components/ember-models-table/delete-button"
    }];
  })
});
