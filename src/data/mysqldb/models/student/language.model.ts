import { DataTypes, Model } from 'sequelize';

import { MysqlDatabase } from '../../mysql-database';
import { envs } from '../../../../config';
import { StudentModel } from './student.model';

const sequelize = MysqlDatabase.initialize({
  mysqlUrl: envs.MYSQL_URL,
  database: envs.MYSQL_DB_NAME
})

class LanguageModel extends Model {
    public id!: string;
    public readingLevel!: string;
    public listeningLevel!: string;
    public speakingLevel!: string;
    public writingLevel!: string;
}

LanguageModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        readingLevel: {
            type: DataTypes.ENUM('excellent','average','good','none'),
            allowNull: true,
        },
        listeningLevel: {
            type: DataTypes.ENUM('excellent','average','good','none'),
            allowNull: true,
        },
        speakingLevel: {
            type: DataTypes.ENUM('excellent','average','good','none'),
            allowNull: true,
        },
        writingLevel: {
            type: DataTypes.ENUM('excellent','average','good','none'),
            allowNull: true,
        },
    },
    {
        sequelize, 
        tableName: 'languages', 
        timestamps: false
    }
)

StudentModel.hasOne(LanguageModel, { foreignKey: { name: 'studentId' }  });
LanguageModel.belongsTo(StudentModel, { foreignKey: { name: 'studentId' }  });

export { LanguageModel };  