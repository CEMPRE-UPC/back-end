import { DataTypes, Model } from 'sequelize';

import { MysqlDatabase } from '../../mysql-database';
import { envs } from '../../../../config';
import { StudentModel } from './student.model';

const sequelize = MysqlDatabase.initialize({
  mysqlUrl: envs.MYSQL_URL,
  database: envs.MYSQL_DB_NAME
})

class GuiadedRegistrationModel extends Model {
    public id!: string;

}


GuiadedRegistrationModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
    },
    {
        sequelize, 
        tableName: 'guiaded_registrations',
        timestamps: false
    }
)

StudentModel.hasOne(GuiadedRegistrationModel, { foreignKey: { name: 'studentId' }  });
GuiadedRegistrationModel.belongsTo(StudentModel, { foreignKey: { name: 'studentId' }  });

export { GuiadedRegistrationModel };  