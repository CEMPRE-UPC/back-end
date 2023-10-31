import { DataTypes, Model } from 'sequelize';

import { MysqlDatabase } from '../../mysql-database';
import { envs } from '../../../../config';
import { StudentModel } from './student.model';

const sequelize = MysqlDatabase.initialize({
  mysqlUrl: envs.MYSQL_URL,
  database: envs.MYSQL_DB_NAME
})

class UniversityStudiesModel extends Model {
    public id!: string;
    public institution!: string;
    public program!: string;
    public semester!: string;
}

UniversityStudiesModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        institution: {
            type: DataTypes.STRING,
        },
        program: {
            type: DataTypes.STRING,
        },
        semester: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize, 
        tableName: 'university_studies', 
        timestamps: false
    }
)

StudentModel.hasOne(UniversityStudiesModel, { foreignKey: { name: 'studentId' }  });
UniversityStudiesModel.belongsTo(StudentModel, { foreignKey: { name: 'studentId' }  });

export { UniversityStudiesModel };  