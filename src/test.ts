import { sequelize } from "./db";
import { Person } from "./model/user.model";

try{
    await sequelize.authenticate()
    await Person.create({
        name:'김한결',
        person_id:'940803-1200714',
    })
} catch(err){
    console.error(err)
}
await sequelize.close()
