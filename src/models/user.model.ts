import { DataTypes } from 'sequelize';
import db from '../db/connection';
import Role from './role.model';

const User = db.define('User', {
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
}, {
    timestamps: false
})

User.belongsTo(Role, { as: 'role', foreignKey: { name: 'roleId' } });
Role.hasMany(User,{ foreignKey: { name: 'roleId' } } );

export default User;