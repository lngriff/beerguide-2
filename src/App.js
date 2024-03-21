import { Tree } from './components/Tree';
import { Help } from './components/Help';
import { Info } from './components/Info'
import * as data from './data/mega_beers.json';
import { useState } from 'react';
import './App.css';

function App() {
  const [currentBeer, setCurrentBeer] = useState(null)
  
  function updateBeer(beer) {
    if (typeof(beer) == 'string') {
      setCurrentBeer(beer)
    } 
  }

  return (
    <div className="App">
      <header className="App-header">
        <Help />
      </header>
      <section className="Main">
        <Info data={data} selectedBeer={currentBeer}/>
        <Tree data={data} setBeer={updateBeer}/>
      </section>
    </div>
  );
}

export default App;
