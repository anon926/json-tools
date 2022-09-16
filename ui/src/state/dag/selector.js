import { selector } from 'recoil'
import { jsonTextState } from './atom'
import { parseJsonSync } from '../../service/jsonParser'

export const jsonObjectSelector = selector({
  key: 'jsonObject',
  get: ({ get }) => {
    let text = get(jsonTextState)
    return parseJsonSync(text)
  },
})