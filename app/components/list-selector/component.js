import Ember from 'ember';

export default Ember.Component.extend({
  // attributes
  sortType: 'status',
  tagName: '',
  // computed properties
  isStatusSort: Ember.computed('sortType', function() {
    return this.get('sortType') === 'status';
  }),
  // actions
  actions: {
    setSortType(type) {
      this.set('sortType', type);
    },
    select(system) {
      this.sendAction('select', system);
    },
    updateLocation(location) {
      this.sendAction('updateLocation', location);
    }
  }
});
