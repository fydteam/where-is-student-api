import { Sequelize } from "sequelize-typescript";
import { Op } from "sequelize";
import { IncodingStudent } from "./model/incoding.user.model";
import { sequelize } from "./db";
import { Person } from "./model/user.model";

const SECRET = Bun.env.HAN_INCODING_SECRET ?? 'secret'

const sequelize2 = new Sequelize(Bun.env.INCODING_DB_DB ?? 'db', Bun.env.INCODING_DB_USER ?? 'user', Bun.env.INCODING_DB_PASS ?? 'password', {
    host: Bun.env.INCODING_DB_HOST ?? 'localhost',
    dialect: 'postgres',
    models:[ IncodingStudent ]
});

try{
    await sequelize.authenticate()
    await sequelize2.authenticate()
    const [result] = await Promise.all([
        IncodingStudent.findAll({
            attributes:['id', 'name', 'personal_code', 'phone_number', 'status'],
            where:{
                name:{
                    [Op.notRegexp]:'\\(?T\\)?$',
                    [Op.regexp]:'^[가-힣]{2,4}($|\\()'
                },
                status:'재원'
            }
        })
    ])
    
    const from = result.map(v => {
        const hasher = new Bun.CryptoHasher("sha256");
        const nameMatch = v.name.match(/^[가-힣]+/)
        if(!nameMatch){
            return null
        }
        const user_id = `${nameMatch[0]}${v.phone_number.replaceAll('-', '').slice(-5)}`
        hasher.update(SECRET)
        hasher.update(v.personal_code.replace('-', '').slice(0, 7))
        return {
            id:v.id,
            name:v.name,
            user_id,
            secret:hasher.digest('base64')
        }
    }).filter(v => v)

    const ids = result.map(v => v.id)

    await sequelize.transaction(async (transaction) => {
        for (const record of from) {
            await Person.upsert(record as Person, { transaction });
        }
    });

    await Person.destroy({
        where:{
            id:{
                [Op.notIn]:ids
            }
        }
    })
} catch(err){
    console.error(err)
    throw err
}

await sequelize.close()
await sequelize2.close()