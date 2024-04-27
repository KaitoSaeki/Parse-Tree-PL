import logo from './logo.svg';
import './App.css';
import SampleTree from './SampleTree';
import TreeView from './tree-view';
import TreeViewSamp from './TreeViewSamp';
import Home from './client/home/page'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
       <SampleTree/>
        <Home/>
        </div>
      </header>
    </div>
  );
}

export default App;
