import { DataTypes, ENUM, Model } from 'sequelize';

import { MysqlDatabase } from '../../mysql-database';
import { envs } from '../../../../config';
import { StudentModel } from '../student/student.model';

const sequelize = MysqlDatabase.initialize({
  mysqlUrl: envs.MYSQL_URL,
  database: envs.MYSQL_DB_NAME
})

class AttachedFileModel extends Model {
    public id!: string;
    public name!: string;
    public file!: string;  
}

AttachedFileModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        type: {
                    
            type: ENUM('Identificacion', 'Foto', 'Horario de clases', 'EPS', 'Certificado de egresado'),
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

StudentModel.hasOne(AttachedFileModel, { as : 'student', foreignKey: { name: 'studentId' }  });
AttachedFileModel.belongsTo(StudentModel, { as : 'student', foreignKey: { name: 'studentId' }  });

export { AttachedFileModel };  