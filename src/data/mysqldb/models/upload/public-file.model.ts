import { DataTypes, ENUM, Model } from 'sequelize';

import { MysqlDatabase } from '../../mysql-database';
import { envs } from '../../../../config';

const sequelize = MysqlDatabase.initialize({
  mysqlUrl: envs.MYSQL_URL,
  database: envs.MYSQL_DB_NAME
})

class PublicFileModel extends Model {
    public id!: string;
    public type!: string;
    public file!: string;  
}

PublicFileModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        type: {
                    
            type: ENUM('Practicas Curriculares', 'Practicas Profesionales', 'Diplomado'),
        },
        file: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize, 
        tableName: 'public_files', 
        timestamps: false
    }
)

export { PublicFileModel };  