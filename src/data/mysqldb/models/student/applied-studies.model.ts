import { DataTypes, Model } from 'sequelize';

import { MysqlDatabase } from '../../mysql-database';
import { envs } from '../../../../config';
import { StudentModel } from './student.model';

const sequelize = MysqlDatabase.initialize({
  mysqlUrl: envs.MYSQL_URL,
  database: envs.MYSQL_DB_NAME
})

class AppliedStudiesModel extends Model {
    public id!: string;
    public level!: string;
    public institution!: string;
    public college_degree!: string;
    public date!: Date;
}

AppliedStudiesModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        level: { // Nivel secundario u Otros estudios
            type: DataTypes.STRING,
        },
        institution: {
            type: DataTypes.STRING,
        },
        college_degree: {
            type: DataTypes.STRING,
        },
        date: {
            type: DataTypes.DATE,
        },
    },
    {
        sequelize, 
        tableName: 'applied_studies', 
        timestamps: false
    }
)

StudentModel.hasOne(AppliedStudiesModel, { foreignKey: { name: 'studentId' }  });
AppliedStudiesModel.belongsTo(StudentModel, { foreignKey: { name: 'studentId' }  });

export { AppliedStudiesModel };  