import './DagViewer.css'
import { JsonEditor } from 'jsoneditor-react'
import ace from 'brace'
import 'brace/mode/json'
import 'brace/theme/github'
import { useRecoilState } from 'recoil'
import { editorTextState } from '../state/dag/atom'

export default function DagViewer (props) {
  const [editorText, setEditorText] = useRecoilState(editorTextState)

  return (<div className="flex-1 flex flex-col overflow-hidden">
    <div className="flex p-2 justify-start">
      Dag Viewer
    </div>
    <div className="flex-1 overflow-hidden rounded-xl m-2 text-left text-sm font-mono">
      <div className="h-full overflow-auto grid grid-cols-1">
        <JsonEditor
          statusBar={false}
          search={true}
          mode={'code'}
          value={editorText}
          onChange={setEditorText}
          ace={ace}
          theme="ace/theme/github"
        />
      </div>
    </div>
  </div>)
}