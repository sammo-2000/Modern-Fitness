"use client";
import { createContext, useReducer, Dispatch, ReactNode } from "react";
import type { Program } from "../types/program";

interface ProgramsState {
  programs: Program[] | null;
}

type ProgramsAction =
  | { type: "SET_PROGRAM"; payload: Program[] }
  | { type: "CREATE_PROGRAM"; payload: Program };

interface ProgramsContextValue extends ProgramsState {
  dispatch: Dispatch<ProgramsAction>;
}

interface ProgramsContextProviderProps {
  children: ReactNode;
}
export const ProgramContext = createContext<ProgramsContextValue | undefined>(
  undefined,
);

export const programsReducer = (
  state: ProgramsState,
  action: ProgramsAction,
): ProgramsState => {
  switch (action.type) {
    case "SET_PROGRAM":
      return {
        ...state,
        programs: action.payload,
      };
    case "CREATE_PROGRAM":
      return {
        ...state,
        programs: [action.payload, ...(state.programs || [])],
      };
    default:
      return state;
  }
};

export const ProgramsContextProvider: React.FC<
  ProgramsContextProviderProps
> = ({ children }) => {
  const [state, dispatch] = useReducer(programsReducer, {
    programs: null,
  });

  return (
    <ProgramContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProgramContext.Provider>
  );
};
