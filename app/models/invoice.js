import DS from 'ember-data';

const { Model, attr, hasMany } = DS;

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
    items: hasMany('item'),
    tax: attr('number'),
    total: attr('number'),
    totalAfterTax: attr('number'),
    invoiceTerms: attr('string'),
    personalData: attr('string'),
    currency: attr('string'),
    isTemplate: attr('boolean')
});
