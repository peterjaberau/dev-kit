# Behavior-Driven XState Architecture (Plain JavaScript)

This document explains a **behavior-based architecture** for XState machines using **plain JavaScript**, focusing on **why each piece exists** and **how they work together**.

The goal is to keep machines simple and move interaction logic into reusable, composable behaviors.

---

## 1. Core Idea

We separate responsibilities into **four layers**:

1. **Machine**
    - Owns state and context
    - Routes events
    - Does not contain business or interaction logic

2. **Behavior**
    - Listens to an event
    - Uses a guard to decide whether to run
    - Produces actions (context updates, raised events)

3. **Behavior Runner**
    - Runtime engine
    - Executes behaviors in response to events
    - Central place for priorities, logging, read-only checks, etc.

4. **Actions**
    - Declarative descriptions of what should happen
    - Small, declarative descriptions of what should happen
      (assign, raise, etc).



## 2. Behavior Definition Helper



```js
// behavior.js

/*
A behavior is just a description.
It does NOT run by itself.

defineBehavior exists only for structure and consistency.
*/
export function defineBehavior(config) {
  return config
}

```

Why this exists:
   -  Gives a standard shape
   -  Makes behaviors discoverable
   -  Allows future tooling (sorting, priority, debugging



```js
// behavior.js

/*
A behavior is a description, not executable logic.

defineBehavior exists to:
- enforce structure
- improve readability
- enable tooling (priority, sorting, debugging)
*/
export function defineBehavior(config) {
  return config
}