// Context api is used to access a particular variable(usually a state var) from any component no matter the depth of the component.
// It is done by wrapping all the components that requires a variable(state) into the context state(check app.js).

// Remember while using the context api we use useContext(NoteContext) because it is the one that provides return value.
// For return value context api finds the closest {context.Provider} while providing some return value. 


import { createContext } from "react";
import { useState } from 'react';

// Create a context
const NoteContext = createContext();


// Create a context provider
const NoteState = (props) => {
    const s1 = {
        name: "DJ",
        age: 20
    };

    const [state, setState] = useState(s1)

    const updateVal = () => {
        setState({ name: "another DJ" })
    }

    return (
        <NoteContext.Provider value={{ state, updateVal }}>
            {props.children}
        </NoteContext.Provider>

    )
}




export { NoteContext, NoteState }