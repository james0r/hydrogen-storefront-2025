import { Outlet, useLoaderData } from "react-router"
import type { Route } from "./+types/pages"

export default function PagesLayout() {

  return (
    <>
      <Outlet />
    </>

  )
}