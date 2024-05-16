import logo from './logo.svg';
import './App.css';
import SampleTree from './SampleTree';
import Page from './client/home/Page';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
       {/* <SampleTree/> */}
        <Page/>
        </div>
      </header>
    </div>
  );
}

export default App;
