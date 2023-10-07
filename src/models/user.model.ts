import { DataTypes, Model } from 'sequelize';

import db from '../db/connection';
import { Role } from './';

class User extends Model {
    public id!: string;
    public email!: string;
    public password!: string;
    public status!: boolean;
}

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, {sequelize: db, timestamps: false})


Role.hasMany(User, { as : 'role', foreignKey: { name: 'roleId', }  });
User.belongsTo(Role, { as : 'role', foreignKey: { name: 'roleId', }  });

export { User };