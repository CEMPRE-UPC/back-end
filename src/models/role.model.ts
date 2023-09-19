import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Role = db.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'STUDENT_ROLE',
        unique: true,
    }
},
{
    timestamps: false
})


export default Role;