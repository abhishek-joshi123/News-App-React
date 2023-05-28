import React, { useState } from "react";
import Context from "./Context";


const State = (props) => {

    const [Click, setClick] = useState(false)
    
    return (
        <Context.Provider value = {{Click, setClick}}>
            {props.children}
        </Context.Provider>
    )
}

export default State;