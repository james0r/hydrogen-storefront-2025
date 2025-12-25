import { Await, useLoaderData } from 'react-router'
import type { Route } from './+types/pages.contact'
import { redirectIfHandleIsLocalized } from '~/lib/redirect'
import { Image } from '@shopify/hydrogen'
import contactUsIllustration from '../assets/contact-us-illustration-crop.webp'
import calling from '../assets/calling.svg'
import comments from '../assets/comments.svg'
import Arrow from '~/components/contact/Arrow'
import map from '../assets/map.jpg'
import Card from '~/components/contact/Card'
import { clsx } from 'clsx'
import { slideUp, slideDown } from "es6-slide-up-down"
import { Suspense, useEffect, useRef, useState } from 'react'

export const meta: Route.MetaFunction = ({ data }) => {
  return [{ title: `Hydrogen | ${data?.page.title ?? 'Contact Us'}` }]
}

export async function loader(args: Route.LoaderArgs) {
  const deferredData = loadDeferredData(args)

  const nonCriticalData = new Promise((res) =>
    setTimeout(() => res("non-critical"), 5000),
  )

  const criticalData = await loadCriticalData(args)

  return { ...deferredData, ...criticalData, nonCriticalData }
}

interface CountryDataResponse {
  country: {
    capital: string
    emoji: string
  }
}

async function loadCriticalData({ context, request, params }: Route.LoaderArgs) {

  const [{ page }] = await Promise.all([
    context.storefront.query(PAGE_QUERY, {
      variables: {
        handle: 'contact', 
      },
    }),  
  ]) 

  const countryDataResult = await fetch('https://countries.trevorblades.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify({
      query: `#graphql
        query {
          country(code: "US") {
            capital
            emoji
          }
        }
      `
    })
  }).then((res) => res.json() as Promise<CountryDataResponse>)

  if (!page) {
    throw new Response('Not Found', { status: 404 })
  }

  redirectIfHandleIsLocalized(request, { handle: 'contact', data: page })

  return {
    page,
    message: context.message,
    countryData: context.countryData,
    fetchCountryData: countryDataResult
  }
}

function loadDeferredData({ context }: Route.LoaderArgs) {

  // const deferredCountryData = fetch('https://countries.trevorblades.com/graphql', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     query: `#graphql
  //       query {
  //         country(code: "FR") {
  //           capital
  //           emoji
  //         }
  //       }
  //     `
  //   })
  // }).then(res => res.json()).then(data => {
  //   return new Promise(resolve => {
  //     setTimeout(() => resolve(data), 2000)
  //   })
  // })

  // const nonCriticalData = new Promise((res) =>
  //   setTimeout(() => res("non-critical"), 5000),
  // )

  return {
    // nonCriticalData
  }
}

