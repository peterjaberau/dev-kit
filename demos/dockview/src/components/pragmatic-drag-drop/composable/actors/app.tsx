// App.tsx
import React, { useEffect } from "react";
import { useRootActor } from "./RootProvider";
import { useResourceActor } from "./root.selectors";
import { useResourceData } from "./resource.selectors";

interface User {
  id: number;
  name: string;
}

const App: React.FC = () => {
  const root = useRootActor();

  // spawn on mount
  useEffect(() => {
    root.send({
      type: "spawn.resource",
      key: "users",
    });
  }, [root]);

  const usersActor = useResourceActor(root, "users");

  if (!usersActor) {
    return <div>Spawning users…</div>;
  }

  const users = useResourceData<User[]>(usersActor);

  return (
    <div>
      <h1>Users</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>

      <button
        onClick={() =>
          usersActor.send({
            type: "set",
            data: [
              { id: 1, name: "Alice" },
              { id: 2, name: "Bob" },
            ],
          })
        }
      >
        Set Users
      </button>
    </div>
  );
};

export default App;
