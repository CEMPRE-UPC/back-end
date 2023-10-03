import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';
import Role from './role.model';

class User extends Model {}

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
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
}, {sequelize: db, modelName: 'user', timestamps: false})

User.belongsTo(Role, { as: 'role', foreignKey: { name: 'roleId' } });
Role.hasMany(User,{ foreignKey: { name: 'roleId' } } );

export default User;