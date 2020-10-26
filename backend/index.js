import Koa from 'koa'
import { createServer } from 'http'

let app = new Koa()

app.use(ctx => ctx.body = "test")

let httpServer = createServer(app.callback())
httpServer.listen(80)