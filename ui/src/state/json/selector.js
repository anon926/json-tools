import { selector } from 'recoil'
import { jsonTextState, parseRecursiveState } from './atom'
import { parseJson } from '../../service/jsonParser'

export const jsonObjectSelector = selector({
  key: 'jsonObject',
  get: async ({ get }) => {
    let text = get(jsonTextState)
    let parseRe = get(parseRecursiveState)

    return await parseJson(text, parseRe)
  },
})
