import { Hono } from "hono"
import { validator } from "hono/validator"
const api = new Hono()

type UserRequest = {
    type:'enter'|'change'|'leave';
    user_id:string;
}


api.post('/add', 
    validator('json', (value, c) => {
        const properties = ['type', 'user_id']
        if(properties.some(v => !(v in value))) {
            return c.text(`${properties.find(v => !(v in value))} is missing`, 400)
        }
        return value as UserRequest
    }), 
    async c => {
        const value = c.req.valid('json')
        return c.json(value)
    }
)

export default api