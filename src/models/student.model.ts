import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';
import User from './user.model';

class Student extends Model {}

Student.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    cedula: { type: DataTypes.STRING, unique: true },
    firstName: { type: DataTypes.STRING},
    secondName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
    middleName: { type: DataTypes.STRING },
    birthDate: { type: DataTypes.STRING },
    martialStatus: { type: DataTypes.STRING },
    program: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },
    eps: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true },
    city: { type: DataTypes.STRING },
    cedulaFile: { type: DataTypes.STRING, unique: true },
    epsFile: { type: DataTypes.STRING, unique: true },
    photoFile: { type: DataTypes.STRING, unique: true },
 
}, {sequelize: db, timestamps: false})

Student.belongsTo(User, { as: 'user', foreignKey: { name: 'userId' } });
User.hasMany(Student,{ foreignKey: { name: 'userId' } } );

export default Student;