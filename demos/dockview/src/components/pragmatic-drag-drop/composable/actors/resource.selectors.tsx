import { useSelector } from "@xstate/react";
import { ActorRefFrom } from "xstate";
import { createResourceActor } from "./resource.actor";

type ResourceActor = ActorRefFrom<
  ReturnType<typeof createResourceActor>
>;

/**
 * Select resource data
 */
export const useResourceData = <T>(
  actor: ResourceActor
) =>
useSelector(actor, (snapshot) => snapshot.context.data as T | null);

/**
 * Select resource error
 */
export const useResourceError = (
  actor: ResourceActor
) =>
  useSelector(actor, (snapshot) => snapshot.context.error);

/**
 * Select resource state
 */
export const useResourceState = (
  actor: ResourceActor
) =>
  useSelector(actor, (snapshot) => snapshot.value);
