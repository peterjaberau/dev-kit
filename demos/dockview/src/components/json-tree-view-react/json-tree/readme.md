# Components Structrue

```text

# Renderers
    - Main({children}) (import App)
        - App({children}) ( import AppProvider )
            - AppProvider({children}) ---> App actor instance created

# Machines
    - appMachine
        - rootMachine
            - otherMachines


# Providers
    - AppProvider ( actor )
        - UiProvider ( ui & theme )
            - RootProvider (actor )
```
