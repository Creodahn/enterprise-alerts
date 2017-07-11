import { moduleForModel, test } from 'ember-qunit';

moduleForModel('clinical-system', 'Unit | Model | clinical system', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  const model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
