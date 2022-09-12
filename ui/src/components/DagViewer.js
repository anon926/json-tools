import { useRecoilState } from 'recoil'
import { editorTextState } from '../state/dag/atom'
import { Editor } from './JsonEditor'

export default function DagViewer (props) {
  const [editorText, setEditorText] = useRecoilState(editorTextState)

  return (<div className="flex-1 flex flex-col overflow-hidden">
    <div className="flex p-1 justify-start">
      Dag Viewer
    </div>
    <div className="flex-1 overflow-hidden rounded-xl m-1 text-left text-sm font-mono">
      <div className="h-full overflow-auto grid grid-cols-1">
        <Editor value={editorText} onChange={setEditorText} id="dag_viewer_editor"></Editor>
      </div>
    </div>
  </div>)
}