export default function Page() {
  const {
    page,
    message,
    countryData,
    fetchCountryData,
    nonCriticalData
  } = useLoaderData<typeof loader>()

  console.log(fetchCountryData)

  const contentRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!contentRef.current) return

    if (open) {
      slideDown(contentRef.current, 300)
    } else {
      slideUp(contentRef.current, 300)
    }
  }, [open])

  return (
    <>
      <section className="h-62.5 md:h-87.5 bg-primary-500 p-0!">
        <div className="h-full px-4">
          <div className="flex items-center justify-between h-full container mx-auto gap-8">
            <div className="start min-w-full md:min-w-0 flex-1 md:flex-1/2 w-full text-white">
              <h1 className="text-5xl mb-8">
                {message}
                <Suspense fallback={<span className="text-accent-500">...</span>}>
                  <Await resolve={nonCriticalData}  >
                    {
                      (value) => (
                        <span className="text-accent-500">
                          {value as React.ReactNode}
                        </span> 
                      )
                    }
                  </Await>
                </Suspense>
                <span className="text-accent-500">.</span>
              </h1>
              <p className="text-lg">
                Want to get in touch? We&apos;d love to hear from you. Here&apos;s how you can reach us.
              </p>
            </div>
            <div className="end flex-1/3">
              <Image
                src={contactUsIllustration}
                alt="Contact Us Illustration"
                width={380}
                className="ml-auto hidden md:block"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="-mt-12 z-10 relative md:px-4 pb-12">
        <div className="flex flex-col md:flex-row gap-8 container">
          <div className="start flex-1/2">
            <Card>
              <Image
                src={calling}
                alt="Calling Illustration"
                width={50}
                height={50}
                className="mb-6"
              />
              <h2 className="font-bold mb-6 mt-2">Talk to Sales</h2>
              <p>
                Interested in HubSpot&apos;s software? Just pick up the phone to chat with a member of our sales team.
              </p>
              <div className="font-semibold mt-8">
                +1 (888) 482-7768
              </div>
              <div
                className={clsx([
                  'mt-6',
                  'font-bold',
                  'relative',
                  'after:content-[""]',
                  'after:absolute',
                  'after:w-full',
                  'after:h-0.5',
                  'after:left-0',
                  'after:bg-accent-500',
                  'after:-bottom-1'
                ])}>
                View all global numbers
              </div>
            </Card>
          </div>
          <div className="end flex-1/2">
            <Card>
              <Image
                src={comments}
                alt="Calling Illustration"
                width={50}
                height={50}
                className="mb-6"
              />
              <h2 className="font-bold mt-2 mb-6">Contact Customer Support</h2>
              <p>Sometimes you need a little help from your friends. Or a HubSpot support rep. Don’t worry… we’re here for you.</p>
              <button
                className={clsx([
                  'bg-accent-500',
                  'text-white',
                  'px-6',
                  'py-3',
                  'rounded-lg',
                  'font-semibold',
                  'mt-12',
                  'cursor-pointer'
                ])}
              >
                Contact Support
              </button>
            </Card>
          </div>
        </div>
      </section>
      <section className="px-4 pb-16">
        <div className="container ">
          <h2 className="text-3xl md:text-4xl font-bold py-6 px-12 text-center mb-12 md:mb-16">
            Connect with one of our global offices
          </h2>
          <div className="md:flex bg-white rounded-xl border border-gray-400/50 md:h-134">
            <div className="start flex-3/4">
              <Image
                src={map}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="end min-w-67 lg:min-w-92 flex-1/4 p-8">
              <h3 className="text-xl font-semibold">
                Global Headquarters
              </h3>
              <p className="leading-7 mt-4">
                2 Canal Park <br />
                Cambridge, MA 02141 <br />
                United States <br />
              </p>
              <h3 className="text-xl font-semibold mt-8">
                Phone / Fax
              </h3>
              <p className="leading-7 mt-4">
                Phone: +1 (888) 482-7768 <br />
                Fax: +1 (888) 229-9635 <br />
              </p>
              <h3 className="text-xl font-semibold mt-8">
                Press / Media / Blogger Information
              </h3>
              <a href="/" className="font-semibold mt-4 inline-block text-lg underline">
                Visit our Newsroom for contact info
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container">`
          <button
            onClick={() => setOpen(prev => !prev)}
            aria-expanded={open}
            className="text-lg font-semibold flex items-center gap-2 cursor-pointer">
            <Arrow />
            <span>
              How to find this office
            </span>
          </button>
          <div
            ref={contentRef}
            style={{ display: 'none' }}
            className="pt-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil cum magni voluptatibus repudiandae sunt voluptas. Eligendi nostrum eveniet, repudiandae omnis consectetur est cupiditate nisi, ratione odit labore non sapiente perferendis dolor iusto laboriosam atque vitae! Corporis veritatis a molestias asperiores sunt suscipit, perspiciatis aliquid fuga quidem laudantium. Dignissimos, id nihil?
          </div>
        </div>
      </section>
    </>
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
