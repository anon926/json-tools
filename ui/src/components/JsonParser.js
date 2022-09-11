import { Fragment, Suspense } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Switch } from '@headlessui/react'
import { editorOpenState, editorTextState, jsonTextState, parseRecursiveState } from '../state/json/atom'
import { jsonObjectSelector } from '../state/json/selector'
import { Editor, Viewer } from './JsonEditor'

function RecursiveSwitch () {
  const [parseRecursive, setParseRecursive] = useRecoilState(parseRecursiveState)
  return (
    <Switch.Group>
      <div className="flex items-center mx-3">
        <Switch.Label className="mr-3">Parse string</Switch.Label>
        <Switch
          checked={parseRecursive}
          onChange={setParseRecursive}
          className={`${parseRecursive ? 'bg-emerald-500' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
        >
          <span
            className={`${parseRecursive ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}/>
        </Switch>
      </div>
    </Switch.Group>
  )
}

function EditorSwitch () {
  const [isEditorOpen, setIsEditorOpen] = useRecoilState(editorOpenState)
  const [editorText, setEditorText] = useRecoilState(editorTextState)
  const [jsonText, setJsonText] = useRecoilState(jsonTextState)

  function openEditor () {
    setEditorText(jsonText)
    setIsEditorOpen(true)
  }

  function closeEditor () {
    setEditorText(jsonText)
    setIsEditorOpen(false)
  }

  function saveEditor () {
    setJsonText(editorText)
    setIsEditorOpen(false)
  }

  if (isEditorOpen) {
    return (
      <Fragment>
        <button
          type="button"
          className="rounded-md bg-rose-100 px-4 py-2 text-sm font-medium text-rose-900 hover:bg-rose-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
          onClick={closeEditor}
        >Cancel
        </button>
        <button
          type="button"
          className="ml-6 rounded-md bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
          onClick={saveEditor}
        >Save
        </button>
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <button
          type="button"
          onClick={openEditor}
          className="rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          Edit JSON
        </button>
      </Fragment>
    )
  }
}

function JsonViewer () {
  const [isEditorOpen] = useRecoilState(editorOpenState)
  const [editorText, setEditorText] = useRecoilState(editorTextState)
  const jsonObject = useRecoilValue(jsonObjectSelector)

  if (isEditorOpen) {
    return (
      <Editor value={editorText} onChange={setEditorText}></Editor>
    )
  } else {
    return (
      <Viewer value={jsonObject}></Viewer>
    )
  }
}

export default function JsonParser () {
  return (<div className="flex-1 flex flex-col overflow-hidden">
    <div className="flex p-2 justify-start">
      <RecursiveSwitch></RecursiveSwitch>
      <div className="grow"></div>
      <EditorSwitch></EditorSwitch>
    </div>
    <div className="flex-1 overflow-hidden rounded-xl m-2 text-left text-sm font-mono">
      <div className="h-full grid grid-cols-1">
        <Suspense fallback={<div>Loading...</div>}>
          <JsonViewer></JsonViewer>
        </Suspense>
      </div>
    </div>
  </div>)
}
