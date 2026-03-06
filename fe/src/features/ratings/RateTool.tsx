import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ratingsApi } from './api'
import { toast } from 'sonner'
import { Star } from 'lucide-react'

const schema = z.object({
  score: z.number().min(1).max(5),
  text: z.string().max(1000).optional(),
})
type Values = z.infer<typeof schema>

export function RateTool({ toolId }: { toolId: string }) {
  const [hovered, setHovered] = useState(0)
  const qc = useQueryClient()
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { score: 0, text: '' },
  })
  const score = watch('score')

  const mutation = useMutation({
    mutationFn: (v: Values) => ratingsApi.add(toolId, v),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['ratings', toolId] })
      reset({ score: 0, text: '' })
      toast.success('Thanks for your rating!')
    },
    onError: () => toast.error('Could not submit rating'),
  })

  const activeScore = hovered || score

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#1c1c26] p-5">
      <h3 className="text-[13px] font-semibold text-white/60 uppercase tracking-wider mb-4">
        Rate this tool
      </h3>
      <form onSubmit={handleSubmit(v => mutation.mutate(v))} className="space-y-4">

        {/* Star picker */}
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4, 5].map(n => (
            <button
              key={n}
              type="button"
              onMouseEnter={() => setHovered(n)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => setValue('score', n, { shouldValidate: true })}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`h-7 w-7 transition-colors ${
                  n <= activeScore
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-white/15 hover:text-white/30'
                }`}
              />
            </button>
          ))}
          {score > 0 && (
            <span className="ml-1.5 text-sm text-white/50">
              {['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'][score]}
            </span>
          )}
        </div>
        {errors.score && (
          <p className="text-xs text-red-400">Please select a star rating.</p>
        )}

        {/* Review text */}
        <textarea
          {...register('text')}
          placeholder="Share a brief note (optional)"
          rows={3}
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 focus:border-white/20 focus:outline-none resize-none transition-colors"
        />
        {errors.text && <p className="text-xs text-red-400">{errors.text.message}</p>}

        <button
          type="submit"
          disabled={mutation.isPending || score === 0}
          className="w-full rounded-xl bg-white py-2.5 text-sm font-semibold text-black hover:bg-white/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? 'Submitting…' : 'Submit rating'}
        </button>
      </form>
    </div>
  )
}
