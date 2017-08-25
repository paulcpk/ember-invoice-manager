import DS from 'ember-data';

const { Model, attr, hasMany } = DS;

export default Model.extend({
    invoices: hasMany('invoice'),
    createdAt: attr('date'),
    editedAt: attr('date'),
    amount: attr('number'),
    description: attr('number')
});
