import { useSelector } from "@xstate/react";
import { ActorRefFrom } from "xstate";
import { rootActor } from "./root.actor";

type RootActor = ActorRefFrom<typeof rootActor>;

/**
 * Select entire resources map
 */
export const useResources = (root: RootActor) =>
  useSelector(root, (snapshot) => snapshot.context.resources);

/**
 * Select a single resource actor by key
 */
export const useResourceActor = (
  root: RootActor,
  key: string
) =>
  useSelector(
    root,
    (snapshot) => snapshot.context.resources[key]
  );

/**
 * Select whether a resource exists
 */
export const useHasResource = (
  root: RootActor,
  key: string
) =>
  useSelector(
    root,
    (snapshot) => Boolean(snapshot.context.resources[key])
  );
