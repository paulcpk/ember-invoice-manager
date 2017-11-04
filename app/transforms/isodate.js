import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(serialized) {
    return new Date(serialized);
  },

  serialize(deserialized) {
    return deserialized;
  }
});
