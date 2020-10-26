const sveltePreprocess = require('svelte-preprocess')
const { resolve } = require('path')

const appDir = resolve(__dirname, './app')

module.exports = {
    preprocess: sveltePreprocess({
        sourceMap: true,
        stylus: {
            paths: [appDir] //allow absolute import from /app directory
        }
    })
}
