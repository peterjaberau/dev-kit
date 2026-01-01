// RootProvider.tsx
import React, { createContext, useContext } from "react";
import { useActorRef } from "@xstate/react";
import { rootActor } from "./root.actor";
import { ActorRefFrom } from "xstate";

type RootActor = ActorRefFrom<typeof rootActor>;

const RootActorContext = createContext<RootActor | null>(null);

export const RootProvider: React.FC<React.PropsWithChildren> = ({
                                                                  children,
                                                                }) => {
  const rootActor = useActorRef(rootActor);

  return (
    <RootActorContext.Provider value={rootActor}>
      {children}
    </RootActorContext.Provider>
  );
};

export const useRootActor = () => {
  const actor = useContext(RootActorContext);
  if (!actor) {
    throw new Error("useRootActor must be used within RootProvider");
  }
  return actor;
};
