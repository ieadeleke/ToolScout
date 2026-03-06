import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { authApi } from '../features/auth/api'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const schema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
})

type FormValues = z.infer<typeof schema>

export function RegisterPage() {
  const nav = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(schema) })
  const onSubmit = async (data: FormValues) => {
    try {
      await authApi.register({
        email: data.email,
        password: data.password,
        name: `${data.firstName} ${data.lastName}`.trim(),
      })
      toast.success('Account created')
      nav('/')
    } catch {
      toast.error('Could not register')
    }
  }

  const inputClass = "w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/25 focus:border-white/30 focus:outline-none transition-colors"
  const labelClass = "text-sm font-medium text-white/70"

  return (
    <div className="min-h-screen w-screen bg-[#0a0a0a] grid grid-cols-1 md:grid-cols-2">
      <div className="p-8 md:p-12 flex items-center justify-center">
        <div className="w-full max-w-sm">
          <Link to="/" className="inline-flex items-center gap-2 mb-8 text-sm text-white/50 hover:text-white transition-colors">
            ← ToolScout
          </Link>
          <h1 className="mb-1 text-2xl font-semibold text-white">Create account</h1>
          <p className="mb-7 text-sm text-white/40">Join ToolScout to save tools and get personalized shelves.</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label htmlFor="firstName" className={labelClass}>First name</label>
                <input id="firstName" placeholder="First" className={inputClass} {...register('firstName')} />
                {errors.firstName && <p className="text-xs text-red-400">{errors.firstName.message}</p>}
              </div>
              <div className="space-y-1.5">
                <label htmlFor="lastName" className={labelClass}>Last name</label>
                <input id="lastName" placeholder="Last" className={inputClass} {...register('lastName')} />
                {errors.lastName && <p className="text-xs text-red-400">{errors.lastName.message}</p>}
              </div>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="email" className={labelClass}>Email</label>
              <input id="email" type="email" placeholder="you@example.com" className={inputClass} {...register('email')} />
              {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
            </div>
            <div className="space-y-1.5">
              <label htmlFor="password" className={labelClass}>Password</label>
              <input id="password" type="password" placeholder="••••••••" className={inputClass} {...register('password')} />
              {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-white py-2.5 text-sm font-semibold text-black hover:bg-white/90 transition-colors"
            >
              Create account
            </button>
          </form>
          <p className="mt-5 text-sm text-white/40">
            Have an account?{' '}
            <Link to="/login" className="text-white/70 hover:text-white underline transition-colors">Sign in</Link>
          </p>
        </div>
      </div>
      <div className="hidden md:flex items-center justify-center bg-[#0EC6B2]">
        <div className="w-64 h-64 opacity-50">
          <svg viewBox="0 0 300 300" fill="none">
            {Array.from({ length: 14 }, (_, i) => (
              <circle key={i} cx="150" cy="150" r={(i + 1) * 11} stroke="black" strokeWidth="1.5" opacity={0.5 - i * 0.02} />
            ))}
          </svg>
        </div>
      </div>
    </div>
  )
}
