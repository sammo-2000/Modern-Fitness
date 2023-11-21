'use client'
import { createContext, useReducer } from 'react'

export const ProgramContext = createContext()

export const programsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PROGRAM':
      {
        console.log('SET PROGRAM HERE')
        console.log(action.payload);
        return { 
          programs: action.payload 
        }
      }
    case 'CREATE_PROGRAM': {
      console.log('CREATE PROGRAM HERE')
      console.log('NEW PAYLOAD', action.payload);
      return {
        programs: [action.payload, ...state.programs]
      }
    }
    default:
      return state
  }
}

export const ProgramsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(programsReducer, { 
    programs: null
  })
  
  return (
    <ProgramContext.Provider value={{ ...state, dispatch }}>
      { children }
    </ProgramContext.Provider>
  )
}