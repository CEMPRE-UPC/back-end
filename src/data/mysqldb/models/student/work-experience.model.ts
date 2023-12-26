import { DataTypes, Model } from 'sequelize';

import { MysqlDatabase } from '../../mysql-database';
import { envs } from '../../../../config';
import { StudentModel } from './student.model';

const sequelize = MysqlDatabase.initialize({
  mysqlUrl: envs.MYSQL_URL,
  database: envs.MYSQL_DB_NAME
})

class WorkExperienceModel extends Model {
    public id!: string;
    public company!: string;
    public position!: string;
    public functions!: string;
    public startDate!: Date;
    public endDate!: Date;
}

WorkExperienceModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        company: {
            type: DataTypes.STRING,
        },
        position: {
            type: DataTypes.STRING,
        },
        functions: {
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
        tableName: 'worker_experiences', 
        timestamps: false
    }
)

StudentModel.hasMany(WorkExperienceModel, { foreignKey: { name: 'studentId' }  });
WorkExperienceModel.belongsTo(StudentModel, { foreignKey: { name: 'studentId' }  });

export { WorkExperienceModel };  