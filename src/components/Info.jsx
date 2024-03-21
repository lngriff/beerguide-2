import { useState } from "react";
import Draggable from 'react-draggable';

// other than the updates, this isn't that different from the help box?
// perhaps I will combine these in the future
export function Info({data, selectedBeer}) {
    const [displayText, setDisplayText] = useState(null)
    const [prevBeer, setBeerChanged] = useState(null)

    console.log(`infos current beer ${selectedBeer}`)
    // the fact that this runs each time this re-renders is uh. bad. lol.
    // will fix it once I decide on new data structure
    const beers = data.nodes.map(d => ({...d}))

    function findText(id) {
        console.log(id)
        const text = beers.find(beer => beer.id === selectedBeer)
        if (text) {
            switch(id) {
                case 'beerInfo':
                    return text.DESC
                case 'ex1':
                    return 'ex1'
                case 'ex2':
                    return 'ex2'
                case 'ex3':
                    return 'ex3'
                default:
                    return 'oh no help'
            }
        }
    }

    // I think the thing to do is, every time selectedBeer changes, switch back to the style tab?
    // and update the text there
    if (selectedBeer !== prevBeer) {
        setBeerChanged(selectedBeer)
        console.log('changing beer')
        setDisplayText(findText('beerInfo'))
    }

    return (
        <Draggable>
            <div className="infobox">
                <div className="infonav">
                    {infotabs.map((tab) => {
                        return (
                            <button className="infotab" onClick={() => setDisplayText(findText(tab.id))} key={tab.id}>
                                {tab.name}
                            </button>
                        )              
                    })}
                </div>
                <p className="text">{displayText}</p>
            </div>
        </Draggable>
        
    )
}

// ive been writing python lately so the camelCase is kind of freaking me out
const infotabs = [
    {id: 'beerInfo', name: 'Style'},
    {id: 'ex1', name: 'Ex 1'},
    {id: 'ex2', name: 'Ex 2'},
    {id: 'ex3', name: 'Ex 3'}
]