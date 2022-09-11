/* global mljRecursiveParse */

/* global mljParseOnce */

import { warpVal } from '../utils/common'

function fallbackParse (text) {
  let ret
  try {
    ret = JSON.parse(text)
  } catch (e) {
    console.warn(e)
    ret = text
  }
  return ret
}

export const parseJson = (text, recursive) => {
  return new Promise((resolve, reject) => {
    if (typeof mljRecursiveParse !== 'function' || typeof mljParseOnce !== 'function') {
      console.warn('parseJson fallback js method')
      let ret = fallbackParse(text)
      resolve(warpVal(ret))
    } else if (recursive) {
      mljRecursiveParse(text).then(ret => {
        resolve(warpVal(ret))
      }).catch(e => {
        console.warn(e)
        resolve(warpVal(text))
      })
    } else {
      mljParseOnce(text).then(ret => {
        resolve(warpVal(ret))
      }).catch(e => {
        console.warn(e)
        resolve(warpVal(text))
      })
    }
  })
}
