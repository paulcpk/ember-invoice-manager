import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
	createdAt: attr('date'),
	amount: attr('number'),
	description: attr('string'),
	
	// invoice: belongsTo('invoice')
});
