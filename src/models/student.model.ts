import { DataTypes, Model } from 'sequelize';

import db from '../db/connection';
import { User } from './user.model';

class Student extends Model {
    public id!: number;
    public cedula!: string;
    public firstName!: string;
    public secondName!: string;
    public lastName!: string;
    public middleName!: string;
    public birthDate!: Date;
    public martialStatus!: string;
    public program!: string;
    public address!: string;
    public eps!: string;
    public email!: string;
    public city!: string;
    public cedulaFile!: string;
    public epsFile!: string;
    public photoFile!: string;
    public userId!: string;
}

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
    birthDate: { type: DataTypes.DATE },
    martialStatus: { type: DataTypes.STRING },
    program: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },
    eps: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true },
    city: { type: DataTypes.STRING },
    cedulaFile: { type: DataTypes.STRING, unique: true },
    epsFile: { type: DataTypes.STRING, unique: true },
    photoFile: { type: DataTypes.STRING, unique: true },
    userId: {
        type: DataTypes.UUID,
        unique: true,
    }
 
}, {sequelize: db, timestamps: false})

User.hasOne(Student, { as : 'user', foreignKey: { name: 'userId' }  });
Student.belongsTo(User, { as : 'user', foreignKey: { name: 'userId' }  });

export { Student };