import { DataTypes, ENUM, Model } from 'sequelize';

import { MysqlDatabase } from '../../mysql-database';
import { envs } from '../../../../config';

const sequelize = MysqlDatabase.initialize({
  mysqlUrl: envs.MYSQL_URL,
  database: envs.MYSQL_DB_NAME
})

class PracticeModel extends Model {
    public id!: string;
    public modality!: string;

}

const modalities = ['professional', 'curricular'];

PracticeModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        modality: {
            type: ENUM(...modalities),
            unique: true,
        },
    },
    {
        sequelize, 
        tableName: 'practices', 
        timestamps: false
    }
)



// insert if not exists

modalities.forEach(modality => {
  PracticeModel.findOrCreate({
    where: { modality },
    defaults: { modality }
  }).then(([practice, created]) => {
    console.log(practice.get({ plain: true }));
    console.log(created);
  });
});



export { PracticeModel };  