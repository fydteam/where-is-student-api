import { Sequelize } from "sequelize-typescript";
import { Person, UserState } from "./model/user.model";

export const sequelize = new Sequelize(Bun.env.HAN_POSTGRES_DB ?? 'db', Bun.env.HAN_POSTGRES_USER ?? 'user', Bun.env.HAN_POSTGRES_PASSWORD ?? 'password', {
    host: Bun.env.HAN_POSTGRES_HOST ?? 'localhost',
    port: Number(Bun.env.HAN_POSTGRES_PORT ?? '5432'),
    dialect: 'postgres',
    models:[ Person, UserState ]
});

try{
    await sequelize.authenticate()
    console.log('완료')
} catch(err){
    console.error(err)
}

try{
    await sequelize.sync({alter:import.meta.main})
} catch(err){
    console.error(err)
}
if(import.meta.main){
    await sequelize.close()
}