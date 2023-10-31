import { DataTypes, ENUM, Model } from 'sequelize';

import { MysqlDatabase } from '../../mysql-database';
import { envs } from '../../../../config';
import { StudentModel } from './student.model';

const sequelize = MysqlDatabase.initialize({
  mysqlUrl: envs.MYSQL_URL,
  database: envs.MYSQL_DB_NAME
})

class AreaInterestModel extends Model {
    public id!: string;
    public description!: string;
    public date!: Date;
}

AreaInterestModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        description: {
            type: DataTypes.STRING
        },
        date: {
            type: DataTypes.STRING
        },
    },
    {
        sequelize, 
        tableName: 'area_interests', 
        timestamps: true
    }
)

StudentModel.hasOne(AreaInterestModel, { foreignKey: { name: 'studentId' }  });
AreaInterestModel.belongsTo(StudentModel, { foreignKey: { name: 'studentId' }  });

export { AreaInterestModel };  