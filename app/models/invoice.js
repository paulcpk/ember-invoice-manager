import Ember from 'ember';
import DS from 'ember-data';
import moment from 'moment';

const { Model, attr } = DS;
const { computed } = Ember;

export const statusList = ['draft', 'sent', 'paid'];

export function getStyleClassByStatus(status) {
	const styles = {
		'draft': 'default',
		'sent': 'primary',
		'paid': 'success',
		'default': 'default'
	};

	return styles[status] ? styles[status] : styles['default'];
}

export default Model.extend({
	status: attr('string'),
	invoiceNumber: attr('string'),
	senderAddress: attr('string'),
	recipientAddress: attr('string'),
	createdAt: attr('date'),
	editedAt: attr('date'),
	issuedDate: attr('date'),
	serviceFromDate: attr('date'),
	serviceToDate: attr('date'),
	paymentDueDate: attr('date'),
	taxRate: attr('number'),
	invoiceTerms: attr('string'),
	personalData: attr('string'),
	currency: attr('string'),

	invoiceItems: attr(),

	isOverdue: computed('status', 'paymentDueDate', function() {
		const { status, paymentDueDate } = this.getProperties('status', 'paymentDueDate');

		return status === 'sent' && moment().isAfter(moment(paymentDueDate));
	}),
	statusStyle: computed('status', function() {
		return getStyleClassByStatus(this.get('status'));
	}),
	total: computed('invoiceItems', function() {
		return this.get('invoiceItems').reduce((sum, item) => {
				return sum + parseFloat(item.amount);
		}, 0);
	}),
	totalAfterTax: computed('total', function() {
		const taxMultiplicator = this.get('taxRate') / 100 + 1;
		const totalAfterTax = this.get('total') * taxMultiplicator;
		return totalAfterTax.toFixed(2);
	})
});
