import { atom } from 'recoil'

export const editorOpenState = atom({
  key: 'dagEditorOpenState',
  default: false,
})

export const editorTextState = atom({
  key: 'dagEditorTextState',
  default: '',
})

export const jsonTextState = atom({
  key: 'dagJsonTextState',
  default: '',
})

const _panels = [
  { id: 1, name: 'Runtime' },
  { id: 2, name: 'CoreReq' },
  { id: 3, name: 'NodesContext' },
]

export const panels = _panels

export const selectedPanelState = atom({
  key: 'dagSelectedPanelState',
  default: _panels[0],
})
