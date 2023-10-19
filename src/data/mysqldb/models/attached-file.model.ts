import { DataTypes, Model } from 'sequelize';

import { MysqlDatabase } from '../mysql-database';
import { envs } from '../../../config';

const sequelize = MysqlDatabase.initialize({
  mysqlUrl: envs.MYSQL_URL,
  database: envs.MYSQL_DB_NAME
})

class AttachedFileModel extends Model {
    public id!: number;
    public name!: string;
    public file!: string;
}

AttachedFileModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
        },
        file: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize, 
        tableName: 'attached_files', 
        timestamps: false
    }
)


export { AttachedFileModel };