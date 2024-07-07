import { DataTypes, Model } from 'sequelize';
import { MysqlDatabase } from '../../mysql-database';
import { envs } from '../../../../config';
import { PracticeModel } from '../student/practice.model';



const sequelize = MysqlDatabase.initialize({
  mysqlUrl: envs.MYSQL_URL,
  database: envs.MYSQL_DB_NAME
})

const STATUS: string[] = [
    'Abierta',
    'Cerrada'
];

class CallModel extends Model {
    public id!: string;
    public name!: string;
    public startDate!: Date;
    public endDate!: Date;
    public status!: string;
    public practiceId!: string;

}

CallModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        startDate: {
            type: DataTypes.DATE,
        },
        endDate: {
            type: DataTypes.DATE,
        },
        status: {
            type: DataTypes.ENUM(...STATUS),
        }
    },
    {
        sequelize, 
        tableName: 'calls',
        timestamps: false
    }
)

PracticeModel.hasOne(CallModel, {foreignKey: { name: 'practiceId' }  });
CallModel.belongsTo(PracticeModel, { foreignKey: { name: 'practiceId' }  });

CallModel.sync({alter: true})



export { CallModel };  