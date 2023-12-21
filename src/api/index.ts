import { Hono } from "hono"
import { cors } from "hono/cors"

const api = new Hono()
api.use('*', cors())

api.get('/posts', (c) => {
    const { limit, offset } = c.req.query()
    return c.json({ limit, offset })
})

api.get('/posts/:id', (c) => {
    const id = c.req.param('id')
    return c.json({ id })
})

export default api