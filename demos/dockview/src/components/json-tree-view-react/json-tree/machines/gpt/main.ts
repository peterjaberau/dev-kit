
import { createActor } from 'xstate';
import { createJsonActor } from './json-actor';

const data = {
  id: 1,
  name: 'Root',
  settings: {
    theme: 'dark',
    notifications: {
      email: true,
      sms: false
    }
  },
  items: [
    { id: 10, label: 'Item A' },
    { id: 11, label: 'Item B' },
    'loose string'
  ]
};

// Create the root actor logic
const rootLogic = createJsonActor(data);

// Instantiate the actor.
const rootActor = createActor(rootLogic);

// Subscribe to snapshots from the root actor.  Each snapshot contains the
// current value and a map/array of children (if any).  The subscription
// callback runs every time the context changes, e.g. after an UPDATE event.
rootActor.subscribe((snapshot) => {
  console.log('Root snapshot:', JSON.stringify(snapshot.value, null, 2));
});

// Start the root actor and the actor system
rootActor.start();

// After a delay, send an UPDATE to modify the JSON structure.  This will
// trigger a re‑spawn of child actors to reflect the new structure.  The
// subscription above will log the updated snapshot.
setTimeout(() => {
  rootActor.send({ type: 'UPDATE', data: { ...data, extra: [1, 2, 3] } });
}, 1000);
