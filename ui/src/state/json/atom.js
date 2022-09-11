import { atom } from 'recoil'

export const editorOpenState = atom({
  key: 'parserEditorOpenState',
  default: false,
})

export const parseRecursiveState = atom({
  key: 'parseRecursiveState',
  default: true,
})

export const jsonCollapsedState = atom({
  key: 'parserJsonCollapsedState',
  default: true,
})

export const editorTextState = atom({
  key: 'parserEditorTextState',
  default: '',
})

export const jsonTextState = atom({
  key: 'parserJsonTextState',
  default: '',
})
