import { useRecoilState, useRecoilValue } from 'recoil'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { editorOpenState, editorTextState, jsonTextState, panels, selectedPanelState } from '../state/dag/atom'
import { Editor } from './JsonEditor'
import { Fragment } from 'react'
import { jsonObjectSelector } from '../state/dag/selector'

function PanelSelect () {
  const [selected, setSelected] = useRecoilState(selectedPanelState)
  return (<Listbox value={selected} onChange={setSelected}>
    <div className="relative mt-1">
      <Listbox.Button
        className="relative w-36 cursor-default rounded-lg bg-amber-100 text-amber-900 font-medium py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
        <span className="block truncate">{selected.name}</span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
            </span>
      </Listbox.Button>
      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Listbox.Options
          className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {panels.map(p => (
            <Listbox.Option
              key={p.id}
              className={({ active }) =>
                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                  active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                }`
              }
              value={p}
            >
              {({ selected }) => (
                <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {p.name}
                      </span>
                  {selected ? (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                        </span>
                  ) : null}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </div>
  </Listbox>)
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
    return (<Fragment>
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
    </Fragment>)
  } else {
    return (<Fragment>
      <button
        type="button"
        onClick={openEditor}
        className="rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        Edit JSON
      </button>
    </Fragment>)
  }
}

function DagPanel () {
  const [selectedPanel] = useRecoilState(selectedPanelState)
  const jsonObject = useRecoilValue(jsonObjectSelector)

  if (selectedPanel.id === 1) {
    return (<div>
      <span>{JSON.stringify(jsonObject.runtime || null)}</span>
    </div>)
  } else if (selectedPanel.id === 2) {
    return (<div>
      <span>{JSON.stringify(jsonObject.coreReq || null)}</span>
    </div>)
  } else if (selectedPanel.id === 3) {
    return (<div>
      <span>{JSON.stringify(jsonObject.context || null)}</span>
    </div>)
  }
}

export default function DagViewer (props) {
  const [editorText, setEditorText] = useRecoilState(editorTextState)
  const [isEditorOpen] = useRecoilState(editorOpenState)

  return (<div className="flex-1 flex flex-col overflow-hidden">
    <div className="flex p-1 justify-start">
      <PanelSelect></PanelSelect>
      <div className="grow"></div>
      <EditorSwitch></EditorSwitch>
    </div>
    <div className="flex-1 overflow-hidden rounded-xl m-1 text-left text-sm font-mono">
      <div className="h-full overflow-auto grid grid-cols-1">
        {isEditorOpen
          ? <Editor value={editorText} onChange={setEditorText} id="dag_viewer_editor"></Editor>
          : <DagPanel></DagPanel>
        }
      </div>
    </div>
  </div>)
}