import * as React from 'react'
import { cn } from '../../lib/utils'

export function Form({ className, ...props }: React.HTMLAttributes<HTMLFormElement>) {
  return <form className={cn('space-y-3', className)} {...props} />
}

export function FormItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('space-y-1.5', className)} {...props} />
}

export function FormLabel({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn('text-sm font-medium', className)} {...props} />
}

export function FormMessage({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('text-xs text-red-600', className)} {...props} />
}

