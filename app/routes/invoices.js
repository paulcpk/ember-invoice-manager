import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		return this.get('store').findAll('invoice');
	},

	actions: {
		editInvoice(record) {
			this.transitionTo('invoices.edit', record.id);
		},

		deleteInvoice(record) {
			let confirmation = confirm("Are you sure you want to delete this invoice?");
			
			if (confirmation) {
				record.destroyRecord();
				
				// if action was triggered from a different view, redirect user to /invoices
				if (this.get('routeName') !== 'invoices') {
					this.transitionTo('invoices');
				}
			}
		}
	}
});
