import { Tree } from './components/Tree';
import { Help } from './components/Help';
import { Info } from './components/Info'
import * as data from './data/mega_beers.json';
import { useState } from 'react';
import './App.css';

function App() {
  const [currentBeer, setCurrentBeer] = useState(null)
  const [helpOpen, setHelpOpen] = useState(false)

  function updateBeer(beer) {
    if (typeof(beer) == 'string') {
      setCurrentBeer(beer)
    } 
  }

  function toggleVisibility() {
    return !helpOpen
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => setHelpOpen(toggleVisibility)}>Help</button>
      </header>
      <section className="Main">
        <Tree data={data} setBeer={updateBeer}/>
        <Help visible={helpOpen}/>
        <Info data={data} selectedBeer={currentBeer}/>
      </section>
    </div>
  );
}

export default App;
