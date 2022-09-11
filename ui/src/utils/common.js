export const classNames = function (...classes) {
  return classes.filter(Boolean).join(' ')
}

function isObject (val) {
  return typeof val === 'object' && !Array.isArray(val) && val !== null
}

export const warpVal = function (val) {
  if (isObject(val)) {
    return val
  } else if (val === null) {
    return { 'Null': val }
  } else if (typeof val === 'undefined') {
    return { 'Undefined': val }
  } else if (typeof val === 'string') {
    return { 'String': val }
  } else if (typeof val === 'number') {
    return { 'Number': val }
  } else if (typeof val === 'boolean') {
    return { 'Boolean': val }
  } else if (Array.isArray(val)) {
    return { 'Array': val }
  }
}
