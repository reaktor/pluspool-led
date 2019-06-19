const Koa = require('koa')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = new Koa()

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200
    await next()
  })

  server.use(async (ctx) => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})
