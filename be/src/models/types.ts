export type UUID = string

export type User = {
  id: UUID
  email: string
  password_hash: string
  name: string
  created_at: Date
  updated_at: Date
}

export type ToolPricing = 'free' | 'paid' | 'freemium'

export type Tool = {
  id: UUID
  name: string
  slug: string
  logo_url?: string
  short_description: string
  long_description?: string
  website_url?: string
  pricing: ToolPricing
  origin_country?: string
  is_nigerian?: boolean
  saves_count: number
  avg_rating: number
  rating_count: number
  roles: string[]
  tasks: string[]
  categories?: string[]
  tags?: string[]
  created_at: Date
  updated_at: Date
}

export type Save = { user_id: UUID; tool_id: UUID; created_at: Date }
export type Rating = { id: UUID; user_id: UUID; tool_id: UUID; score: number; text?: string; created_at: Date }

