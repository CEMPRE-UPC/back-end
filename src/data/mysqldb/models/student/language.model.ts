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
    public name!: string;
    public readingLevel!: string;
    public listeningLevel!: string;
    public speakingLevel!: string;
    public writingLevel!: string;
}

const LEVEL_LANGUAGE: string[] = ['Excelente','Bueno','Regular','Ninguno'];

LanguageModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        readingLevel: {
            type: DataTypes.ENUM({ values: LEVEL_LANGUAGE }),
        },
        listeningLevel: {
            type: DataTypes.ENUM({ values: LEVEL_LANGUAGE }),
        },
        speakingLevel: {
            type: DataTypes.ENUM({ values: LEVEL_LANGUAGE }),
        },
        writingLevel: {
            type: DataTypes.ENUM({ values: LEVEL_LANGUAGE }),
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