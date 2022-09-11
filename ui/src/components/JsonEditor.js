import './JsonEditor.css'
import { JsonEditor } from 'jsoneditor-react'
import ace from 'brace'
import 'brace/mode/json'
import 'brace/theme/github'
import { Fragment } from 'react'

export const Editor = function (props) {
  return (<Fragment>
    <JsonEditor
      theme="ace/theme/github"
      statusBar={false}
      search={true}
      mode={'code'}
      value={props.value}
      onChange={props.onChange}
      ace={ace}
    />
  </Fragment>)
}

export const Viewer = function (props) {
  return (<Fragment>
    <JsonEditor
      statusBar={false}
      search={true}
      mode={'view'}
      value={props.value}
    />
  </Fragment>)
}
