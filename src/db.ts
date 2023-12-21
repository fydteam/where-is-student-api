import { Sequelize } from "sequelize-typescript";
import { Person } from "./model/user.model";

export const sequelize = new Sequelize(Bun.env.HAN_POSTGRES_DB ?? 'db', Bun.env.HAN_POSTGRES_USER ?? 'user', Bun.env.HAN_POSTGRES_PASSWORD ?? 'password', {
    host: Bun.env.HAN_POSTGRES_HOST ?? 'localhost',
    dialect: 'postgres',
    models:[ Person ]
});

try{
    await sequelize.authenticate()
    console.log('완료')
} catch(err){
    console.error(err)
}

try{
    await sequelize.sync({force:import.meta.main})
} catch(err){
    console.error(err)
}
if(import.meta.main){
    await sequelize.close()
}