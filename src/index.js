import React from 'react'

/**
 * Template helper function for branching template logic. 
 * Returns a function that takes in a JSX, which in turn returns chainable functions (ElseIf, Else).
 * The chain must always be terminated by calling `EndIf()`.
 * 
 * @param {boolean} condition - Display condition
 * 
 * @return {function} Chainable generator
 *
 * @example
 * export default function () {
 *   const state = 'foo'
 * 
 *   return (
 *     <div>
 *       {
 *         If(state === 'foo')(
 *           <div>Foo</div>
 *         )
 *         .ElseIf(state === 'bar')(
 *           <div>Bar</div>
 *         )
 *         .ElseIf(state === 'baz')(
 *           <div>Baz</div>
 *         )
 *         .Else(
 *           <div>Other</div>
 *         )
 *         .EndIf()
 *       }
 *     </div>
 *   )
 * })
 */

export function If (condition) {
  let result = <React.Fragment></React.Fragment>
  let lastCondition = condition

  const response = {
    ElseIf (elseCondition) {
      return (children) => {
        if (!lastCondition && elseCondition) {
          result = children
        }
        lastCondition = elseCondition
        return response
      }
    },

    Else (children) {
      if (!lastCondition) {
        result = children
      }
      return {
        EndIf: response.EndIf
      }
    },

    EndIf () {
      return result
    }
  }

  return (children) => {
    if (condition) {
      result = children
    }
    return response
  }
}

/**
 * Template helper function for handling iteration.
 * Returns a function with the value, key/index, and helper utilities.
 * 
 * @param {(array|object)} collection - Collection of items to display
 * 
 * @return {function} Iteration handler
 *
 * @example
 * export default function () {
 *   const collection = [1, 2, 3]
 *
 *   return (
 *     <div>
 *       {
 *         For(collection)((value, key, { isFirst, isLast, isEven }) => (
 *           <div key={key}>{key}: {value}</div>
 *         ))
 *       }
 *     </div>
 *   )
 * })
 */

export function For (collection) {
  return (fn) => {
    let children

    if (Array.isArray(collection)) {
      children = collection.map((item, i) => {
        return fn(item, i, {
          isFirst: i === 0,
          isLast: i === collection.length - 1,
          isEven: i % 2 === 0,
          isNth: (k) => i % k === 0
        })
      })
    } else {
      const keys = Object.keys(collection)
      children = keys.map((key, i) => {
        return fn(collection[key], key, {
          isFirst: i === 0,
          isLast: i === keys.length - 1,
          isEven: i % 2 === 0,
          isNth: (k) => i % k === 0
        })
      })
    }

    return <React.Fragment>{children}</React.Fragment>
  }
}
