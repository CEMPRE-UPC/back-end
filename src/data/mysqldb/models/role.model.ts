import { DataTypes, Model } from 'sequelize';

import { MysqlDatabase } from '../mysql-database';
import { envs } from '../../../config';

const sequelize = MysqlDatabase.initialize({
  mysqlUrl: envs.MYSQL_URL,
  database: envs.MYSQL_DB_NAME
})

class RoleModel extends Model {
    public id!: number;
    public name!: string;
}

RoleModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            defaultValue: 'STUDENT_ROLE',
            unique: true,
        },
    },
    {
        sequelize, 
        tableName: 'roles', 
        timestamps: false
    }
)

export { RoleModel };