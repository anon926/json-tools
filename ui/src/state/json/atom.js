import { atom } from 'recoil'

export const editorOpenState = atom({
  key: 'editorOpenState',
  default: false,
})

export const parseRecursiveState = atom({
  key: 'parseRecursiveState',
  default: true,
})

export const jsonCollapsedState = atom({
  key: 'jsonCollapsedState',
  default: true,
})

export const editorTextState = atom({
  key: 'editorTextState',
  default: '',
})

export const jsonTextState = atom({
  key: 'jsonTextState',
  default: '',
})
