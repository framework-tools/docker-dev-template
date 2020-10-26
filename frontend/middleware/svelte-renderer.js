import { resolve, dirname, extname } from 'path'
import { fileURLToPath } from 'url'
import { readFileSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = resolve(__dirname, '../public/dist')
let clientManifest
let serverManifest
updateManifests()

function updateManifests(){
    clientManifest = JSON.parse(readFileSync(resolve(distDir, 'client-manifest.json')))
    serverManifest = JSON.parse(readFileSync(resolve(distDir, 'server-manifest.json')))
}
function getAsyncFiles(renderedComponents){
    let filemap = clientManifest.modules
    return renderedComponents
        .map(componentPath => filemap[componentPath])
        .filter(file => typeof file === 'string')
        .map(file => '/public/dist/' + file)
}

function getPreloadType(file) {
    const ext = extname(file).slice(1)
    if (ext === 'js') {
        return 'script'
    } else if (ext === 'css') {
        return 'style'
    } else if (/jpe?g|png|svg|gif|webp|ico/.test(ext)) {
        return 'image'
    } else if (/woff2?|ttf|otf|eot/.test(ext)) {
        return 'font'
    } else {
        // not exhausting all possibilities here, but above covers common cases
        return ''
    }
}

export default async function (ctx, next) {
    ctx.render = async () => {
        if(process.env.mode === 'development') updateManifests()
        let module = await import('file:' + resolve(distDir, serverManifest.entry))
        let code = await module.default(ctx)
        let needed = getAsyncFiles(code.renderedComponents)
        Object.assign(ctx, code)
        return `
        <!DOCTYPE html>
        <html>
            <head>
                <script src="/public/dist/${clientManifest.entry}" defer type="module"></script>
                ${ needed.map(file => `<link rel="preload" href="${file}" as="${getPreloadType(file)}" crossorigin>`).join('') }
                ${ `<script>window.__INITIAL_STATE__ = JSON.parse('${JSON.stringify(ctx.state).replace(/'/g, "\\'")}')</script>` }
                ${ ctx.head }
                <style>${ ctx.css.code }</style>
            </head>
            <body>
                <div id="app">${ ctx.html }</div>
            </body>
        </html>`
    }

    await next()
}