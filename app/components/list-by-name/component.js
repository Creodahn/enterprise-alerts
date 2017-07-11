import Ember from 'ember';

export default Ember.Component.extend({
  // attributes
  tagName: '',
  sortProperties: ['name:asc', 'location:asc'],
  // computed properties
  sortedSystems: Ember.computed.sort('model', 'sortProperties'),
  // actions
  actions: {
    select(system) {
      this.sendAction('select', system);
    }
  }
});
