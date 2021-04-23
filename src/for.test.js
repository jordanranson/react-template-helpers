const { For } = require('./index')

test('For with array', () => {
  const arr = [
    { id: 0, foo: 'bar' },
    { id: 1, foo: 'baz' },
    { id: 2, foo: 'foo' }
  ]

  const arrResult = JSON.stringify([
    'bar, 0, true, false, true',
    'baz, 1, false, false, false',
    'foo, 2, false, true, true',
  ])

  const result = JSON.stringify(For(
    arr,
    (value, index, { isFirst, isLast, isEven }) => (
      `${value.foo}, ${index}, ${isFirst}, ${isLast}, ${isEven}`
    ),
    true
  ))
  
  expect(result).toBe(arrResult)
})

test('For with object', () => {
  const obj = {
    0: { foo: 'bar' },
    1: { foo: 'baz' },
    2: { foo: 'foo' }
  }

  const objResult = JSON.stringify([
    'bar, 0, true, false, true',
    'baz, 1, false, false, false',
    'foo, 2, false, true, true',
  ])

  const result = JSON.stringify(For(
    obj,
    (value, key, { isFirst, isLast, isEven }) => (
      `${value.foo}, ${key}, ${isFirst}, ${isLast}, ${isEven}`
    ),
    true
  ))

  expect(result).toBe(objResult)
})

test('For with invalid collection', () => {
  expect(() => {
    For(
      null,
      (value, key, { isFirst, isLast, isEven }) => (
        `${value.foo}, ${key}, ${isFirst}, ${isLast}, ${isEven}`
      ),
      true
    )
  }).toThrow(`Collection passed to 'For' must be of type Array or Object and must be iterable.`)
})
