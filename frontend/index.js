import './env.js' //setup process.env variables
import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import koaCookie from 'koa-cookie'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import mount from 'koa-mount'
import koastatic from 'koa-static'
import compress from 'koa-compress'
import { createServer } from 'http'
//import { graphMiddleware } from '../models/graph.js'
//import sessionToken from './middleware/sessionToken.js'
//import { downloadFile, uploadFile } from '../models/cmsFiles.js'

import {
    errorMiddleware,
    noWWW,
    renderer,
    stateContext
} from './middleware/index.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = resolve(__dirname, './public')

const router = new Router()
    .use(compress())
    .use(stateContext)
    .use(errorMiddleware)
    .use(noWWW)
    .use(koaCookie.default())
    .use(bodyParser())
    //.use(sessionToken)
    .use(mount('/public', koastatic(publicDir, { maxage: 1000 * 60 * 60 * 1 })))
    .use(renderer)
    //.post('/graph/', graphMiddleware)
    //.get('/files/:id', downloadFile)
    //.post('/uploadFile', uploadFile)
    .get('(.*)', async (ctx) => {
        ctx.body = await ctx.render()
    })

let app = new Koa()

app.use(router.routes())

let httpServer = createServer(app.callback())
httpServer.listen(80)
