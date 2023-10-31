import { DataTypes, ENUM, Model } from 'sequelize';

import { MysqlDatabase } from '../../mysql-database';
import { envs } from '../../../../config';
import { StudentModel } from './student.model';

const sequelize = MysqlDatabase.initialize({
  mysqlUrl: envs.MYSQL_URL,
  database: envs.MYSQL_DB_NAME
})

class PracticeModel extends Model {
    public id!: string;
    public modality!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

PracticeModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        modality: {
                    
            type: ENUM('professional', 'curricular'),
        },
    },
    {
        sequelize, 
        tableName: 'practices', 
        timestamps: true
    }
)

StudentModel.hasOne(PracticeModel, { foreignKey: { name: 'studentId' }  });
PracticeModel.belongsTo(StudentModel, { foreignKey: { name: 'studentId' }  });

export { PracticeModel };  