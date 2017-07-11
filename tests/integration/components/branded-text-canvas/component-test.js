import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('branded-text-canvas', 'Integration | Component | branded text canvas', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{branded-text-canvas}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#branded-text-canvas}}
      template block text
    {{/branded-text-canvas}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
