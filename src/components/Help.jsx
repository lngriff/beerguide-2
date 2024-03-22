import { useState } from "react";
import Draggable from "react-draggable";
import vocab from '../data/vocab.json';

export function Help({visible}) {
    const [displayText, setDisplayText] = useState(null)


    function findText(id) {
        switch (id) {
            case 'vocab':
                return (<p>
                    {vocab.vocab.map(word => {
                        return (
                        <span key={word.word}>
                        <b>{word.word}:</b> {word.def} <br /> <br />
                        </span>)
                    })}
                </p>)
            case 'glass':
                return (<p>drink beer from a cup</p>)
            case 'faq':
                return (<p>q: why did u make this in tyol 2024 a: idk i still like beer even if it isnt cool anymore</p>)
            case 'beer101':
            default:
                return (<p>did u kno: beer made from grain, water, hop, yeast</p>)
        }
    }

    return (
        <Draggable>
                {visible ? <div className="helpbox">
                    <div className="helpnav">
                        {helptabs.map((tab) => {
                            return (
                                <button className="helptab" onClick={() => {setDisplayText(findText(tab.id))}} key={tab.id}>
                                    {tab.name}
                                </button>
                            )                    
                        })}
                    </div>
                    {displayText}
                </div> : <div></div>}
        </Draggable>
    
    )
}

// how am i gonna format text that will be easy to edit later..
const helptabs = [
    {id: 'beer101', name: 'Beer 101'},
    {id: 'vocab', name: 'Vocabulary'},
    {id: 'glass', name: 'Glassware'},
    {id: 'faq', name: 'FAQ'}
]

