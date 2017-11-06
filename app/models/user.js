import DS from 'ember-data';
const { Model, attr } = DS;

export default Model.extend({
  // logo: attr('string'),
  invoiceNumber: attr('string'),
  senderAddress: attr('string'),
  taxRate: attr('number'),
	invoiceTerms: attr('string'),
	personalData: attr('string'),
  currency: attr('string')
});
