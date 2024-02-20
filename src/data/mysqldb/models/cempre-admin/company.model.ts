import { DataTypes, Model } from 'sequelize';

import { MysqlDatabase } from '../../mysql-database';
import { envs } from '../../../../config';
import { StudentModel } from '../student';

const sequelize = MysqlDatabase.initialize({
  mysqlUrl: envs.MYSQL_URL,
  database: envs.MYSQL_DB_NAME
})

class CompanyModel extends Model {
    public id!: string;
    public name!: string;
    public startDate!: Date;
    public endDate!: Date;
}

CompanyModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        startDate: {
            type: DataTypes.DATE,
        },
        endDate: {
            type: DataTypes.DATE,
        },
    },
    {
        sequelize, 
        tableName: 'company',
        timestamps: false
    }
)

// StudentModel.hasMany(CompanyModel, { foreignKey: { name: 'studentId' }  });
// CompanyModel.belongsTo(StudentModel, { foreignKey: { name: 'studentId' }  });


export { CompanyModel };  