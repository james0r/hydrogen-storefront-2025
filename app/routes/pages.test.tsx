import { Await, useLoaderData } from "react-router"
import type { Route } from "./+types/pages.test"
import React from "react"

export const meta: Route.MetaFunction = ({ data }) => {
  return [{
    title: `Test page`
  }]
}

export async function loader(args: Route.LoaderArgs) {
  let nonCriticalData = new Promise((res) =>
    setTimeout(() => res("non-critical"), 5000),
  )

  let criticalData = await new Promise((res) =>
    setTimeout(() => res("critical"), 300),
  )

  return {
    nonCriticalData,
    criticalData
  }
}

export default function TestPage({
  loaderData
}: Route.ComponentProps) {
  const {
    criticalData,
    nonCriticalData
  } = loaderData

  return (
    <div className="container">
      <h1>Critical Data</h1>
      <div>{criticalData}</div>
      <h1>Non-Critical Data</h1>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Await resolve={nonCriticalData}>
          {(value) => <h3>Non critical value: {value}</h3>}
        </Await>
      </React.Suspense>
    </div>
  )
} 