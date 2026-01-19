export async function getStarCount(): Promise<number | undefined> {
  const res = await fetch("https://api.github.com/repos/triggerdotdev/jsonhero-web", {
    headers: {
      accept: "application/json",
      "user-agent": "jsonhero",
    },
    next: { revalidate: 300 },
  })

  if (!res.ok) return

  const data: any = await res.json()
  return data.stargazers_count
}
