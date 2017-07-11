import Ember from 'ember';

export default Ember.Component.extend({
  // attributes
  tagName: '',
  // lifecycle
  didInsertElement() {
    Ember.run.scheduleOnce('afterRender', () => {
      $('#location-select').dropdown();
    });
  },
  // actions
  actions: {
    setSortType(value) {
      this.sendAction('setSortType', value);
    },
    updateLocation(value) {
      this.sendAction('updateLocation', value);
    }
  }
});
