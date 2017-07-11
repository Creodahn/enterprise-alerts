import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',
  actions: {
    select(system) {
      this.sendAction('select', system);
    }
  }
});
