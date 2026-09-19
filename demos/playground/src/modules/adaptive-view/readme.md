# Desktop sandbox

The page owns URL parameters and passes the requested profile ID to `AdaptiveViewDesktopSandbox`.
`DesktopProvider` owns the desktop machine, which spawns the local store, Dockview, and theme actors during initiation.

The local store persists the full `{ id, title, data }` profile under `sandbox-adaptive-view` and is available
through `useLocalStore`. Initialization restores a matching saved profile or resolves the requested preset.

Dockview selectors read native API state and subscribe to its events. Native commands are sent to the Dockview
actor through `sendToDockview`. This adapter owns the API, options, subscriptions, and layout serialization.
The desktop actor manages profiles and persistence, and receives layout results and activity from the adapter. The desktop context retains desktop preferences, profile data, logs, and the
panel counter.

View panels resolve their content from their own `viewId` or `componentId` parameters and the supplied view profile.
