import DS from 'ember-data';
import ModelMixin from '../mixins/model/lokijs-model';

const { Model, attr } = DS;

export default Model.extend(ModelMixin, {
  logo: attr('string'),
  invoiceNumber: attr('string'),
  senderAddress: attr('string'),
  taxRate: attr('number'),
	invoiceTerms: attr('string'),
	personalData: attr('string'),
  currency: attr('string')
});
