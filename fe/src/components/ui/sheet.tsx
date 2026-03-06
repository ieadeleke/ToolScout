import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cn } from '../../lib/utils'

export const Sheet = DialogPrimitive.Root
export const SheetTrigger = DialogPrimitive.Trigger
export const SheetClose = DialogPrimitive.Close

export const SheetContent = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>>(
  ({ className, children, ...props }, ref) => (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-black/40" />
      <DialogPrimitive.Content ref={ref} className={cn('fixed inset-y-0 right-0 z-50 w-80 bg-white p-6 shadow-xl outline-none', className)} {...props}>
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
)
SheetContent.displayName = 'SheetContent'

export function SheetHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mb-4 flex flex-col space-y-1.5 text-left', className)} {...props} />
}

export function SheetTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn('text-lg font-semibold', className)} {...props} />
}

