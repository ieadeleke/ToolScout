import { useEffect, useState } from 'react'
import { api } from '../lib/api-client'

type Option = { id: string; key: string; text: string }
type Question = { id: string; key: string; text: string; order: number; options: Option[] }

export function QuizPage() {
  const [qs, setQs] = useState<Question[]>([])
  const [answers, setAnswers] = useState<Record<string, string>>({})

  useEffect(() => {
    api.get('/quiz/questions').then((r) => setQs(r.data))
  }, [])

  const submit = async () => {
    await api.post('/quiz/submit', { answers })
    alert('Preferences saved!')
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Personalize your feed</h1>
      <div className="space-y-6">
        {qs.map((q) => (
          <div key={q.id}>
            <div className="mb-2 font-medium">{q.text}</div>
            <div className="grid grid-cols-2 gap-2">
              {q.options.map((o) => (
                <button
                  key={o.id}
                  onClick={() => setAnswers((a) => ({ ...a, [q.key]: o.key }))}
                  className={`rounded-md border px-3 py-2 text-left ${answers[q.key] === o.key ? 'border-black' : ''}`}
                >
                  {o.text}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <button onClick={submit} className="rounded-md bg-black text-white px-4 py-2">Save</button>
      </div>
    </div>
  )
}

