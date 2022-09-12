import { Tab } from '@headlessui/react'
import { CodeBracketSquareIcon, CogIcon, EyeIcon } from '@heroicons/react/20/solid'
import { classNames } from '../utils/common'
import JsonParser from './JsonParser'
import Settings from './Settings'
import DagViewer from './DagViewer'

const tabList = [
  {
    name: 'JSON Parser',
    title: <div className="w-full">
      <CodeBracketSquareIcon className="h-4 w-4 inline" aria-hidden="true"/>
      <span className="ml-2">JSON Parser</span>
    </div>,
    component: <JsonParser></JsonParser>
  },
  {
    name: 'Dag Viewer',
    title: <div className="w-full">
      <EyeIcon className="h-4 w-4 inline" aria-hidden="true"/>
      <span className="ml-2">Dag Viewer</span>
    </div>,
    component: <DagViewer></DagViewer>
  },
  {
    name: 'Settings',
    title: <div className="w-full">
      <CogIcon className="h-4 w-4 inline" aria-hidden="true"/>
      <span className="ml-2">Settings</span>
    </div>,
    component: <Settings></Settings>
  }
]

export default function Tabs () {
  return (<div className="h-screen overflow-hidden flex flex-col">
    <div className="container h-screen mx-auto px-4 py-5 flex-1 flex flex-col">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {tabList.map((t, idx) => (<Tab
            key={idx}
            className={({ selected }) => classNames('w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700', 'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2', selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white')}
          >
            {t.title}
          </Tab>))}
        </Tab.List>
        <Tab.Panels className="mt-2 flex-1 flex flex-col overflow-hidden">
          {tabList.map((t, idx) => (<Tab.Panel
            key={idx}
            className={classNames('rounded-xl bg-white p-1 flex-1 flex flex-col overflow-hidden', 'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2')}
          >
            {t.component}
          </Tab.Panel>))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  </div>)
}