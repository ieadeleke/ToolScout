import bcrypt from 'bcryptjs'
import { signAccessToken, signRefreshToken, verifyToken } from '../../utils/jwt'
import { usersRepo } from './auth.repository'

export const authService = {
  async register({ email, password, name }: { email: string; password: string; name?: string }) {
    const existing = await usersRepo.findByEmail(email)
    if (existing) throw { status: 409, message: 'email_taken' }
    const password_hash = await bcrypt.hash(password, 10)
    const user = await usersRepo.create({ email, password_hash, name: name || email.split('@')[0] })
    const payload = { sub: String((user as any)._id || (user as any).id), email: (user as any).email }
    return { access: signAccessToken(payload), refresh: signRefreshToken(payload), user }
  },
  async login({ email, password }: { email: string; password: string }) {
    const user = await usersRepo.findByEmail(email)
    if (!user) throw { status: 401, message: 'invalid_credentials' }
    const ok = await bcrypt.compare(password, (user as any).password_hash)
    if (!ok) throw { status: 401, message: 'invalid_credentials' }
    const payload = { sub: String((user as any)._id || (user as any).id), email: (user as any).email }
    return { access: signAccessToken(payload), refresh: signRefreshToken(payload), user }
  },
  async getMe(userId: string) {
    const user = await usersRepo.findById(userId)
    if (!user) throw { status: 404, message: 'not_found' }
    return user
  },
  async refresh(rt: string) {
    if (!rt) throw { status: 401, message: 'unauthorized' }
    const payload = verifyToken(rt)
    const user = await usersRepo.findById(payload.sub)
    if (!user) throw { status: 401, message: 'unauthorized' }
    const newPayload = { sub: String((user as any)._id || (user as any).id), email: (user as any).email }
    return { access: signAccessToken(newPayload), refresh: signRefreshToken(newPayload) }
  },
}
