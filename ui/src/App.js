import './App.css';
import ReactJson from 'react-json-view';

const jsonObj = {
    "foo": 123
}

function App() {
    return (
        <div className="App">
            <ReactJson src={jsonObj}/>
        </div>
    );
}

export default App;
