import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',
  didInsertElement() {
    this._super();
    this.set('supportsSVG', document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Image', '1.1'));

    Ember.run.scheduleOnce('afterRender', () => {
      // manage modal options
      $('.ui.modal').modal({
        allowMultiple: true
      });
    });
  }
});
