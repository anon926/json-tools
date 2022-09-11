import './App.css'
import Tabs from './components/Tabs'
import { RecoilRoot } from 'recoil'

function App () {
  return (
    <div className="App h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
      <RecoilRoot>
        <Tabs/>
      </RecoilRoot>
    </div>
  )
}

export default App
