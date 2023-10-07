import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';

class Role extends Model {
    public id!: number;
    public name!: string;
}

Role.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            defaultValue: 'STUDENT_ROLE',
            unique: true,
        },
    },
    {
        sequelize: db, timestamps: false
    }
)

export { Role };