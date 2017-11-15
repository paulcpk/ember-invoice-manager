import DS from 'ember-data';
import { LokiJSModelMixin } from 'ember-lokijs';
import ENV from '../config/environment';

const { Model, attr } = DS;
const ModelMixin = ENV.useDb ? LokiJSModelMixin : {};

export default Model.extend(ModelMixin, {
  title: attr('string'),
  markup: attr('string')
});
