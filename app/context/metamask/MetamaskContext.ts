import { createContext } from "react";

export type Action = { type: "LOGIN"; payload: any };
export type Dispatch = (action: Action) => void;
export type State = { provider: any; signer: any; account: string };

export const MetamaskContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);
