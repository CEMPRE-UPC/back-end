import { DataTypes, Model } from 'sequelize';

import { MysqlDatabase } from '../../mysql-database';
import { envs } from '../../../../config';
import { StudentModel } from './student.model';

const sequelize = MysqlDatabase.initialize({
  mysqlUrl: envs.MYSQL_URL,
  database: envs.MYSQL_DB_NAME
})

class KnowledgeModel extends Model {
    public id!: string;
    public description!: string[];
}

KnowledgeModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        description: {
            type: DataTypes.STRING,
            get: function() {
                return this.getDataValue('description').split(',')
            },
            set: function(val: string[]) {
                this.setDataValue('description', val.join(','))
            }
        }
    },
    {
        sequelize, 
        tableName: 'knowledge', 
        timestamps: false
    }
)

StudentModel.hasMany(KnowledgeModel, { foreignKey: { name: 'studentId' }  });
KnowledgeModel.belongsTo(StudentModel, { foreignKey: { name: 'studentId' }  });

export { KnowledgeModel };  