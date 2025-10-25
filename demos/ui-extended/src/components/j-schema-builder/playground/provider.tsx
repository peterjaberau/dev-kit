import { ActorsModelProvider } from '../actors-model/provider'

export const AppWithActorsProvider: any = ({children}: any) => {
  return (
    <>
      <ActorsModelProvider>
        {children}
      </ActorsModelProvider>
    </>
  )
}
