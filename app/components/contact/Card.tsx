import React from "react"
import { clsx } from 'clsx'

export default function Card({
  children
}: { children?: React.ReactNode }) {
  return (
    <div className={clsx([
      "h-96",
      "shadow-lg",
      "rounded-xl",
      "bg-white",
      "p-8",
      "flex",
      "flex-col",
      "justify-center",
      "items-center",
      "text-center"
    ])}>
      {children}
    </div>
  )
}