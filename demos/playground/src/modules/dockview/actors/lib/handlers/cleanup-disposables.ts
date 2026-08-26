export const cleanupDockDisposables = ({ disposables }: any) => {
  return () => disposables.forEach((disposable: any) => disposable.dispose())
}
