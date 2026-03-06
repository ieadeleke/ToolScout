import { cn } from '../../lib/utils'

type Props = React.InputHTMLAttributes<HTMLInputElement>
export function Input({ className, ...props }: Props) {
  return <input className={cn('w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black', className)} {...props} />
}

