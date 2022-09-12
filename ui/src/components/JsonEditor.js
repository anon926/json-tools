import './JsonEditor.css'
import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { JsonEditor } from 'jsoneditor-react'

import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/theme-solarized_light'
import 'ace-builds/src-noconflict/ext-language_tools'

const editor = function (props) {
  return (<Fragment>
    <AceEditor
      mode="json"
      theme="solarized_light"
      onChange={props.onChange}
      value={props.value}
      placeholder={props.placeholder}
      name={props.id}
      height="100%"
      width="100%"
      fontSize={14}
      focus={true}
      wrapEnabled={true}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true
      }}
    />
  </Fragment>)
}

editor.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
}

editor.defaultProps = {
  id: 'ace_editor_default_id',
  value: '',
  placeholder: ''
}

export const Editor = editor

const viewer = function (props) {
  return (<Fragment>
    <JsonEditor
      htmlElementProps={{ className: 'overflow-hidden' }}
      statusBar={false}
      search={true}
      mode={'view'}
      value={props.value}
    />
  </Fragment>)
}

viewer.propTypes = {
  value: PropTypes.any
}

export const Viewer = viewer
