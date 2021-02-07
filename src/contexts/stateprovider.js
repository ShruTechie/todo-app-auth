// set up data layer
// we need this to track basket

import React, { useContext, useReducer, createContext } from 'react'

//this is data layer
export const StateContext = createContext();


//build provider
export const StateProvider = ({ reducer, intialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, intialState)}>
        {children}
    </StateContext.Provider>
)

// this is how we use it inside of a component
export const useStateValue = () => useContext(StateContext)

