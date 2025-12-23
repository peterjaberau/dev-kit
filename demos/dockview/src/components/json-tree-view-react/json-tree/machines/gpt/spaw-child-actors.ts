
import { createMachine, assign } from 'xstate';
import { createJsonActor } from 'xstate'

/**
 * Recursively spawns child actors based on the type of the provided value.
 * Arrays spawn an actor for each element (keys are numeric strings),
 * objects spawn an actor for each own property (keys are property names),
 * and scalars return undefined as there are no children to spawn.
 *
 * @param {any} value The JSON value to analyse.
 * @param {Function} spawn The spawn helper from XState, provided by the
 *                         interpreter via context functions.
 * @returns {Record<string, import('xstate').ActorRef>|Array<import('xstate').ActorRef>|undefined}
 */
/**
 * Recursively spawns child actors based on the type of the provided value.
 * Arrays spawn an actor for each element (keys are numeric strings),
 * objects spawn an actor for each own property (keys are property names),
 * and scalars return undefined as there are no children to spawn.
 *
 * @param {any} value The JSON value to analyse.
 * @param {Function} spawn The spawn helper from XState, provided by the
 *                         interpreter via context functions.
 * @returns {Record<string, import('xstate').ActorRef>|Array<import('xstate').ActorRef>|undefined}
 */
export function spawnChildActors({ value, spawn }: any) {
  // Handle arrays by mapping each element to a spawned actor.  We use
  // the index as the id so siblings can be addressed deterministically.
  if (Array.isArray(value)) {
    return value.map((item, index) =>
      spawn(createJsonActor(item), { id: String(index) })
    );
  }
  // Handle objects by iterating over entries and spawning an actor for each
  // property.  The id is the property name to allow easy lookup.
  if (typeof value === 'object' && value !== null) {
    const children: any = {};
    for (const [key, val] of Object.entries(value)) {
      children[key] = spawn(createJsonActor(val), { id: key });
    }
    return children;
  }
  // Primitive values (string, number, boolean, null, undefined) do not have
  // children.  Returning undefined indicates that this actor is a leaf.
  return undefined;
}
