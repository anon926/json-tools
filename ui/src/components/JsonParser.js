import { Dialog, Switch, Transition } from '@headlessui/react'
import ReactJson from 'react-json-view'
import { Fragment, Suspense } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { editorOpenState, editorTextState, jsonCollapsedState, jsonTextState, parseRecursiveState } from '../state/atom'
import { jsonObjectSelector } from '../state/selector'

function JsonViewer () {
  const style = {
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  }
  const [jsonCollapsed] = useRecoilState(jsonCollapsedState)
  const jsonObject = useRecoilValue(jsonObjectSelector)
  return (
    <ReactJson src={jsonObject} style={style} collapsed={jsonCollapsed ? 1 : false} indentWidth={2}
               collapseStringsAfterLength={256}
               quotesOnKeys={false} displayDataTypes={false}/>
  )
}

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

function CollapsedSwitch () {
  const [jsonCollapsed, setJsonCollapsed] = useRecoilState(jsonCollapsedState)
  return (
    <Switch.Group>
      <div className="flex items-center mx-3">
        <Switch.Label className="mr-3">Collapsed</Switch.Label>
        <Switch
          checked={jsonCollapsed}
          onChange={setJsonCollapsed}
          className={`${jsonCollapsed ? 'bg-emerald-500' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
        >
          <span
            className={`${jsonCollapsed ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}/>
        </Switch>
      </div>
    </Switch.Group>
  )
}

export default function JsonParser (props) {
  const [isEditorOpen, setIsEditorOpen] = useRecoilState(editorOpenState)
  const [editorText, setEditorText] = useRecoilState(editorTextState)
  const [jsonText, setJsonText] = useRecoilState(jsonTextState)

  function closeEditor () {
    setEditorText(jsonText)
    setIsEditorOpen(false)
  }

  function saveEditor () {
    setJsonText(editorText)
    setIsEditorOpen(false)
  }

  function openEditor () {
    setEditorText(jsonText)
    setIsEditorOpen(true)
  }

  return (<div className="flex-1 flex flex-col overflow-hidden">
    <div className="flex p-2 justify-start">
      <button
        type="button"
        onClick={openEditor}
        className="rounded-md bg-sky-500 bg-opacity-80 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        Edit JSON
      </button>
      <RecursiveSwitch></RecursiveSwitch>
      <CollapsedSwitch></CollapsedSwitch>
    </div>
    <div className="flex-1 overflow-hidden rounded-xl m-2 p-0 bg-blue-100 text-left text-sm font-mono">
      <div className="h-full overflow-auto p-4">
        <Suspense fallback={<div>Loading...</div>}>
          <JsonViewer></JsonViewer>
        </Suspense>
      </div>
    </div>
    <Transition appear show={isEditorOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {
      }}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25"/>
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex flex-col min-h-full items-center justify-center p-6 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className="w-full flex-1 flex flex-col transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Please enter a JSON string
                </Dialog.Title>
                <div className="mt-2 flex-1 flex flex-col">
                                        <textarea
                                          className="flex-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                                          value={editorText}
                                          onChange={e => setEditorText(e.target.value)}
                                        ></textarea>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-rose-100 px-4 py-2 text-sm font-medium text-rose-900 hover:bg-rose-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
                    onClick={closeEditor}
                  >Cancel
                  </button>
                  <button
                    type="button"
                    className="ml-6 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={saveEditor}
                  >Save
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  </div>)
}
