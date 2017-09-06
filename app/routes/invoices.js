import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		return this.get('store').findAll('invoice', {include: 'invoiceItems'});
	},

	actions: {
		editInvoice(record) {
			this.transitionTo('invoices.edit', record);
		},

		deleteInvoice(record) {
			let confirmation = confirm("Are you sure you want to delete this invoice?");
			
			if (confirmation) {
				console.log('delete');
			}
		}
	}
});
