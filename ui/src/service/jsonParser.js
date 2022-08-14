/* global mljRecursiveParse */

/* global mljParseOnce */

function isObject(val) {
    return typeof val === 'object' &&
        !Array.isArray(val) &&
        val !== null
}

function warpVal(val) {
    if (isObject(val)) {
        return val
    } else if (val === null) {
        return {'Null': val}
    } else if (typeof val === 'undefined') {
        return {'Undefined': val}
    } else if (typeof val === 'string') {
        return {'String': val}
    } else if (typeof val === 'number') {
        return {'Number': val}
    } else if (typeof val === 'boolean') {
        return {'Boolean': val}
    } else if (Array.isArray(val)) {
        return {'Array': val}
    }
}

function fallbackParse(setRst, text) {
    let ret
    try {
        ret = JSON.parse(text)
    } catch (e) {
        console.warn(e)
        ret = text
    }
    ret = warpVal(ret)
    setRst(ret)
}

export const parseJson = function (setRst, text, recursive) {
    if (recursive) {
        if (typeof mljRecursiveParse === 'function') {
            mljRecursiveParse(text).then(ret => {
                setRst(warpVal(ret))
            }).catch(e => {
                console.error(e)
            })
        } else {
            console.warn('mljRecursiveParse fallback js method')
            fallbackParse(setRst, text)
        }
    } else {
        if (typeof mljParseOnce === 'function') {
            mljParseOnce(text).then(ret => {
                setRst(warpVal(ret))
            }).catch(e => {
                console.error(e)
            })
        } else {
            console.warn('mljParseOnce fallback js method')
            fallbackParse(setRst, text)
        }
    }
}