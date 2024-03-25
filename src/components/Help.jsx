import { useState } from "react";
import Draggable from "react-draggable";
import vocabJSON from '../data/vocab.json';
import faqJSON from '../data/faq.json';

export function Help({visible}) {
    const [displayText, setDisplayText] = useState(<p>Click on a tab for more info.</p>)
    const [activeTab, setActiveTab] = useState(null)

    function setTextAndTab(id) {
        setActiveTab(id)
        switch (id) {
            case 'vocab':
                return (<p>
                    {vocabJSON.vocab.map(word => {
                        return (
                        <span key={word.word}>
                        <b>{word.word}:</b> {word.def} <br /> <br />
                        </span>)
                    })}
                </p>)
            case 'glass':
                return (<p>drink beer from a cup. or don't! i'm not the boss of you.</p>)
            case 'faq':
                return (<p>
                    {faqJSON.map(q => {
                        return (
                            <span>
                                <b>Q: {q.question}</b> <br />
                                A: {q.answer}
                                <br />
                            </span>
                        )
                    })}
                </p>)
            case 'beer101':
            default:
                return (<p>did u kno: beer made from malt, water, hop, yeast</p>)
        }
    }

    return (
        <Draggable>
                {visible ? <div className="helpbox">
                    <div className="helpnav">
                        {helptabs.map((tab) => {
                            return (
                                <button  className={activeTab === tab.id ? 'active' : 'infotab'} onClick={() => {setDisplayText(setTextAndTab(tab.id))}} key={tab.id}>
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

