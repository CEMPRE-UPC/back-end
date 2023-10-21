import { DataTypes, Model } from 'sequelize';

import { MysqlDatabase } from '../mysql-database';
import { envs } from '../../../config';
import { StudentModel } from './student.model';

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
            type: DataTypes.INTEGER.UNSIGNED,
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

StudentModel.hasOne(AttachedFileModel, { as : 'attachedFile', foreignKey: { name: 'studentId' }  });
AttachedFileModel.belongsTo(StudentModel, { as : 'attachedFile', foreignKey: { name: 'studentId' }  });

export { AttachedFileModel };  