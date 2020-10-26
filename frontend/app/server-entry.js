import App from 'lightning-router/App'
import { router } from '@/router'

export default async function ({url}) {
    await router.push(url)
    return App.render({router})
}
