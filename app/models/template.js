import DS from 'ember-data';
import ModelMixin from '../mixins/model/lokijs-model';

const { Model, attr } = DS;

export default Model.extend(ModelMixin, {
  title: attr('string'),
  markup: attr('string')
});
