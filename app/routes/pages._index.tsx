import { Outlet, useLoaderData } from "react-router"
import type { Route } from "./+types/pages"

export async function loader(args: Route.LoaderArgs) {

  const deferredData = loadDeferredData(args)

  const criticalData = await loadCriticalData(args)

  return { ...deferredData, ...criticalData }
}

async function loadCriticalData({ context, request, params }: Route.LoaderArgs) {

  const [{ pages }] = await Promise.all([
    context.storefront.query(PAGES_QUERY, {
      variables: {}
    })
  ])

  if (!pages) {
    throw new Response('No pages found', { status: 404 })
  }

  return {
    pages
  }
}

function loadDeferredData({ context }: Route.LoaderArgs) {
  return {}
}

export default function PagesLayout() {
  const { pages: { edges } } = useLoaderData<typeof loader>()

  return (
    <div>
      <h1>Pages index</h1>
      <ul>
        {edges.map((page, index: number) => (
          <li key={page.node.id}>
            <a href={new URL(page.node.onlineStoreUrl as string).pathname}>
              {page.node.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

const PAGES_QUERY = `#graphql
  query Pages(
    $language: LanguageCode
    $country: CountryCode
  )
  @inContext(language: $language, country: $country) {
    pages(first: 10) {
      edges {
        node {
          id
          onlineStoreUrl
          title
        }       
      }
    }
  }  
` 