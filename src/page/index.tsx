import { Hono } from 'hono'
import { Top } from '../jsx/Top'

const api = new Hono()

api.get('/', (c) => {
    const messages = ['Good Morning', 'Good Evening', 'Good Night']
    const foo = <Top messages={messages} />
    return c.html(foo)
})

export default api