// code refrence https://www.youtube.com/watch?v=NKsVV7wJcDM&list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE&index=11
import { ProgramContext } from "../context/programContext";
import { useContext } from "react";

export const useProgramContext = () => {
  const context = useContext(ProgramContext);

  if(!context) {
    throw Error('no ProgramContext has been provided.');
  }

  return context
}