// services/uri-preview.server.ts
import "server-only"

import safeFetch from "../utilities/safeFetch"
import { getFetch } from "./apihero" // runtime-agnostic fetch

const imageContentTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"]

async function getOpenGraphNinja(link: string): Promise<any> {
  const fetcher = getFetch()
  const response = await fetcher(`https://opengraph.ninja/api/v1?url=${link}`)

  if (response.ok) {
    const body: any = await response.json()
    return {
      url: body.requestUrl,
      contentType: "html",
      mimeType: "text/html",
      title: body.title,
      description: body.description,
      icon: { url: body.details.favicon ?? "" },
      image: {
        url: body.image?.url ?? "",
        alt: body.image?.alt,
      },
    }
  }

  const body: any = await response.json()
  console.log(`OpenGraph Ninja failed: ${body.error}`)
  return { error: "No preview available for this URL" }
}

export async function getUriPreview(uri: string): Promise<any> {
  const url = rewriteUrl(uri)
  const head = await headUri(url.href)

  // image preview
  if (head && imageContentTypes.some((t) => t.includes(head.contentType))) {
    return createPreviewImage(url.href, head)
  }

  // json preview
  if (head?.contentType.includes("application/json")) {
    const response = await safeFetch(url.href, {
      headers: { accept: "application/json" },
    })

    if (!response.ok) return { error: "No preview available for this URL" }
    return createPreviewJson(url.href, await response.json())
  }

  // fallback
  return getOpenGraphNinja(url.href)
}

type HeadInfo = {
  contentType: string
  contentLength: number
  lastModified: string
}

async function headUri(uri: string, redirectCount = 0): Promise<HeadInfo | undefined> {
  const response = await fetch(uri, {
    method: "HEAD",
    headers: {
      accept: "*/*",
      "user-agent": "jsonhero",
    },
  })

  if (!response.ok) {
    // handle 405 → manual redirect
    if (response.status === 405 && redirectCount < 5) {
      const noFollow = await fetch(uri, {
        method: "GET",
        redirect: "manual",
        headers: {
          accept: "*/*",
          "user-agent": "jsonhero",
        },
      })

      if ([301, 302].includes(noFollow.status)) {
        const location = noFollow.headers.get("location")
        if (location) return headUri(location, redirectCount + 1)
      }
    }
    return
  }

  return {
    contentType: response.headers.get("content-type") ?? "",
    contentLength: Number(response.headers.get("content-length") ?? "0"),
    lastModified: response.headers.get("last-modified") ?? "",
  }
}

function createPreviewJson(uri: string, json: unknown): any {
  return { url: uri, contentType: "json", json }
}

function createPreviewImage(uri: string, head: HeadInfo): any {
  return {
    url: uri,
    contentType: "image",
    mimeType: head.contentType,
    size: head.contentLength,
  }
}

// protocol rewrites (ipfs, git)
function rewriteUrl(url: string): URL {
  const u = new URL(url)

  if (u.protocol === "ipfs:") {
    const match = url.match(/^ipfs:\/\/([A-Za-z0-9]+)(\/.*)?/i)
    const hash = match?.[1] ?? u.hostname
    return new URL(`https://ipfs.io/ipfs/${hash}${u.pathname}${u.search}`)
  }

  if (u.protocol === "git:") {
    return new URL(`https://${u.hostname}${u.pathname.replace(".git", "")}`)
  }

  return u
}
