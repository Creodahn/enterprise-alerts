import Ember from 'ember';

export default Ember.Component.extend({
  // attributes
  isRead: false,
  tagName: '',
  // actions
  actions: {
    setConnectionAlertRead() {
      this.set('isRead', true);
    },
    setConnectionAlertUnread() {
      this.set('isRead', false);
    },
  }
});
