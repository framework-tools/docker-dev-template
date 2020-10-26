import { writeFileSync } from 'fs'
import { resolve } from 'path'

export function clientManifestPlugin () {
    return {
        name: 'Svelte Client Manifest Generator',
        generateBundle (outputOptions, bundle) {
            let manifest = {
                modules: {}
            }
            //console.log('MANIFEST: ', Object.keys(bundle))
            Object.values(bundle)
                .map(module => manifest.modules[module.facadeModuleId] = module.fileName)

            manifest.entry = Object.values(bundle)[0].fileName
            
            writeFileSync(resolve(outputOptions.dir, 'client-manifest.json'), JSON.stringify(manifest, null, 4))
        }
    }
}

export function serverManifestPlugin () {
    return {
        name: 'Svelte Server Manifest Generator',
        generateBundle (outputOptions, bundle) {
            let manifest = {}
            
            manifest.entry = Object.values(bundle)[0].fileName

            writeFileSync(resolve(outputOptions.dir, 'server-manifest.json'), JSON.stringify(manifest, null, 4))
        }
    }
}
