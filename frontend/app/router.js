import { Path, Router } from 'lightning-router'

let routes = [
    new Path('/export', () => import('@/pages/Export')),
]

export const router = new Router({ routes })