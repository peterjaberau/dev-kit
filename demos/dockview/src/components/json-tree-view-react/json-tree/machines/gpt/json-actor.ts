import { createMachine, assign } from 'xstate';
import { spawnChildActors } from './spaw-child-actors'



export function createJsonActor(value: any) {
  return createMachine({
    id: 'jsonActor',
    // The initial context is computed from a function that receives helpers
    // from the interpreter (including the spawn helper).  See XState docs for
    // details: spawn lets us create a dynamic number of child actors
    //【681216515132730†L36-L74】.  The returned object becomes this actor's
    // context and is emitted in snapshots.
    context: ({ spawn }) => ({
      // store the current value for introspection or debugging
      value,
      // spawn children based on the value; may be undefined for scalars
      children: spawnChildActors({ value, spawn })
    }),
    // This machine has a single state and no transitions, so we name it "idle".
    // It listens for an `UPDATE` event to update its context and refresh
    // children.  The `assign` action uses the spawn helper again to rebuild
    // the child actors when the value changes.  A consumer can dispatch an
    // UPDATE event with a `data` field to modify the structure.
    initial: 'idle',
    states: {
      idle: {}
    },
    on: {
      UPDATE: {
        actions: assign({
          value: (_context: any, event: any) => event.data,
          children: (_context: any, event: any, { spawn }: any) =>
            spawnChildActors({ value: event.data, spawn })
        })
      }
    }
  });
}
