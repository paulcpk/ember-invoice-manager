import Ember from 'ember';

const { computed, Component } = Ember;

export default Component.extend({
  columns: computed(function() {
    return [{
      title: 'Status',
      propertyName: 'status',
      template: 'components/models-table/cell-label'
    }, {
      title: 'Invoice Nr.',
      propertyName: 'invoiceNumber',
      className: 'invoice-number'
    }, {
      title: 'Customer',
      propertyName: 'recipientAddress',
      template: 'components/models-table/cell-text',
      className: 'recipient-address'
    }, {
      title: 'Issued',
      propertyName: 'issuedDate',
      template: 'components/models-table/cell-date'
    }, {
      title: 'Due',
      propertyName: 'paymentDueDate',
      template: 'components/models-table/cell-date',
      className: 'payment-due-date'
    }, {
      title: 'Total',
      propertyName: 'total',
      template: 'components/models-table/cell-amount',
      className: 'total'
    },{
      title: 'Edit',
      template: 'components/models-table/button-edit',
      className: 'Edit'
    },{
      title: 'Delete',
      template: 'components/models-table/button-delete'
    },{
      title: 'Overdue',
      propertyName: 'isOverdue',
      isHidden: true,
      template: 'components/models-table/cell-boolean'
    }];
  }),
  
  icons: Ember.Object.create({
    "sort-asc": "fa fa-caret-up",
    "sort-desc": "fa fa-caret-down",
    "column-visible": "fa fa-check",
    "column-hidden": "fa fa-unchecked",
    "nav-first": "fa fa-angle-double-left",
    "nav-prev": "fa fa-angle-left",
    "nav-next": "fa fa-angle-right",
    "nav-last": "fa fa-angle-double-right",
    "caret": "caret",
    "expand-row": "fa fa-plus",
    "expand-all-rows": "fa fa-plus",
    "collapse-row": "fa fa-minus",
    "collapse-all-rows": "fa fa-minus",
    "select-all-rows": "fa fa-check-square-o",
    "deselect-all-rows": "fa fa-square-o",
    "select-row": "fa fa-square-o",
    "deselect-row": "fa fa-check-square-o"
  }),

  classes: Ember.Object.create({
    "outerTableWrapper": "",
    "innerTableWrapper": "inner-table-wrapper",
    "table": "table table-bordered table-condensed",
    "globalFilterWrapper": "pull-left",
    "columnsDropdownWrapper": "pull-right columns-dropdown",
    "columnsDropdownButtonWrapper": "btn-group",
    "columnsDropdown": "dropdown-menu pull-right",
    "theadCell": "table-header",
    "theadCellNoSorting": "table-header-no-sorting",
    "theadCellNoFiltering": "table-header-no-filtering",
    "tfooterWrapper": "table-footer row",
    "footerSummary": "table-summary",
    "footerSummaryNumericPagination": "col-md-4 col-sm-4 col-xs-4",
    "footerSummaryDefaultPagination": "col-md-5 col-sm-5 col-xs-5",
    "pageSizeWrapper": "col-md-2 col-sm-2 col-xs-2",
    "pageSizeSelectWrapper": "pull-right",
    "paginationWrapper": "table-nav",
    "paginationWrapperNumeric": "col-md-6 col-sm-6 col-xs-6",
    "paginationWrapperDefault": "col-md-5 col-sm-5 col-xs-5",
    "buttonDefault": "btn btn-default",
    "noDataCell": "",
    "collapseRow": "collapse-row",
    "collapseAllRows": "collapse-all-rows",
    "expandRow": "expand-row",
    "expandAllRows": "expand-all-rows",
    "thead": "",
    "input": "form-control",
    "clearFilterIcon": "fa fa-times form-control-feedback",
    "clearAllFiltersIcon": "fa fa-times",
    "globalFilterDropdownWrapper": ""
  })
});
