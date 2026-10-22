import assert from 'node:assert/strict';
import test from 'node:test';
import { HttpError } from './httpError.js';
import { requireEmail, requireId, requireText } from './validation.js';

test('requireText trims valid text', () => {
  assert.equal(requireText('  A story  ', 'Title', 20), 'A story');
});

test('requireText rejects blank and oversized values', () => {
  assert.throws(() => requireText('   ', 'Title', 20), (error: unknown) => {
    assert.ok(error instanceof HttpError);
    assert.equal(error.status, 400);
    return true;
  });
  assert.throws(() => requireText('a'.repeat(21), 'Title', 20), HttpError);
});

test('requireEmail normalizes valid addresses and rejects invalid ones', () => {
  assert.equal(requireEmail('Writer@example.com'), 'writer@example.com');
  assert.throws(() => requireEmail('not-an-email'), HttpError);
});

test('requireId accepts positive safe integers only', () => {
  assert.equal(requireId('42'), 42);
  for (const value of ['0', '-1', '1.5', 'abc', '9007199254740992']) {
    assert.throws(() => requireId(value), HttpError);
  }
  assert.throws(() => requireId(['1', '2']), HttpError);
});
