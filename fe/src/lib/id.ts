export function idOf(obj: any): string {
  return String(obj?.id || obj?._id || '')
}

