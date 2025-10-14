# fromCallback

- sendBack(event) --> Child → Parent: Sends an event back to the parent that spawned/invoked this actor
- receive(handler) 
  - fromCallback receive ---> means the callback actor handle received events from its receive function --> receive((event) => {})
  - fromCallback sendBack -- means the callback actor send back event to the caller from its sendback function  sendBack({ type: "STATUS_RESPONSE", locked: lockStatus });


```typescript

import { fromCallback, createActor } from 'xstate';

const lockActor = fromCallback(({ input, sendBack, receive }) => {
    // ✅ Access input from parent
    let lockStatus = input?.initialStatus ?? "unlocked";

    console.log("Actor started with lockStatus:", lockStatus);

    // 📨 Handle messages from the parent
    receive((event) => {
        if (event.type === "LOCK") {
            lockStatus = "locked";
            console.log("Lock status changed to:", lockStatus);
            sendBack({ type: "LOCKED" }); // Notify parent
        } else if (event.type === "UNLOCK") {
            lockStatus = "unlocked";
            console.log("Lock status changed to:", lockStatus);
            sendBack({ type: "UNLOCKED" }); // Notify parent
        } else if (event.type === "STATUS") {
            sendBack({ type: "STATUS_RESPONSE", locked: lockStatus });
        }
    });

    // Optional cleanup when actor stops
    return () => {
        console.log("Lock actor stopped");
    };
});

// --- Parent actor using lockActor ---
const parent = createActor({
    invoke: {
        id: "lock",
        src: lockActor,
        input: () => ({ initialStatus: "locked" }), // ✅ send input here
    },
    on: {
        LOCKED: () => console.log("🔒 Parent got LOCKED event"),
        UNLOCKED: () => console.log("🔓 Parent got UNLOCKED event"),
        STATUS_RESPONSE: (_, e) => console.log("Parent got status:", e.locked),
    },
});

// Start the parent
parent.start();

// Get the child actor ref
const lockRef = parent.system.get("lock");

// Interact with it
lockRef.send({ type: "STATUS" });
lockRef.send({ type: "UNLOCK" });
lockRef.send({ type: "LOCK" });


```
