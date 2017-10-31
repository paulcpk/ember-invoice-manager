import Ember from 'ember';
import DS from 'ember-data';
import moment from 'moment';
import ENV from '../config/environment';
import { LokiJSModelMixin } from 'ember-lokijs';

const { Model, attr } = DS;
const { computed } = Ember;
const ModelMixin = ENV.useDb ? LokiJSModelMixin : {};

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

export default Model.extend(ModelMixin, {
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

	invoiceItems: attr('', {
    defaultValue() { return Ember.A(); }
  }),

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
		}, 0).toFixed(2);
	}),
	taxAmount: computed('taxRate', 'total', function() {
		const { taxRate, total } = this.getProperties('taxRate', 'total');
		const taxMultiplicator = taxRate / 100;
		return (total * taxMultiplicator).toFixed(2);
	}),
	totalAfterTax: computed('total', 'taxAmount', function() {
		return (parseFloat(this.get('total')) + parseFloat(this.get('taxAmount'))).toFixed(2);
	})
});
