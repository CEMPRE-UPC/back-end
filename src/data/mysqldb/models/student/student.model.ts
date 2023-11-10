import { DataTypes, Model } from 'sequelize';

import { MysqlDatabase } from '../../mysql-database';
import { envs } from '../../../../config';
import { UserModel } from '../auth/user.model';
import { PracticeModel } from './practice.model';

const sequelize = MysqlDatabase.initialize({
  mysqlUrl: envs.MYSQL_URL,
  database: envs.MYSQL_DB_NAME
})

class StudentModel extends Model {
    public id!: number;
    public cedula!: string;
    public firstName!: string;
    public secondName!: string;
    public lastName!: string;
    public middleName!: string;
    public birthDate!: Date;
    public placeOfBirth!: string;
    public martialStatus!: string;
    public program!: string;
    public address!: string;
    public phone!: string;
    public eps!: string;
    public email!: string;
    public city!: string;
    public userId!: number;
    public practiceId!: string;
}

StudentModel.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    cedula: { type: DataTypes.STRING, unique: true },
    firstName: { type: DataTypes.STRING},
    secondName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
    middleName: { type: DataTypes.STRING },
    birthDate: { type: DataTypes.DATE },
    placeOfBirth: { type: DataTypes.STRING },
    martialStatus: { type: DataTypes.STRING },
    program: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    eps: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true },
    city: { type: DataTypes.STRING },

}, {sequelize, timestamps: false, tableName: 'students'})

UserModel.hasOne(StudentModel, { as : 'user', foreignKey: { name: 'userId' }  });
PracticeModel.hasOne(StudentModel, { as : 'practice', foreignKey: { name: 'practiceId' }  });
StudentModel.belongsTo(UserModel, { foreignKey: { name: 'userId' }  });
StudentModel.belongsTo(PracticeModel, { foreignKey: { name: 'practiceId' }  });


export { StudentModel };