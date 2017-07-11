import { moduleForModel, test } from 'ember-qunit';

moduleForModel('historic-clinical-system', 'Unit | Serializer | historic clinical systems', {
  // Specify the other units that are required for this test.
  needs: ['serializer:historic-clinical-system']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  const record = this.subject(),
        serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
