declare module "bun" {
    interface Env {
        HAN_POSTGRES_DB: string;
        HAN_POSTGRES_USER: string;
        HAN_POSTGRES_PASSWORD: string;
        HAN_POSTGRES_HOST: string;
        HAN_POSTGRES_PORT: string;
        HAN_HOOK_SECRET: string;
        HAN_PORT: string;
        HAN_POSTGRES_VOLUME: string;
        INCODING_DB_HOST: string;
        INCODING_DB_DB: string;
        INCODING_DB_USER: string;
        INCODING_DB_PASS: string;
        HAN_INCODING_SECRET: string;
        HAN_ROOMS: string;
    }
}

export { };