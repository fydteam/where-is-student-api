import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'
import { prettyJSON } from 'hono/pretty-json'
import { serveStatic } from 'hono/bun'
import { validator } from 'hono/validator'
import { logger } from 'hono/logger'
import { appendFileSync } from 'node:fs'
import path from 'node:path'
import api from './api'
import page from './page'
import { sequelize } from './db'

const customLog = (message: string, ...rest: string[]) => {
    const date = new Date()
    const str = `${date.getFullYear()}-${date.getMonth().toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
    appendFileSync(path.resolve(import.meta.dir, `../logs/${str}.log`), `${message}\t${rest.join('\t')}\n`, { 
        encoding:'utf-8',
    })
}
const app = new Hono()
app.use('*', prettyJSON())
app.use('*', logger(customLog))
app.notFound((c) => {
    customLog('Not Found', c.req.url)
    return c.json({ message: 'Not Found', ok: false }, 404)
})
app.onError((err, c) => {
    customLog('Not Found', c.req.url, err.name, err.message, err.stack ?? '')
    return c.html(`<pre>${err}</pre>`)
})


// app.post(
//     '/echo',
//     validator('json', (value, c) => {
//         if(!('test2' in value && 'test1' in value)){
//             return c.json({ok:false, reason:'Invalid'}, 400)
//         }
//         return value 
//     }),
//     async (c) => {
//         const json = c.req.valid('json')
        
//         return c.json({ ok:true, data:json})
//     }
// )

app.route('/api', api)
app.route('/page', page)

app.use('*', serveStatic({ root:'./public' }))

const port = parseInt(process.env.PORT!) || 3000

export default {
    port,
    fetch:app.fetch
}