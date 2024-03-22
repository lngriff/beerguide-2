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
            // need to include a swatch for the SRM and an icon for the glass or smthn
            switch(id) {
                case 'beerInfo':
                    return (
                        <p>
                            <b>Name:</b> {text.label} <br/>
                            <b>ABV:</b> {text.ABV} <br />
                            <b>IBU:</b> {text.IBU} <br />
                            <b>Description:</b> {text.DESC} <br />
                        </p>)
                case 'ex1':
                    return (
                        <p>
                            <b>Name:</b> {text.EX_1} <br />
                            <b>Brewery:</b> {text.BREWERY_1} <br />
                            <b>ABV:</b> {text.ABV_1} <br />
                            <b>IBU:</b> {text.IBU_1} <br />
                            <b>Region:</b> {text.REGION_1} <br />
                            <b>Description:</b> Do we need description here? Idk what else to do with this.
                        </p>
                    )
                    
                case 'ex2':
                    return (
                        <p>
                            <b>Name:</b> {text.EX_2} <br />
                            <b>Brewery:</b> {text.BREWERY_2} <br />
                            <b>ABV:</b> {text.ABV_2} <br />
                            <b>IBU:</b> {text.IBU_2} <br />
                            <b>Region:</b> {text.REGION_2} <br />
                            <b>Description:</b> Do we need description here? Idk what else to do with this.
                        </p>
                    )
                case 'ex3':
                    return (
                        <p>
                            <b>Name:</b> {text.EX_3} <br />
                            <b>Brewery:</b> {text.BREWERY_3} <br />
                            <b>ABV:</b> {text.ABV_3} <br />
                            <b>IBU:</b> {text.IBU_3} <br />
                            <b>Region:</b> {text.REGION_3} <br />
                            <b>Description:</b> Do we need description here? Idk what else to do with this.
                        </p>
                    )
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
                {displayText}
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