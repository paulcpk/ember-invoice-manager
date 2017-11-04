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
	logo: attr('string'),
	status: attr('string'),
	invoiceNumber: attr('string'),
	senderAddress: attr('string'),
	recipientAddress: attr('string'),
	issuedDate: attr('isodate'),
	serviceFromDate: attr('isodate'),
	serviceToDate: attr('isodate'),
	paymentDueDate: attr('isodate'),
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
	isValidTaxRate: computed.gt('taxRate', 0),
	statusStyle: computed('status', function() {
		return getStyleClassByStatus(this.get('status'));
	}),
	subTotal: computed('invoiceItems', function() {
		return this.get('invoiceItems').reduce((sum, item) => {
				return sum + parseFloat(item.amount);
		}, 0).toFixed(2);
	}),
	taxAmount: computed('taxRate', 'subTotal', function() {
		const { taxRate, subTotal } = this.getProperties('taxRate', 'subTotal');
		const taxMultiplicator = taxRate / 100;
		return (subTotal * taxMultiplicator).toFixed(2);
	}),
	total: computed('subTotal', 'taxAmount', function() {
		const { subTotal, taxAmount } = this.getProperties('subTotal', 'taxAmount');
		const total = (parseFloat(subTotal) + parseFloat(taxAmount));
		return total ? total.toFixed(2) : parseFloat(subTotal).toFixed(2);
	})
});
