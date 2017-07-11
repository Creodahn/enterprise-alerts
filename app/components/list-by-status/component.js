import Ember from 'ember';

export default Ember.Component.extend({
  // attributes
  tagName: '',
  // computed properties
  criticalSystems: Ember.computed('model.@each.isCritical', function() {
    return this.getSystemsByStatus('isCritical');
  }),
  informationalSystems: Ember.computed('model.@each.isInformational', function() {
    return this.getSystemsByStatus('isInformational');
  }),
  nominalSystems: Ember.computed('model.@each.isUp', function() {
    return this.getSystemsByStatus('isUp');
  }),
  // functions
  getSystemsByStatus(status) {
    if(this.get('model')) {
      return this.get('model').map((sys) => {
        return sys.get(status) ? sys : null;
      }).filter((sys) => {
        return sys !== null;
      });
    } else {
      return [];
    }
  },
  // actions
  actions: {
    select(system) {
      this.sendAction('select', system);
    }
  }
});
