import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';
import User from './user.model';

class Student extends Model {}

Student.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
    },
    cedula: { type: DataTypes.STRING, primaryKey: true },
    firstName: { type: DataTypes.STRING},
    secondName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
    middleName: { type: DataTypes.BOOLEAN },
    birthDate: { type: DataTypes.BOOLEAN },
    martialStatus: { type: DataTypes.BOOLEAN },
    program: { type: DataTypes.BOOLEAN },
    address: { type: DataTypes.BOOLEAN },
    eps: { type: DataTypes.BOOLEAN },
    email: { type: DataTypes.BOOLEAN, unique: true },
    city: { type: DataTypes.BOOLEAN },
    cedulaFile: { type: DataTypes.BOOLEAN, unique: true },
    epsFile: { type: DataTypes.BOOLEAN, unique: true },
    photoFile: { type: DataTypes.BOOLEAN, unique: true },
 
}, {sequelize: db, modelName: 'user', timestamps: false})

Student.belongsTo(User, { as: 'user', foreignKey: { name: 'userId' } });
User.hasMany(Student,{ foreignKey: { name: 'userId' } } );

export default Student;