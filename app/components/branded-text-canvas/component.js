import Ember from 'ember';

export default Ember.Component.extend({
  // attributes
  tagName: '',
  // lifecycle hooks
  didInsertElement() {
    Ember.run.scheduleOnce('afterRender', () => {
      const canvas = document.getElementById(this.get('id')),
            ctx = canvas.getContext('2d');

      // begin branding shape
      ctx.beginPath();
      // draw branding shape
      ctx.moveTo(30, 50);
      ctx.bezierCurveTo(90, 38, 390, 38, 440, 50);
      ctx.bezierCurveTo(390, 43, 90, 43, 30, 50);
      // complete branding shape
      ctx.closePath();
      ctx.lineWidth = 1;
      ctx.fillStyle = '#a6093d';
      ctx.strokeStyle = '#a6093d';
      ctx.stroke();
      ctx.fill();
      // add text
      ctx.font = ' 48px Arial';
      ctx.fillText(this.get('text'), this.get('textX'), this.get('textY'));
    });
  }
});
