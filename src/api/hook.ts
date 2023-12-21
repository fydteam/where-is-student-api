import { Hono } from "hono"
import { cors } from "hono/cors"

const encoder = new TextEncoder();
const secret = Bun.env.HAN_HOOK_SECRET
const KILL = Bun.argv[2] ?? 'kill'

const api = new Hono()
api.use('*', cors())

api.get('/', async c => {
    const header = c.req.header('X-Hub-Signature-256')
    const payload = await c.req.json()
    if(!header){
        return c.text('wrong header', 500)
    }
    const parts = header.split("=");
    const sigHex = parts[1];

    const algorithm = { name: "HMAC", hash: { name: 'SHA-256' } };

    const keyBytes = encoder.encode(secret);
    const extractable = false;
    const key = await crypto.subtle.importKey(
        "raw",
        keyBytes,
        algorithm,
        extractable,
        [ "sign", "verify" ],
    );

    const sigBytes = hexToBytes(sigHex);
    const dataBytes = encoder.encode(JSON.stringify(payload));
    const equal = await crypto.subtle.verify(
        algorithm.name,
        key,
        sigBytes,
        dataBytes,
    );
    if(equal){
        console.log(KILL)
        return c.text('killed')
    }
    return c.text('wrong pass', 500)
})



function hexToBytes(hex:string) {
    const len = hex.length / 2;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < hex.length; i += 2) {
        let c = hex.slice(i, i + 2);
        let b = parseInt(c, 16);
        bytes[i / 2] = b;
    }
    return bytes;
}

export default api