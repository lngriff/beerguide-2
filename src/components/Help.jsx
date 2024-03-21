import { useState } from "react";
import Draggable from "react-draggable";

export function Help() {
    const [visible, setVisible] = useState(null);
    // have help spawn in the corner I guess..?
    // and then on minimize maybe it snaps back...? idk...
    return (
        <Draggable>
            <div>
        <button onClick={() => setVisible(!visible)}>
            help : {!visible ? "closed" : "open"}
        </button>
        {visible ? < HelpBox /> : null}
    </div>
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

const HelpBox = () => {
    const [displayText, setDisplayText] = useState(null)

    return (
        <div className="helpbox">
            <div className="helpnav">
                {helptabs.map((tab) => {
                    return (
                        <button className="helptab" onClick={() => {setDisplayText(tab.id)}} key={tab.id}>
                            {tab.name}
                        </button>
                    )              
                })}
            </div>
            <p className="text">{displayText}</p>
    </div>
    )

}