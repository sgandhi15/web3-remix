import { useContext, useReducer } from "react";
import type { ReactNode } from "react";

import { MetamaskContext } from "./MetamaskContext";
import type { Action, State } from "./MetamaskContext";

type CountProviderProps = { children: ReactNode };

function metamaskReducer(state: State, action: Action) {
  switch (action.type) {
    case "LOGIN": {
      return {
        ...state,
        provider: action.payload.provider,
        account: action.payload.account,
        signer: action.payload.signer,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// Context provider
function MetamaskProvider({ children }: CountProviderProps) {
  const [state, dispatch] = useReducer(metamaskReducer, {
    account: "",
    signer: {},
    provider: {},
  });
  const value = { state, dispatch };

  return (
    <>
      <MetamaskContext.Provider value={value}>
        {children}
      </MetamaskContext.Provider>
    </>
  );
}

// Custom Hook for ease
function useMetamask() {
  const context = useContext(MetamaskContext);
  if (context === undefined) {
    throw new Error("useMetamask must be used within a MetamaskProvider");
  }
  return context;
}

export { MetamaskProvider, useMetamask };
