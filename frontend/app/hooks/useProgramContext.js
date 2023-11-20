import { ProgramContext } from "../context/programContext"
import { useContext } from "react"

export const useProgramContext = () => {
  const context = useContext(ProgramContext)

  if(!context) {
    throw Error('no ProgramContext has been provided.')
  }

  return context
}