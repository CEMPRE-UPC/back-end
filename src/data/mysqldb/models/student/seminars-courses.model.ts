import { DataTypes,  Model } from 'sequelize';

import { MysqlDatabase } from '../../mysql-database';
import { envs } from '../../../../config';
import { StudentModel } from './student.model';

const sequelize = MysqlDatabase.initialize({
  mysqlUrl: envs.MYSQL_URL,
  database: envs.MYSQL_DB_NAME
})

class SeminarsOrCoursesModel extends Model {
    public id!: string;
    public topic!: string;
    public institution!: string;
    public date!: Date;
}

SeminarsOrCoursesModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        topic: {
            type: DataTypes.STRING
        },
        institution: {
            type: DataTypes.STRING
        },
        date: {
            type: DataTypes.DATE
        },
    },
    {
        sequelize, 
        tableName: 'seminars_or_courses', 
        timestamps: false
    }
)

StudentModel.hasMany(SeminarsOrCoursesModel, { foreignKey: { name: 'studentId' }  });
SeminarsOrCoursesModel.belongsTo(StudentModel, { foreignKey: { name: 'studentId' }  });

SeminarsOrCoursesModel.sync({ alter: true })

export { SeminarsOrCoursesModel };  