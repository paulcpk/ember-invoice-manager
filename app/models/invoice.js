import Ember from 'ember';
import DS from 'ember-data';

const { Model, attr, hasMany } = DS;
const { computed } = Ember;



export default Model.extend({
    status: attr('string'),
    invoiceTitle: attr('string'),
    invoiceNumber: attr('string'),
    senderLogo: attr('string'),
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
    isTemplate: attr('boolean'),
    
    invoiceItems: hasMany('invoice-item'),
    total: computed('invoiceItems', function() {
        return this.get('invoiceItems').reduce((sum, item) => {
            return sum + item.get('amount');
        }, 0).toFixed(2);
    }),
    totalAfterTax: computed('total', function() {
        const taxMultiplicator = this.get('taxRate') / 100 + 1;
        const totalAfterTax = this.get('total') * taxMultiplicator;
        return totalAfterTax.toFixed(2);
    })
});
