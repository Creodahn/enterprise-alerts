import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',
  // lifecycle
  didInsertElement() {
    this._super();

    Ember.run.scheduleOnce('afterRender', () => {
      const id = `#${this.get('id')}`;

      $(id).modal({
        allowMultiple: true,
        transition: this.get('transition') ? this.get('transition') : null,
        onHidden: () => {
          this.sendAction('modalClosed');
        }
      });

      if(this.get('showOnTransition')) {
        $(id).modal('show');
      }
    });
  }
});
