import './env.js' //global env variables
import noderesolve from '@rollup/plugin-node-resolve'
import aliasPlugin from '@rollup/plugin-alias';
import svelte from 'rollup-plugin-svelte-hot';
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import hmr from 'rollup-plugin-hot'
import { clientManifestPlugin, serverManifestPlugin } from './plugin.js'
import sveltePreprocess from 'svelte-preprocess'
import { rmdirSync, mkdirSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url))
const appDir = resolve(__dirname, './app')
const distDir = resolve(__dirname, './public/dist')
const preprocess = sveltePreprocess({
    stylus: {
        paths: [appDir] //allow absolute import from /app directory
    }
})
const alias = aliasPlugin({
    resolve: ['.js', '.svelte'],
    entries: [
        {
            find: '@',
            replacement: appDir
        },
        {
            find: 'icons',
            replacement: 'svelte-material-icons'
        }
    ]
})

rmdirSync(distDir, { recursive: true });
mkdirSync(distDir)

const hot = !!process.env.ROLLUP_WATCH

export default [
    {
        input: 'app/client-entry.js',
        preserveEntrySignatures: hot ? 'strict' : false,
        preserveModules: hot,
        plugins: [
            svelte({
                dev: process.env.mode === 'development',
                preprocess,
                hydratable: true
            }),
            alias,
            hot && hmr({
                public: 'public/dist',
                serve: true,
                inMemory: true,
                host: 'framework.test',
                baseUrl: '/public/dist',
                hotBundleSuffix: '',
            }),
            noderesolve({
                extensions: ['.js', '.svelte'],
                browser: true
            }),
            clientManifestPlugin(),
        ],
        output: {
            dir: distDir,
            format: 'es',
            entryFileNames: hot ? undefined : '[name]-[hash].js'
        }
    },
    {
        input: 'app/server-entry.js',
        plugins: [
            svelte({
                dev: process.env.environment === 'development',
                preprocess,
                generate: 'ssr'
            }),
            alias,
            noderesolve({
                extensions: ['.js', '.svelte']
            }),
            serverManifestPlugin()
        ],
        output: {
            dir: distDir,
            format: 'es',
            entryFileNames: '[name]-[hash].js',
        }
    }
]