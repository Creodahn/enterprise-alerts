import Ember from 'ember';

export default Ember.Component.extend({
  // attributes
  tagName: '',
  // computed properties
  closable: Ember.computed('isMobile', function() {
    return !this.get('isMobile');
  }),
  isVisible: Ember.computed('model', 'isMobile', function() {
    return (!!this.get('model') && !this.get('isMobile')) || this.get('isMobile');
  }),
  // actions
  actions: {
    deselect() {
      this.sendAction('deselect');
    },
    showHistory() {
      this.sendAction('showHistory');
    }
  }
});
