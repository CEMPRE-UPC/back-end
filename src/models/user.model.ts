import { DataTypes } from 'sequelize';
import db from '../db/connection';

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
    },
}, {
    timestamps: false
})

export default User;