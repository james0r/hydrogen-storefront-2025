import {useLoaderData} from 'react-router'
import type {Route} from './+types/pages.contact'
import {redirectIfHandleIsLocalized} from '~/lib/redirect'

export const meta: Route.MetaFunction = ({data}) => {
  return [{title: `Hydrogen | ${data?.page.title ?? 'Contact Us'}`}]
}

export async function loader(args: Route.LoaderArgs) {
  const deferredData = loadDeferredData(args)

  const criticalData = await loadCriticalData(args)

  return {...deferredData, ...criticalData}
}

async function loadCriticalData({context, request, params}: Route.LoaderArgs) {

  const [{page}] = await Promise.all([
    context.storefront.query(PAGE_QUERY, {
      variables: {
        handle: 'contact',
      },
    }),
  ])

  if (!page) {
    throw new Response('Not Found', {status: 404})
  }

  redirectIfHandleIsLocalized(request, {handle: 'contact', data: page})

  return {
    page,
  }
}

function loadDeferredData({context}: Route.LoaderArgs) {
  return {}
}

export default function Page() {
  const {page} = useLoaderData<typeof loader>()

  return (
    <div className="page">
      <header>
        <h1>{page.title}</h1>
      </header>
      <main dangerouslySetInnerHTML={{__html: page.body}}></main>
      <form action="">
        <label className="mb-4">
          Your Email:
          <input type="email" name="email" required className='block'/>
        </label>
        <br />
        <label>
          Your Message:
          <textarea name="message" className="block outline-1" required></textarea>
        </label>
        <br />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

const PAGE_QUERY = `#graphql
  query Page(
    $language: LanguageCode
    $country: CountryCode
    $handle: String!
  )
  @inContext(language: $language, country: $country) {
    page(handle: $handle) {
      handle
      id
      title
      body
      seo {
        description
        title
      }
    } 
  }
`
