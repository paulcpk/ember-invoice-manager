import DS from 'ember-data';
import { LokiJSModelMixin } from 'ember-lokijs';
import ENV from '../config/environment';

const { Model, attr } = DS;
const ModelMixin = ENV.useDb ? LokiJSModelMixin : {};

export default Model.extend(ModelMixin, {
  invoiceNumber: attr('string'),
  senderAddress: attr('string'),
  taxRate: attr('number'),
	invoiceTerms: attr('string'),
	personalData: attr('string'),
  currency: attr('string')
});
