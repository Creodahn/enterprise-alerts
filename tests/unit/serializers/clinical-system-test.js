import { moduleForModel, test } from 'ember-qunit';

moduleForModel('clinical-system', 'Unit | Serializer | clinical system', {
  // Specify the other units that are required for this test.
  needs: ['serializer:clinical-system']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  const record = this.subject(),
        serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
