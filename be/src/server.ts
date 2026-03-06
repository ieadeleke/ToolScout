import { app } from './app'
import { env } from './config/env'
import { connectMongo } from './db/mongoose'

async function bootstrap() {
  await connectMongo()
  app.listen(env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`ToolScout API listening on http://localhost:${env.PORT}`)
  })
}

bootstrap().catch((err) => {
  console.error('Failed to start server', err)
  process.exit(1)
})
