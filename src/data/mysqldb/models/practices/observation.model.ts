
import { DataTypes, Model } from 'sequelize';

import { MysqlDatabase } from '../../mysql-database';
import { envs } from '../../../../config';
import { PracticeApplicationModel } from './practice-application.model';

const sequelize = MysqlDatabase.initialize({
  mysqlUrl: envs.MYSQL_URL,
  database: envs.MYSQL_DB_NAME
})

class ObservationModel extends Model {
    public id!: string;
    public content!: string;
    public userName!: string;
    public createdBy!: string;
    public creationDate!: Date;
    public practiceAppId!: string;
}

ObservationModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        content: {
            type: DataTypes.STRING,
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        createdBy: {
            type: DataTypes.STRING,
        },
        creationDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize, 
        tableName: 'observations', 
        timestamps: false
    }
)

PracticeApplicationModel.hasMany(ObservationModel, { foreignKey: { name: 'practiceAppId' }  });
ObservationModel.belongsTo(PracticeApplicationModel, { foreignKey: { name: 'practiceAppId' }  });


// ObservationModel.sync({alter:true})

export { ObservationModel  };  
