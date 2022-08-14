import {Tab} from '@headlessui/react'
import {classNames} from '../utils/common'

const tabList = [
    {
        name: "JSON Parser",
        component: () => (
            <div>JSON Parser</div>
        )
    },
    {
        name: "Dag Viewer",
        component: () => (
            <div>Dag Viewer</div>
        )
    },
    {
        name: "Help",
        component: () => (
            <div>Help</div>
        )
    }
]

export default function Tabs() {
    return (
        <div className="min-h-full overflow-hidden">
            <div className="container mx-auto px-4 py-5">
                <Tab.Group>
                    <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                        {tabList.map((t, idx) => (
                            <Tab
                                key={idx}
                                className={({selected}) =>
                                    classNames(
                                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                        selected
                                            ? 'bg-white shadow'
                                            : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                    )
                                }
                            >
                                {t.name}
                            </Tab>
                        ))}
                    </Tab.List>
                    <Tab.Panels className="mt-3">
                        {tabList.map((t, idx) => (
                            <Tab.Panel
                                key={idx}
                                className={classNames(
                                    'rounded-xl bg-white p-3 min-h-[200px]',
                                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                                )}
                            >
                                {t.component}
                            </Tab.Panel>
                        ))}
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    )
}