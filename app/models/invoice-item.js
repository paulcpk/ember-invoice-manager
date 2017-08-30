import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
    invoice: belongsTo('invoice'),
    createdAt: attr('date'),
    editedAt: attr('date'),
    amount: attr('number'),
    description: attr('number')
});
