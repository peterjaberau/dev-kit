'use client'
import ActorsApp from "#actors"

export const ProviderActorApp = (props: { children: React.ReactNode }) => {
  return (
    <ActorsApp>{props.children}</ActorsApp>
  )
}